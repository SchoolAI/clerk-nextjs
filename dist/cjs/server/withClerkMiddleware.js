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
var withClerkMiddleware_exports = {};
__export(withClerkMiddleware_exports, {
  decorateResponseWithObservabilityHeaders: () => decorateResponseWithObservabilityHeaders,
  withClerkMiddleware: () => withClerkMiddleware
});
module.exports = __toCommonJS(withClerkMiddleware_exports);
var import_backend = require("@clerk/backend");
var import_deprecated = require("@clerk/shared/deprecated");
var import_server = require("next/server");
var import_clerkClient = require("./clerkClient");
var import_utils = require("./utils");
const decorateResponseWithObservabilityHeaders = (res, requestState) => {
  requestState.message && res.headers.set(import_backend.constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  requestState.reason && res.headers.set(import_backend.constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  requestState.status && res.headers.set(import_backend.constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
};
const withClerkMiddleware = (...args) => {
  const noop = () => void 0;
  const [handler = noop, opts = {}] = args;
  (0, import_deprecated.deprecated)(
    "withClerkMiddleware",
    "Use `authMiddleware` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
  );
  return async (req, event) => {
    const { isSatellite, domain, signInUrl, proxyUrl } = (0, import_utils.handleMultiDomainAndProxy)(req, opts);
    const requestState = await import_clerkClient.clerkClient.authenticateRequest({
      ...opts,
      apiKey: opts.apiKey || import_clerkClient.API_KEY,
      secretKey: opts.secretKey || import_clerkClient.SECRET_KEY,
      frontendApi: opts.frontendApi || import_clerkClient.FRONTEND_API,
      publishableKey: opts.publishableKey || import_clerkClient.PUBLISHABLE_KEY,
      isSatellite,
      domain,
      signInUrl,
      proxyUrl,
      request: req
    });
    if (requestState.isUnknown) {
      const response = new import_server.NextResponse(null, { status: 401, headers: { "Content-Type": "text/html" } });
      decorateResponseWithObservabilityHeaders(response, requestState);
      return response;
    }
    if (requestState.isInterstitial) {
      const response = import_server.NextResponse.rewrite(
        import_clerkClient.clerkClient.remotePublicInterstitialUrl({
          apiUrl: import_clerkClient.API_URL,
          frontendApi: opts.frontendApi || import_clerkClient.FRONTEND_API,
          publishableKey: opts.publishableKey || import_clerkClient.PUBLISHABLE_KEY,
          clerkJSUrl: import_clerkClient.CLERK_JS_URL,
          clerkJSVersion: import_clerkClient.CLERK_JS_VERSION,
          proxyUrl: requestState.proxyUrl,
          isSatellite: requestState.isSatellite,
          domain: requestState.domain,
          debugData: (0, import_backend.debugRequestState)(requestState),
          signInUrl: requestState.signInUrl
        }),
        { status: 401 }
      );
      decorateResponseWithObservabilityHeaders(response, requestState);
      return response;
    }
    (0, import_utils.setCustomAttributeOnRequest)(req, import_backend.constants.Attributes.AuthStatus, requestState.status);
    (0, import_utils.setCustomAttributeOnRequest)(req, import_backend.constants.Attributes.AuthToken, requestState.token || "");
    (0, import_utils.setCustomAttributeOnRequest)(req, import_backend.constants.Attributes.AuthMessage, requestState.message || "");
    (0, import_utils.setCustomAttributeOnRequest)(req, import_backend.constants.Attributes.AuthReason, requestState.reason || "");
    const res = await handler(req, event);
    return (0, import_utils.decorateRequest)(req, res, requestState);
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decorateResponseWithObservabilityHeaders,
  withClerkMiddleware
});
//# sourceMappingURL=withClerkMiddleware.js.map