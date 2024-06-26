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
var injectAuthIntoRequest_exports = {};
__export(injectAuthIntoRequest_exports, {
  injectAuthIntoRequest: () => injectAuthIntoRequest
});
module.exports = __toCommonJS(injectAuthIntoRequest_exports);
function injectAuthIntoRequest(ctx, authData) {
  const { user, session, userId, sessionId, getToken, claims, organization } = authData;
  ctx.req.auth = {
    userId,
    sessionId,
    getToken,
    claims,
    actor: (claims == null ? void 0 : claims.act) || null
  };
  ctx.req.user = user;
  ctx.req.session = session;
  ctx.req.organization = organization;
  return ctx;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  injectAuthIntoRequest
});
//# sourceMappingURL=injectAuthIntoRequest.js.map