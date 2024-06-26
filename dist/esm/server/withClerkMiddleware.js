import { constants, debugRequestState } from "@clerk/backend";
import { deprecated } from "@clerk/shared/deprecated";
import { NextResponse } from "next/server";
import {
  API_KEY,
  API_URL,
  CLERK_JS_URL,
  CLERK_JS_VERSION,
  clerkClient,
  FRONTEND_API,
  PUBLISHABLE_KEY,
  SECRET_KEY
} from "./clerkClient";
import { decorateRequest, handleMultiDomainAndProxy, setCustomAttributeOnRequest } from "./utils";
const decorateResponseWithObservabilityHeaders = (res, requestState) => {
  requestState.message && res.headers.set(constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  requestState.reason && res.headers.set(constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  requestState.status && res.headers.set(constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
};
const withClerkMiddleware = (...args) => {
  const noop = () => void 0;
  const [handler = noop, opts = {}] = args;
  deprecated(
    "withClerkMiddleware",
    "Use `authMiddleware` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
  );
  return async (req, event) => {
    const { isSatellite, domain, signInUrl, proxyUrl } = handleMultiDomainAndProxy(req, opts);
    const requestState = await clerkClient.authenticateRequest({
      ...opts,
      apiKey: opts.apiKey || API_KEY,
      secretKey: opts.secretKey || SECRET_KEY,
      frontendApi: opts.frontendApi || FRONTEND_API,
      publishableKey: opts.publishableKey || PUBLISHABLE_KEY,
      isSatellite,
      domain,
      signInUrl,
      proxyUrl,
      request: req
    });
    if (requestState.isUnknown) {
      const response = new NextResponse(null, { status: 401, headers: { "Content-Type": "text/html" } });
      decorateResponseWithObservabilityHeaders(response, requestState);
      return response;
    }
    if (requestState.isInterstitial) {
      const response = NextResponse.rewrite(
        clerkClient.remotePublicInterstitialUrl({
          apiUrl: API_URL,
          frontendApi: opts.frontendApi || FRONTEND_API,
          publishableKey: opts.publishableKey || PUBLISHABLE_KEY,
          clerkJSUrl: CLERK_JS_URL,
          clerkJSVersion: CLERK_JS_VERSION,
          proxyUrl: requestState.proxyUrl,
          isSatellite: requestState.isSatellite,
          domain: requestState.domain,
          debugData: debugRequestState(requestState),
          signInUrl: requestState.signInUrl
        }),
        { status: 401 }
      );
      decorateResponseWithObservabilityHeaders(response, requestState);
      return response;
    }
    setCustomAttributeOnRequest(req, constants.Attributes.AuthStatus, requestState.status);
    setCustomAttributeOnRequest(req, constants.Attributes.AuthToken, requestState.token || "");
    setCustomAttributeOnRequest(req, constants.Attributes.AuthMessage, requestState.message || "");
    setCustomAttributeOnRequest(req, constants.Attributes.AuthReason, requestState.reason || "");
    const res = await handler(req, event);
    return decorateRequest(req, res, requestState);
  };
};
export {
  decorateResponseWithObservabilityHeaders,
  withClerkMiddleware
};
//# sourceMappingURL=withClerkMiddleware.js.map