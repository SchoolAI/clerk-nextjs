"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  AuthenticateWithRedirectCallback: () => import_controlComponents.AuthenticateWithRedirectCallback,
  ClerkLoaded: () => import_controlComponents.ClerkLoaded,
  ClerkLoading: () => import_controlComponents.ClerkLoading,
  ClerkProvider: () => ClerkProvider,
  CreateOrganization: () => import_uiComponents.CreateOrganization,
  EmailLinkErrorCode: () => import_hooks.EmailLinkErrorCode,
  MagicLinkErrorCode: () => import_hooks.MagicLinkErrorCode,
  MultisessionAppSupport: () => import_controlComponents.MultisessionAppSupport,
  OrganizationList: () => import_uiComponents.OrganizationList,
  OrganizationProfile: () => import_uiComponents.OrganizationProfile,
  OrganizationSwitcher: () => import_uiComponents.OrganizationSwitcher,
  Protect: () => Protect,
  RedirectToCreateOrganization: () => import_controlComponents.RedirectToCreateOrganization,
  RedirectToOrganizationProfile: () => import_controlComponents.RedirectToOrganizationProfile,
  RedirectToSignIn: () => import_controlComponents.RedirectToSignIn,
  RedirectToSignUp: () => import_controlComponents.RedirectToSignUp,
  RedirectToUserProfile: () => import_controlComponents.RedirectToUserProfile,
  SignIn: () => import_uiComponents.SignIn,
  SignInButton: () => import_uiComponents.SignInButton,
  SignInWithMetamaskButton: () => import_uiComponents.SignInWithMetamaskButton,
  SignOutButton: () => import_uiComponents.SignOutButton,
  SignUp: () => import_uiComponents.SignUp,
  SignUpButton: () => import_uiComponents.SignUpButton,
  SignedIn: () => SignedIn,
  SignedOut: () => SignedOut,
  UserButton: () => import_uiComponents.UserButton,
  UserProfile: () => import_uiComponents.UserProfile,
  WithClerk: () => import_hooks.WithClerk,
  WithSession: () => import_hooks.WithSession,
  WithUser: () => import_hooks.WithUser,
  __experimental_GoogleOneTap: () => import_uiComponents.__experimental_GoogleOneTap,
  auth: () => auth,
  authMiddleware: () => authMiddleware,
  clerkClient: () => clerkClient,
  currentUser: () => currentUser,
  isClerkAPIResponseError: () => import_hooks.isClerkAPIResponseError,
  isEmailLinkError: () => import_hooks.isEmailLinkError,
  isKnownError: () => import_hooks.isKnownError,
  isMagicLinkError: () => import_hooks.isMagicLinkError,
  isMetamaskError: () => import_hooks.isMetamaskError,
  redirectToSignIn: () => redirectToSignIn,
  redirectToSignUp: () => redirectToSignUp,
  useAuth: () => import_hooks.useAuth,
  useClerk: () => import_hooks.useClerk,
  useEmailLink: () => import_hooks.useEmailLink,
  useMagicLink: () => import_hooks.useMagicLink,
  useOrganization: () => import_hooks.useOrganization,
  useOrganizationList: () => import_hooks.useOrganizationList,
  useOrganizations: () => import_hooks.useOrganizations,
  useSession: () => import_hooks.useSession,
  useSessionList: () => import_hooks.useSessionList,
  useSignIn: () => import_hooks.useSignIn,
  useSignUp: () => import_hooks.useSignUp,
  useUser: () => import_hooks.useUser,
  withClerk: () => import_hooks.withClerk,
  withClerkMiddleware: () => withClerkMiddleware,
  withSession: () => import_hooks.withSession,
  withUser: () => import_hooks.withUser
});
module.exports = __toCommonJS(src_exports);
var import_controlComponents = require("./client-boundary/controlComponents");
var import_uiComponents = require("./client-boundary/uiComponents");
var import_hooks = require("./client-boundary/hooks");
var ComponentsModule = __toESM(require("#components"));
var ServerHelperModule = __toESM(require("#server"));
const ClerkProvider = ComponentsModule.ClerkProvider;
const SignedIn = ComponentsModule.SignedIn;
const SignedOut = ComponentsModule.SignedOut;
const Protect = ComponentsModule.Protect;
const auth = ServerHelperModule.auth;
const currentUser = ServerHelperModule.currentUser;
const clerkClient = ServerHelperModule.clerkClient;
const authMiddleware = ServerHelperModule.authMiddleware;
const redirectToSignIn = ServerHelperModule.redirectToSignIn;
const redirectToSignUp = ServerHelperModule.redirectToSignUp;
const withClerkMiddleware = ServerHelperModule.withClerkMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateWithRedirectCallback,
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  CreateOrganization,
  EmailLinkErrorCode,
  MagicLinkErrorCode,
  MultisessionAppSupport,
  OrganizationList,
  OrganizationProfile,
  OrganizationSwitcher,
  Protect,
  RedirectToCreateOrganization,
  RedirectToOrganizationProfile,
  RedirectToSignIn,
  RedirectToSignUp,
  RedirectToUserProfile,
  SignIn,
  SignInButton,
  SignInWithMetamaskButton,
  SignOutButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  WithClerk,
  WithSession,
  WithUser,
  __experimental_GoogleOneTap,
  auth,
  authMiddleware,
  clerkClient,
  currentUser,
  isClerkAPIResponseError,
  isEmailLinkError,
  isKnownError,
  isMagicLinkError,
  isMetamaskError,
  redirectToSignIn,
  redirectToSignUp,
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
  withClerkMiddleware,
  withSession,
  withUser
});
//# sourceMappingURL=index.js.map