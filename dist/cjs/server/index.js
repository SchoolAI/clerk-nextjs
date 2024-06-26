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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var server_exports = {};
__export(server_exports, {
  auth: () => import_auth.auth,
  authMiddleware: () => import_authMiddleware.authMiddleware,
  buildClerkProps: () => import_buildClerkProps.buildClerkProps,
  currentUser: () => import_currentUser.currentUser,
  getAuth: () => import_createGetAuth.getAuth,
  redirectToSignIn: () => import_redirect.redirectToSignIn,
  redirectToSignUp: () => import_redirect.redirectToSignUp
});
module.exports = __toCommonJS(server_exports);
__reExport(server_exports, require("./clerkClient"), module.exports);
var import_createGetAuth = require("./createGetAuth");
var import_buildClerkProps = require("./buildClerkProps");
__reExport(server_exports, require("./withClerkMiddleware"), module.exports);
var import_redirect = require("./redirect");
var import_auth = require("../app-router/server/auth");
var import_currentUser = require("../app-router/server/currentUser");
var import_authMiddleware = require("./authMiddleware");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth,
  authMiddleware,
  buildClerkProps,
  currentUser,
  getAuth,
  redirectToSignIn,
  redirectToSignUp,
  ...require("./clerkClient"),
  ...require("./withClerkMiddleware")
});
//# sourceMappingURL=index.js.map