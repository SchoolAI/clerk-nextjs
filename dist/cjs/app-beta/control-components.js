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
var control_components_exports = {};
__export(control_components_exports, {
  SignedIn: () => SignedIn,
  SignedOut: () => SignedOut
});
module.exports = __toCommonJS(control_components_exports);
var import_deprecated = require("@clerk/shared/deprecated");
var import_react = __toESM(require("react"));
var import_auth = require("./auth");
(0, import_deprecated.deprecated)(
  "@clerk/nextjs/app-beta",
  "Use imports from `@clerk/nextjs` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
);
function SignedIn(props) {
  const { children } = props;
  const { userId } = (0, import_auth.auth)();
  return userId ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children) : null;
}
function SignedOut(props) {
  const { children } = props;
  const { userId } = (0, import_auth.auth)();
  return userId ? null : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SignedIn,
  SignedOut
});
//# sourceMappingURL=control-components.js.map