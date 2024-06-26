"use strict";
"use client";
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
var hooks_exports = {};
__export(hooks_exports, {
  EmailLinkErrorCode: () => import_clerk_react2.EmailLinkErrorCode,
  MagicLinkErrorCode: () => import_clerk_react2.MagicLinkErrorCode,
  WithClerk: () => import_clerk_react.WithClerk,
  WithSession: () => import_clerk_react.WithSession,
  WithUser: () => import_clerk_react.WithUser,
  isClerkAPIResponseError: () => import_clerk_react2.isClerkAPIResponseError,
  isEmailLinkError: () => import_clerk_react2.isEmailLinkError,
  isKnownError: () => import_clerk_react2.isKnownError,
  isMagicLinkError: () => import_clerk_react2.isMagicLinkError,
  isMetamaskError: () => import_clerk_react2.isMetamaskError,
  useAuth: () => import_clerk_react.useAuth,
  useClerk: () => import_clerk_react.useClerk,
  useEmailLink: () => import_clerk_react.useEmailLink,
  useMagicLink: () => import_clerk_react.useMagicLink,
  useOrganization: () => import_clerk_react.useOrganization,
  useOrganizationList: () => import_clerk_react.useOrganizationList,
  useOrganizations: () => import_clerk_react.useOrganizations,
  useSession: () => import_clerk_react.useSession,
  useSessionList: () => import_clerk_react.useSessionList,
  useSignIn: () => import_clerk_react.useSignIn,
  useSignUp: () => import_clerk_react.useSignUp,
  useUser: () => import_clerk_react.useUser,
  withClerk: () => import_clerk_react.withClerk,
  withSession: () => import_clerk_react.withSession,
  withUser: () => import_clerk_react.withUser
});
module.exports = __toCommonJS(hooks_exports);
var import_clerk_react = require("@clerk/clerk-react");
var import_clerk_react2 = require("@clerk/clerk-react");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailLinkErrorCode,
  MagicLinkErrorCode,
  WithClerk,
  WithSession,
  WithUser,
  isClerkAPIResponseError,
  isEmailLinkError,
  isKnownError,
  isMagicLinkError,
  isMetamaskError,
  useAuth,
  useClerk,
  useEmailLink,
  useMagicLink,
  useOrganization,
  useOrganizationList,
  useOrganizations,
  useSession,
  useSessionList,
  useSignIn,
  useSignUp,
  useUser,
  withClerk,
  withSession,
  withUser
});
//# sourceMappingURL=hooks.js.map