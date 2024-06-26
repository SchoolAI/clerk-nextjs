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
var ClerkProvider_exports = {};
__export(ClerkProvider_exports, {
  ClerkProvider: () => ClerkProvider
});
module.exports = __toCommonJS(ClerkProvider_exports);
var import_deprecated = require("@clerk/shared/deprecated");
var import_react = __toESM(require("react"));
var import_auth = require("./auth");
var import_ClerkProvider = require("./client/ClerkProvider");
(0, import_deprecated.deprecated)(
  "@clerk/nextjs/app-beta",
  "Use imports from `@clerk/nextjs` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
);
function ClerkProvider(props) {
  var _a;
  const state = ((_a = (0, import_auth.initialState)()) == null ? void 0 : _a.__clerk_ssr_state) || { sessionId: null, orgId: null, userId: null };
  return (
    // @ts-expect-error
    /* @__PURE__ */ import_react.default.createElement(
      import_ClerkProvider.ClerkProvider,
      {
        frontendApi: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || "",
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
        proxyUrl: process.env.NEXT_PUBLIC_CLERK_PROXY_URL,
        initialState: state,
        ...props
      }
    )
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkProvider
});
//# sourceMappingURL=ClerkProvider.js.map