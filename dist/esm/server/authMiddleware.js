import { buildRequestUrl, constants } from "@clerk/backend";
import { DEV_BROWSER_JWT_MARKER, setDevBrowserJWTInURL } from "@clerk/shared/devBrowser";
import { NextResponse } from "next/server";
import { isRedirect, mergeResponses, paths, setHeader, stringifyHeaders } from "../utils";
import { withLogger } from "../utils/debugLogger";
import { authenticateRequest, handleInterstitialState, handleUnknownState } from "./authenticateRequest";
import { SECRET_KEY } from "./clerkClient";
import {
  clockSkewDetected,
  infiniteRedirectLoopDetected,
  informAboutProtectedRouteInfo,
  receivedRequestForIgnoredRoute
} from "./errors";
import { redirectToSignIn } from "./redirect";
import {
  apiEndpointUnauthorizedNextResponse,
  decorateRequest,
  isCrossOrigin,
  isDevelopmentFromApiKey,
  setRequestHeadersOnNextResponse
} from "./utils";
const INFINITE_REDIRECTION_LOOP_COOKIE = "__clerk_redirection_loop";
const DEFAULT_CONFIG_MATCHER = ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"];
const DEFAULT_IGNORED_ROUTES = [`/((?!api|trpc))(_next.*|.+\\.[\\w]+$)`];
const DEFAULT_API_ROUTES = ["/api/(.*)", "/trpc/(.*)"];
const authMiddleware = (...args) => {
  const [params = {}] = args;
  const { beforeAuth, afterAuth, publicRoutes, ignoredRoutes, apiRoutes, ...options } = params;
  const isIgnoredRoute = createRouteMatcher(ignoredRoutes || DEFAULT_IGNORED_ROUTES);
  const isPublicRoute = createRouteMatcher(withDefaultPublicRoutes(publicRoutes));
  const isApiRoute = createApiRoutes(apiRoutes);
  const defaultAfterAuth = createDefaultAfterAuth(isPublicRoute, isApiRoute, params);
  return withLogger("authMiddleware", (logger) => async (_req, evt) => {
    if (options.debug) {
      logger.enable();
    }
    const req = withNormalizedClerkUrl(_req);
    let cookieId;
    try {
      cookieId = req.cookies.get("hubspotutk");
    } catch (e) {
      logger.debug({ logKey: "cookieId error", error: e });
    }
    logger.debug({
      logKey: "url",
      cookieId,
      url: req.nextUrl.href,
      method: req.method,
      headers: stringifyHeaders(req.headers),
      nextUrl: req.nextUrl.href,
      clerkUrl: req.experimental_clerkUrl.href,
      beforeAuth: !!beforeAuth,
      afterAuth: !!afterAuth
    });
    if (isIgnoredRoute(req)) {
      logger.debug({ logKey: "isIgnoredRoute", isIgnoredRoute: true });
      if (isDevelopmentFromApiKey(options.secretKey || SECRET_KEY) && !params.ignoredRoutes) {
        console.warn(
          receivedRequestForIgnoredRoute(req.experimental_clerkUrl.href, JSON.stringify(DEFAULT_CONFIG_MATCHER))
        );
      }
      return setHeader(NextResponse.next(), constants.Headers.AuthReason, "ignored-route");
    }
    const beforeAuthRes = await (beforeAuth && beforeAuth(req, evt));
    if (beforeAuthRes === false) {
      logger.debug({
        logKey: "beforeAuth",
        content: "Before auth returned false, skipping"
      });
      return setHeader(NextResponse.next(), constants.Headers.AuthReason, "skip");
    } else if (beforeAuthRes && isRedirect(beforeAuthRes)) {
      logger.debug({ logKey: "beforeAuth", content: "Before auth returned redirect, following redirect" });
      return setHeader(beforeAuthRes, constants.Headers.AuthReason, "redirect");
    }
    const requestState = await authenticateRequest(req, options);
    if (requestState.isUnknown) {
      logger.debug({ logKey: "requestState", content: "authenticateRequest state is unknown", requestState });
      return handleUnknownState(requestState);
    } else if (requestState.isInterstitial && isApiRoute(req)) {
      logger.debug({
        logKey: "requestState",
        content: "authenticateRequest state is interstitial in an API route",
        requestState
      });
      return handleUnknownState(requestState);
    } else if (requestState.isInterstitial) {
      logger.debug({ logKey: "requestState", content: "authenticateRequest state is interstitial", requestState });
      assertClockSkew(requestState, options);
      const res = handleInterstitialState(requestState, options);
      return assertInfiniteRedirectionLoop(req, res, options, requestState);
    }
    const auth = Object.assign(requestState.toAuth(), {
      isPublicRoute: isPublicRoute(req),
      isApiRoute: isApiRoute(req)
    });
    logger.debug(() => ({ logKey: "auth", auth: JSON.stringify(auth), debug: auth.debug() }));
    const afterAuthRes = await (afterAuth || defaultAfterAuth)(auth, req, evt);
    const finalRes = mergeResponses(beforeAuthRes, afterAuthRes) || NextResponse.next();
    logger.debug(() => ({
      logKey: "afterAuth",
      mergedHeaders: stringifyHeaders(finalRes.headers)
    }));
    if (isRedirect(finalRes)) {
      logger.debug({ logKey: "isRedirect", content: "Final response is redirect, following redirect" });
      const res = setHeader(finalRes, constants.Headers.AuthReason, "redirect");
      return appendDevBrowserOnCrossOrigin(req, res, options);
    }
    if (options.debug) {
      setRequestHeadersOnNextResponse(finalRes, req, {
        [constants.Headers.EnableDebug]: "true"
      });
      logger.debug({ logKey: "setRequestHeaders", content: `Added ${constants.Headers.EnableDebug} on request` });
    }
    return decorateRequest(req, finalRes, requestState);
  });
};
const createRouteMatcher = (routes) => {
  if (typeof routes === "function") {
    return (req) => routes(req);
  }
  const routePatterns = [routes || ""].flat().filter(Boolean);
  const matchers = precomputePathRegex(routePatterns);
  return (req) => matchers.some((matcher) => matcher.test(req.nextUrl.pathname));
};
const createDefaultAfterAuth = (isPublicRoute, isApiRoute, params) => {
  return (auth, req) => {
    if (!auth.userId && !isPublicRoute(req)) {
      if (isApiRoute(req)) {
        informAboutProtectedRoute(req.experimental_clerkUrl.pathname, params, true);
        return apiEndpointUnauthorizedNextResponse();
      } else {
        informAboutProtectedRoute(req.experimental_clerkUrl.pathname, params, false);
      }
      return redirectToSignIn({ returnBackUrl: req.experimental_clerkUrl.href });
    }
    return NextResponse.next();
  };
};
const precomputePathRegex = (patterns) => {
  return patterns.map((pattern) => pattern instanceof RegExp ? pattern : paths.toRegexp(pattern));
};
const matchRoutesStartingWith = (path) => {
  path = path.replace(/\/$/, "");
  return new RegExp(`^${path}(/.*)?$`);
};
const withDefaultPublicRoutes = (publicRoutes) => {
  if (typeof publicRoutes === "function") {
    return publicRoutes;
  }
  const routes = [publicRoutes || ""].flat().filter(Boolean);
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "";
  if (signInUrl) {
    routes.push(matchRoutesStartingWith(signInUrl));
  }
  const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "";
  if (signUpUrl) {
    routes.push(matchRoutesStartingWith(signUpUrl));
  }
  return routes;
};
const appendDevBrowserOnCrossOrigin = (req, res, opts) => {
  var _a;
  const location = res.headers.get("location");
  const shouldAppendDevBrowser = res.headers.get(constants.Headers.ClerkRedirectTo) === "true";
  if (shouldAppendDevBrowser && !!location && isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY) && isCrossOrigin(req.experimental_clerkUrl, location)) {
    const dbJwt = ((_a = req.cookies.get(DEV_BROWSER_JWT_MARKER)) == null ? void 0 : _a.value) || "";
    const url = new URL(location);
    const urlWithDevBrowser = setDevBrowserJWTInURL(url, dbJwt, { hash: false });
    return NextResponse.redirect(urlWithDevBrowser.href, res);
  }
  return res;
};
const createApiRoutes = (apiRoutes) => {
  if (apiRoutes) {
    return createRouteMatcher(apiRoutes);
  }
  const isDefaultApiRoute = createRouteMatcher(DEFAULT_API_ROUTES);
  return (req) => isDefaultApiRoute(req) || isRequestMethodIndicatingApiRoute(req) || isRequestContentTypeJson(req);
};
const isRequestContentTypeJson = (req) => {
  const requestContentType = req.headers.get(constants.Headers.ContentType);
  return requestContentType === constants.ContentTypes.Json;
};
const isRequestMethodIndicatingApiRoute = (req) => {
  const requestMethod = req.method.toLowerCase();
  return !["get", "head", "options"].includes(requestMethod);
};
const assertClockSkew = (requestState, opts) => {
  if (!isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY)) {
    return;
  }
  if (requestState.reason === "token-not-active-yet") {
    throw new Error(clockSkewDetected(requestState.message));
  }
};
const assertInfiniteRedirectionLoop = (req, res, opts, requestState) => {
  var _a;
  if (!isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY)) {
    return res;
  }
  const infiniteRedirectsCounter = Number((_a = req.cookies.get(INFINITE_REDIRECTION_LOOP_COOKIE)) == null ? void 0 : _a.value) || 0;
  if (infiniteRedirectsCounter === 6) {
    if (requestState.reason === "token-expired") {
      throw new Error(clockSkewDetected(requestState.message));
    }
    throw new Error(infiniteRedirectLoopDetected());
  }
  if (req.headers.get("referer") === req.url) {
    res.cookies.set({
      name: INFINITE_REDIRECTION_LOOP_COOKIE,
      value: `${infiniteRedirectsCounter + 1}`,
      maxAge: 3
    });
  }
  return res;
};
const withNormalizedClerkUrl = (req) => {
  const clerkUrl = req.nextUrl.clone();
  const originUrl = buildRequestUrl(req);
  clerkUrl.port = originUrl.port;
  clerkUrl.protocol = originUrl.protocol;
  clerkUrl.host = originUrl.host;
  return Object.assign(req, { experimental_clerkUrl: clerkUrl });
};
const informAboutProtectedRoute = (path, params, isApiRoute) => {
  if (params.debug || isDevelopmentFromApiKey(params.secretKey || SECRET_KEY)) {
    console.warn(
      informAboutProtectedRouteInfo(
        path,
        !!params.publicRoutes,
        !!params.ignoredRoutes,
        isApiRoute,
        DEFAULT_IGNORED_ROUTES
      )
    );
  }
};
export {
  DEFAULT_API_ROUTES,
  DEFAULT_CONFIG_MATCHER,
  DEFAULT_IGNORED_ROUTES,
  authMiddleware,
  createRouteMatcher
};
//# sourceMappingURL=authMiddleware.js.map