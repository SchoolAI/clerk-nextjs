import { constants, debugRequestState } from "@clerk/backend";
import { deprecated } from "@clerk/shared/deprecated";
import {
  API_URL,
  CLERK_JS_URL,
  CLERK_JS_VERSION,
  clerkClient,
  FRONTEND_API,
  JS_VERSION,
  makeAuthObjectSerializable,
  PUBLISHABLE_KEY,
  sanitizeAuthObject
} from "../server/clerkClient";
import { authenticateRequest, injectAuthIntoRequest, injectSSRStateIntoProps } from "./utils";
const EMPTY_GSSP_RESPONSE = { props: {} };
const decorateResponseWithObservabilityHeaders = (res, requestState) => {
  requestState.message && res.setHeader(constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  requestState.reason && res.setHeader(constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  requestState.status && res.setHeader(constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
};
const withServerSideAuth = (cbOrOptions, options) => {
  const cb = typeof cbOrOptions === "function" ? cbOrOptions : void 0;
  const opts = (options ? options : typeof cbOrOptions !== "function" ? cbOrOptions : {}) || {};
  deprecated(
    "withServerSideAuth",
    "Use `authMiddleware` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
  );
  opts.loadOrganization = opts.loadOrganization || opts.loadOrg || void 0;
  return async (ctx) => {
    const requestState = await authenticateRequest(ctx, opts);
    if (requestState.isUnknown) {
      decorateResponseWithObservabilityHeaders(ctx.res, requestState);
      ctx.res.writeHead(401, { "Content-Type": "text/html" });
      ctx.res.end();
      return EMPTY_GSSP_RESPONSE;
    }
    if (requestState.isInterstitial) {
      decorateResponseWithObservabilityHeaders(ctx.res, requestState);
      ctx.res.writeHead(401, { "Content-Type": "text/html" });
      const interstitial = await clerkClient.remotePublicInterstitial({
        apiUrl: API_URL,
        publishableKey: PUBLISHABLE_KEY,
        frontendApi: FRONTEND_API,
        pkgVersion: JS_VERSION,
        clerkJSUrl: CLERK_JS_URL,
        clerkJSVersion: CLERK_JS_VERSION,
        proxyUrl: requestState.proxyUrl,
        isSatellite: requestState.isSatellite,
        domain: requestState.domain,
        debugData: debugRequestState(requestState)
      });
      ctx.res.end(interstitial);
      return EMPTY_GSSP_RESPONSE;
    }
    const legacyAuthData = { ...requestState.toAuth(), claims: requestState.toAuth().sessionClaims };
    const contextWithAuth = injectAuthIntoRequest(ctx, legacyAuthData);
    const callbackResult = await (cb == null ? void 0 : cb(contextWithAuth)) || {};
    return injectSSRStateIntoProps(callbackResult, makeAuthObjectSerializable(sanitizeAuthObject(legacyAuthData)));
  };
};
export {
  withServerSideAuth
};
//# sourceMappingURL=withServerSideAuth.js.map