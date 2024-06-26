"use client";
import { SignIn as BaseSignIn, SignUp as BaseSignUp } from "@clerk/clerk-react";
import React from "react";
import { useClerkNextOptions } from "./NextOptionsContext";
import {
  UserProfile,
  UserButton,
  OrganizationSwitcher,
  OrganizationProfile,
  CreateOrganization,
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignInWithMetamaskButton,
  OrganizationList,
  __experimental_GoogleOneTap
} from "@clerk/clerk-react";
const SignIn = (props) => {
  const { signInUrl: repoLevelSignInUrl } = useClerkNextOptions();
  if (repoLevelSignInUrl) {
    return /* @__PURE__ */ React.createElement(
      BaseSignIn,
      {
        routing: "path",
        path: repoLevelSignInUrl,
        ...props
      }
    );
  }
  return /* @__PURE__ */ React.createElement(BaseSignIn, { ...props });
};
const SignUp = (props) => {
  const { signUpUrl: repoLevelSignUpUrl } = useClerkNextOptions();
  if (repoLevelSignUpUrl) {
    return /* @__PURE__ */ React.createElement(
      BaseSignUp,
      {
        routing: "path",
        path: repoLevelSignUpUrl,
        ...props
      }
    );
  }
  return /* @__PURE__ */ React.createElement(BaseSignUp, { ...props });
};
export {
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
};
//# sourceMappingURL=uiComponents.js.map