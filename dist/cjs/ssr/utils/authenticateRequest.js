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
var authenticateRequest_exports = {};
__export(authenticateRequest_exports, {
  authenticateRequest: () => authenticateRequest
});
module.exports = __toCommonJS(authenticateRequest_exports);
var import_server = require("../../server");
function authenticateRequest(ctx, opts = {}) {
  var _a;
  const { headers, cookies } = ctx.req;
  const cookieToken = cookies["__session"];
  const headerToken = (_a = headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
  return import_server.clerkClient.authenticateRequest({
    ...opts,
    apiKey: import_server.API_KEY,
    secretKey: import_server.SECRET_KEY,
    frontendApi: import_server.FRONTEND_API,
    publishableKey: import_server.PUBLISHABLE_KEY,
    cookieToken,
    headerToken,
    clientUat: cookies["__client_uat"],
    origin: headers.origin,
    host: headers.host,
    forwardedPort: headers["x-forwarded-port"],
    forwardedHost: headers["x-forwarded-host"],
    referrer: headers.referer,
    userAgent: headers["user-agent"],
    proxyUrl: import_server.PROXY_URL
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateRequest
});
//# sourceMappingURL=authenticateRequest.js.map