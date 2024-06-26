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
var server_helpers_server_exports = {};
__export(server_helpers_server_exports, {
  auth: () => import_auth.auth,
  authMiddleware: () => import_authMiddleware.authMiddleware,
  clerkClient: () => import_clerkClient.clerkClient,
  currentUser: () => import_currentUser.currentUser,
  getAuth: () => import_createGetAuth.getAuth,
  redirectToSignIn: () => import_redirect.redirectToSignIn,
  redirectToSignUp: () => import_redirect.redirectToSignUp,
  withClerkMiddleware: () => import_withClerkMiddleware.withClerkMiddleware
});
module.exports = __toCommonJS(server_helpers_server_exports);
var import_auth = require("./app-router/server/auth");
var import_currentUser = require("./app-router/server/currentUser");
var import_authMiddleware = require("./server/authMiddleware");
var import_clerkClient = require("./server/clerkClient");
var import_createGetAuth = require("./server/createGetAuth");
var import_redirect = require("./server/redirect");
var import_withClerkMiddleware = require("./server/withClerkMiddleware");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth,
  authMiddleware,
  clerkClient,
  currentUser,
  getAuth,
  redirectToSignIn,
  redirectToSignUp,
  withClerkMiddleware
});
//# sourceMappingURL=server-helpers.server.js.map