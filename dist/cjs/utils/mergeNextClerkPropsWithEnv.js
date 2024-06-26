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
var mergeNextClerkPropsWithEnv_exports = {};
__export(mergeNextClerkPropsWithEnv_exports, {
  mergeNextClerkPropsWithEnv: () => mergeNextClerkPropsWithEnv
});
module.exports = __toCommonJS(mergeNextClerkPropsWithEnv_exports);
const mergeNextClerkPropsWithEnv = (props) => {
  return {
    ...props,
    frontendApi: props.frontendApi || process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || "",
    publishableKey: props.publishableKey || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
    clerkJSUrl: props.clerkJSUrl || process.env.NEXT_PUBLIC_CLERK_JS,
    clerkJSVersion: props.clerkJSVersion || process.env.NEXT_PUBLIC_CLERK_JS_VERSION,
    proxyUrl: props.proxyUrl || process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "",
    domain: props.domain || process.env.NEXT_PUBLIC_CLERK_DOMAIN || "",
    isSatellite: props.isSatellite || process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE === "true",
    signInUrl: props.signInUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "",
    signUpUrl: props.signUpUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "",
    afterSignInUrl: props.afterSignInUrl || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "",
    afterSignUpUrl: props.afterSignUpUrl || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "",
    sdkMetadata: {
      name: "@clerk/nextjs",
      version: "4.30.0"
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeNextClerkPropsWithEnv
});
//# sourceMappingURL=mergeNextClerkPropsWithEnv.js.map