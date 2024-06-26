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
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth,
  initialState: () => initialState
});
module.exports = __toCommonJS(auth_exports);
var import_buildClerkProps = require("../../server/buildClerkProps");
var import_createGetAuth = require("../../server/createGetAuth");
var import_errors = require("../../server/errors");
var import_utils = require("./utils");
const auth = () => {
  const authObject = (0, import_createGetAuth.createGetAuth)({
    debugLoggerName: "auth()",
    noAuthStatusMessage: (0, import_errors.authAuthHeaderMissing)()
  })((0, import_utils.buildRequestLike)());
  const { notFound, redirect } = require("next/navigation");
  authObject.protect = (params, options) => {
    const paramsOrFunction = (params == null ? void 0 : params.redirectUrl) ? void 0 : params;
    const redirectUrl = (params == null ? void 0 : params.redirectUrl) || (options == null ? void 0 : options.redirectUrl);
    const handleUnauthorized = () => {
      if (redirectUrl) {
        redirect(redirectUrl);
      }
      notFound();
    };
    if (!authObject.userId) {
      return handleUnauthorized();
    }
    if (!paramsOrFunction) {
      return { ...authObject };
    }
    if (typeof paramsOrFunction === "function") {
      if (paramsOrFunction(authObject.has)) {
        return { ...authObject };
      }
      return handleUnauthorized();
    }
    if (authObject.has(paramsOrFunction)) {
      return { ...authObject };
    }
    return handleUnauthorized();
  };
  return authObject;
};
const initialState = () => {
  return (0, import_buildClerkProps.buildClerkProps)((0, import_utils.buildRequestLike)());
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth,
  initialState
});
//# sourceMappingURL=auth.js.map