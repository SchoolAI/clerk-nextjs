"use strict";
"use client";
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
var uiComponents_exports = {};
__export(uiComponents_exports, {
  CreateOrganization: () => import_clerk_react2.CreateOrganization,
  OrganizationList: () => import_clerk_react2.OrganizationList,
  OrganizationProfile: () => import_clerk_react2.OrganizationProfile,
  OrganizationSwitcher: () => import_clerk_react2.OrganizationSwitcher,
  SignIn: () => SignIn,
  SignInButton: () => import_clerk_react2.SignInButton,
  SignInWithMetamaskButton: () => import_clerk_react2.SignInWithMetamaskButton,
  SignOutButton: () => import_clerk_react2.SignOutButton,
  SignUp: () => SignUp,
  SignUpButton: () => import_clerk_react2.SignUpButton,
  UserButton: () => import_clerk_react2.UserButton,
  UserProfile: () => import_clerk_react2.UserProfile,
  __experimental_GoogleOneTap: () => import_clerk_react2.__experimental_GoogleOneTap
});
module.exports = __toCommonJS(uiComponents_exports);
var import_clerk_react = require("@clerk/clerk-react");
var import_react = __toESM(require("react"));
var import_NextOptionsContext = require("./NextOptionsContext");
var import_clerk_react2 = require("@clerk/clerk-react");
const SignIn = (props) => {
  const { signInUrl: repoLevelSignInUrl } = (0, import_NextOptionsContext.useClerkNextOptions)();
  if (repoLevelSignInUrl) {
    return /* @__PURE__ */ import_react.default.createElement(
      import_clerk_react.SignIn,
      {
        routing: "path",
        path: repoLevelSignInUrl,
        ...props
      }
    );
  }
  return /* @__PURE__ */ import_react.default.createElement(import_clerk_react.SignIn, { ...props });
};
const SignUp = (props) => {
  const { signUpUrl: repoLevelSignUpUrl } = (0, import_NextOptionsContext.useClerkNextOptions)();
  if (repoLevelSignUpUrl) {
    return /* @__PURE__ */ import_react.default.createElement(
      import_clerk_react.SignUp,
      {
        routing: "path",
        path: repoLevelSignUpUrl,
        ...props
      }
    );
  }
  return /* @__PURE__ */ import_react.default.createElement(import_clerk_react.SignUp, { ...props });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateOrganization,
  OrganizationList,
  OrganizationProfile,
  OrganizationSwitcher,
  SignIn,
  SignInButton,
  SignInWithMetamaskButton,
  SignOutButton,
  SignUp,
  SignUpButton,
  UserButton,
  UserProfile,
  __experimental_GoogleOneTap
});
//# sourceMappingURL=uiComponents.js.map