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
var withServerSideAuth_exports = {};
__export(withServerSideAuth_exports, {
  withServerSideAuth: () => withServerSideAuth
});
module.exports = __toCommonJS(withServerSideAuth_exports);
var import_backend = require("@clerk/backend");
var import_deprecated = require("@clerk/shared/deprecated");
var import_clerkClient = require("../server/clerkClient");
var import_utils = require("./utils");
const EMPTY_GSSP_RESPONSE = { props: {} };
const decorateResponseWithObservabilityHeaders = (res, requestState) => {
  requestState.message && res.setHeader(import_backend.constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  requestState.reason && res.setHeader(import_backend.constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  requestState.status && res.setHeader(import_backend.constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
};
const withServerSideAuth = (cbOrOptions, options) => {
  const cb = typeof cbOrOptions === "function" ? cbOrOptions : void 0;
  const opts = (options ? options : typeof cbOrOptions !== "function" ? cbOrOptions : {}) || {};
  (0, import_deprecated.deprecated)(
    "withServerSideAuth",
    "Use `authMiddleware` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
  );
  opts.loadOrganization = opts.loadOrganization || opts.loadOrg || void 0;
  return async (ctx) => {
    const requestState = await (0, import_utils.authenticateRequest)(ctx, opts);
    if (requestState.isUnknown) {
      decorateResponseWithObservabilityHeaders(ctx.res, requestState);
      ctx.res.writeHead(401, { "Content-Type": "text/html" });
      ctx.res.end();
      return EMPTY_GSSP_RESPONSE;
    }
    if (requestState.isInterstitial) {
      decorateResponseWithObservabilityHeaders(ctx.res, requestState);
      ctx.res.writeHead(401, { "Content-Type": "text/html" });
      const interstitial = await import_clerkClient.clerkClient.remotePublicInterstitial({
        apiUrl: import_clerkClient.API_URL,
        publishableKey: import_clerkClient.PUBLISHABLE_KEY,
        frontendApi: import_clerkClient.FRONTEND_API,
        pkgVersion: import_clerkClient.JS_VERSION,
        clerkJSUrl: import_clerkClient.CLERK_JS_URL,
        clerkJSVersion: import_clerkClient.CLERK_JS_VERSION,
        proxyUrl: requestState.proxyUrl,
        isSatellite: requestState.isSatellite,
        domain: requestState.domain,
        debugData: (0, import_backend.debugRequestState)(requestState)
      });
      ctx.res.end(interstitial);
      return EMPTY_GSSP_RESPONSE;
    }
    const legacyAuthData = { ...requestState.toAuth(), claims: requestState.toAuth().sessionClaims };
    const contextWithAuth = (0, import_utils.injectAuthIntoRequest)(ctx, legacyAuthData);
    const callbackResult = await (cb == null ? void 0 : cb(contextWithAuth)) || {};
    return (0, import_utils.injectSSRStateIntoProps)(callbackResult, (0, import_clerkClient.makeAuthObjectSerializable)((0, import_clerkClient.sanitizeAuthObject)(legacyAuthData)));
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  withServerSideAuth
});
//# sourceMappingURL=withServerSideAuth.js.map