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
var client_exports = {};
__export(client_exports, {
  AuthenticateWithRedirectCallback: () => import_clerk_react.AuthenticateWithRedirectCallback,
  ClerkLoaded: () => import_clerk_react.ClerkLoaded,
  ClerkLoading: () => import_clerk_react.ClerkLoading,
  ClerkProvider: () => import_ClerkProvider.ClerkProvider,
  CreateOrganization: () => import_ui_components.CreateOrganization,
  OrganizationProfile: () => import_ui_components.OrganizationProfile,
  OrganizationSwitcher: () => import_ui_components.OrganizationSwitcher,
  RedirectToCreateOrganization: () => import_clerk_react.RedirectToCreateOrganization,
  RedirectToOrganizationProfile: () => import_clerk_react.RedirectToOrganizationProfile,
  RedirectToSignIn: () => import_clerk_react.RedirectToSignIn,
  RedirectToSignUp: () => import_clerk_react.RedirectToSignUp,
  RedirectToUserProfile: () => import_clerk_react.RedirectToUserProfile,
  SignIn: () => import_ui_components.SignIn,
  SignUp: () => import_ui_components.SignUp,
  SignedIn: () => import_clerk_react.SignedIn,
  SignedOut: () => import_clerk_react.SignedOut,
  UserButton: () => import_ui_components.UserButton,
  UserProfile: () => import_ui_components.UserProfile,
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
  useUser: () => import_clerk_react.useUser
});
module.exports = __toCommonJS(client_exports);
var import_ClerkProvider = require("./ClerkProvider");
var import_clerk_react = require("./clerk-react");
var import_ui_components = require("./ui-components");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateWithRedirectCallback,
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  CreateOrganization,
  OrganizationProfile,
  OrganizationSwitcher,
  RedirectToCreateOrganization,
  RedirectToOrganizationProfile,
  RedirectToSignIn,
  RedirectToSignUp,
  RedirectToUserProfile,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
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
  useUser
});
//# sourceMappingURL=index.js.map