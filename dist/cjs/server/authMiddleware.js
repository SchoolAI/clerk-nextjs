"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var authMiddleware_exports = {};
__export(authMiddleware_exports, {
  DEFAULT_API_ROUTES: () => DEFAULT_API_ROUTES,
  DEFAULT_CONFIG_MATCHER: () => DEFAULT_CONFIG_MATCHER,
  DEFAULT_IGNORED_ROUTES: () => DEFAULT_IGNORED_ROUTES,
  authMiddleware: () => authMiddleware,
  createRouteMatcher: () => createRouteMatcher
});
module.exports = __toCommonJS(authMiddleware_exports);
var import_backend = require("@clerk/backend");
var import_devBrowser = require("@clerk/shared/devBrowser");
var import_server = require("next/server");
var import_utils = require("../utils");
var import_debugLogger = require("../utils/debugLogger");
var import_authenticateRequest = require("./authenticateRequest");
var import_clerkClient = require("./clerkClient");
var import_errors = require("./errors");
var import_redirect = require("./redirect");
var import_utils2 = require("./utils");
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
  return (0, import_debugLogger.withLogger)("authMiddleware", (logger) => async (_req, evt) => {
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
      headers: (0, import_utils.stringifyHeaders)(req.headers),
      nextUrl: req.nextUrl.href,
      clerkUrl: req.experimental_clerkUrl.href,
      beforeAuth: !!beforeAuth,
      afterAuth: !!afterAuth
    });
    if (isIgnoredRoute(req)) {
      logger.debug({ logKey: "isIgnoredRoute", isIgnoredRoute: true });
      if ((0, import_utils2.isDevelopmentFromApiKey)(options.secretKey || import_clerkClient.SECRET_KEY) && !params.ignoredRoutes) {
        console.warn(
          (0, import_errors.receivedRequestForIgnoredRoute)(req.experimental_clerkUrl.href, JSON.stringify(DEFAULT_CONFIG_MATCHER))
        );
      }
      return (0, import_utils.setHeader)(import_server.NextResponse.next(), import_backend.constants.Headers.AuthReason, "ignored-route");
    }
    const beforeAuthRes = await (beforeAuth && beforeAuth(req, evt));
    if (beforeAuthRes === false) {
      logger.debug({
        logKey: "beforeAuth",
        content: "Before auth returned false, skipping"
      });
      return (0, import_utils.setHeader)(import_server.NextResponse.next(), import_backend.constants.Headers.AuthReason, "skip");
    } else if (beforeAuthRes && (0, import_utils.isRedirect)(beforeAuthRes)) {
      logger.debug({ logKey: "beforeAuth", content: "Before auth returned redirect, following redirect" });
      return (0, import_utils.setHeader)(beforeAuthRes, import_backend.constants.Headers.AuthReason, "redirect");
    }
    const requestState = await (0, import_authenticateRequest.authenticateRequest)(req, options);
    if (requestState.isUnknown) {
      logger.debug({ logKey: "requestState", content: "authenticateRequest state is unknown", requestState });
      return (0, import_authenticateRequest.handleUnknownState)(requestState);
    } else if (requestState.isInterstitial && isApiRoute(req)) {
      logger.debug({
        logKey: "requestState",
        content: "authenticateRequest state is interstitial in an API route",
        requestState
      });
      return (0, import_authenticateRequest.handleUnknownState)(requestState);
    } else if (requestState.isInterstitial) {
      logger.debug({ logKey: "requestState", content: "authenticateRequest state is interstitial", requestState });
      assertClockSkew(requestState, options);
      const res = (0, import_authenticateRequest.handleInterstitialState)(requestState, options);
      return assertInfiniteRedirectionLoop(req, res, options, requestState);
    }
    const auth = Object.assign(requestState.toAuth(), {
      isPublicRoute: isPublicRoute(req),
      isApiRoute: isApiRoute(req)
    });
    logger.debug(() => ({ logKey: "auth", auth: JSON.stringify(auth), debug: auth.debug() }));
    const afterAuthRes = await (afterAuth || defaultAfterAuth)(auth, req, evt);
    const finalRes = (0, import_utils.mergeResponses)(beforeAuthRes, afterAuthRes) || import_server.NextResponse.next();
    logger.debug(() => ({
      logKey: "afterAuth",
      mergedHeaders: (0, import_utils.stringifyHeaders)(finalRes.headers)
    }));
    if ((0, import_utils.isRedirect)(finalRes)) {
      logger.debug({ logKey: "isRedirect", content: "Final response is redirect, following redirect" });
      const res = (0, import_utils.setHeader)(finalRes, import_backend.constants.Headers.AuthReason, "redirect");
      return appendDevBrowserOnCrossOrigin(req, res, options);
    }
    if (options.debug) {
      (0, import_utils2.setRequestHeadersOnNextResponse)(finalRes, req, {
        [import_backend.constants.Headers.EnableDebug]: "true"
      });
      logger.debug({ logKey: "setRequestHeaders", content: `Added ${import_backend.constants.Headers.EnableDebug} on request` });
    }
    return (0, import_utils2.decorateRequest)(req, finalRes, requestState);
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
        return (0, import_utils2.apiEndpointUnauthorizedNextResponse)();
      } else {
        informAboutProtectedRoute(req.experimental_clerkUrl.pathname, params, false);
      }
      return (0, import_redirect.redirectToSignIn)({ returnBackUrl: req.experimental_clerkUrl.href });
    }
    return import_server.NextResponse.next();
  };
};
const precomputePathRegex = (patterns) => {
  return patterns.map((pattern) => pattern instanceof RegExp ? pattern : import_utils.paths.toRegexp(pattern));
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
  const shouldAppendDevBrowser = res.headers.get(import_backend.constants.Headers.ClerkRedirectTo) === "true";
  if (shouldAppendDevBrowser && !!location && (0, import_utils2.isDevelopmentFromApiKey)(opts.secretKey || import_clerkClient.SECRET_KEY) && (0, import_utils2.isCrossOrigin)(req.experimental_clerkUrl, location)) {
    const dbJwt = ((_a = req.cookies.get(import_devBrowser.DEV_BROWSER_JWT_MARKER)) == null ? void 0 : _a.value) || "";
    const url = new URL(location);
    const urlWithDevBrowser = (0, import_devBrowser.setDevBrowserJWTInURL)(url, dbJwt, { hash: false });
    return import_server.NextResponse.redirect(urlWithDevBrowser.href, res);
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
  const requestContentType = req.headers.get(import_backend.constants.Headers.ContentType);
  return requestContentType === import_backend.constants.ContentTypes.Json;
};
const isRequestMethodIndicatingApiRoute = (req) => {
  const requestMethod = req.method.toLowerCase();
  return !["get", "head", "options"].includes(requestMethod);
};
const assertClockSkew = (requestState, opts) => {
  if (!(0, import_utils2.isDevelopmentFromApiKey)(opts.secretKey || import_clerkClient.SECRET_KEY)) {
    return;
  }
  if (requestState.reason === "token-not-active-yet") {
    throw new Error((0, import_errors.clockSkewDetected)(requestState.message));
  }
};
const assertInfiniteRedirectionLoop = (req, res, opts, requestState) => {
  var _a;
  if (!(0, import_utils2.isDevelopmentFromApiKey)(opts.secretKey || import_clerkClient.SECRET_KEY)) {
    return res;
  }
  const infiniteRedirectsCounter = Number((_a = req.cookies.get(INFINITE_REDIRECTION_LOOP_COOKIE)) == null ? void 0 : _a.value) || 0;
  if (infiniteRedirectsCounter === 6) {
    if (requestState.reason === "token-expired") {
      throw new Error((0, import_errors.clockSkewDetected)(requestState.message));
    }
    throw new Error((0, import_errors.infiniteRedirectLoopDetected)());
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
  const originUrl = (0, import_backend.buildRequestUrl)(req);
  clerkUrl.port = originUrl.port;
  clerkUrl.protocol = originUrl.protocol;
  clerkUrl.host = originUrl.host;
  return Object.assign(req, { experimental_clerkUrl: clerkUrl });
};
const informAboutProtectedRoute = (path, params, isApiRoute) => {
  if (params.debug || (0, import_utils2.isDevelopmentFromApiKey)(params.secretKey || import_clerkClient.SECRET_KEY)) {
    console.warn(
      (0, import_errors.informAboutProtectedRouteInfo)(
        path,
        !!params.publicRoutes,
        !!params.ignoredRoutes,
        isApiRoute,
        DEFAULT_IGNORED_ROUTES
      )
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_API_ROUTES,
  DEFAULT_CONFIG_MATCHER,
  DEFAULT_IGNORED_ROUTES,
  authMiddleware,
  createRouteMatcher
});
//# sourceMappingURL=authMiddleware.js.map