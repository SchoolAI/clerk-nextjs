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
var controlComponents_exports = {};
__export(controlComponents_exports, {
  Protect: () => Protect,
  SignedIn: () => SignedIn,
  SignedOut: () => SignedOut
});
module.exports = __toCommonJS(controlComponents_exports);
var import_react = __toESM(require("react"));
var import_auth = require("./auth");
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
function Protect(props) {
  const { children, fallback, ...restAuthorizedParams } = props;
  const { has, userId } = (0, import_auth.auth)();
  const unauthorized = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, fallback != null ? fallback : null);
  const authorized = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
  if (!userId) {
    return unauthorized;
  }
  if (typeof restAuthorizedParams.condition === "function") {
    if (restAuthorizedParams.condition(has)) {
      return authorized;
    }
    return unauthorized;
  }
  if (restAuthorizedParams.role || restAuthorizedParams.permission) {
    if (has(restAuthorizedParams)) {
      return authorized;
    }
    return unauthorized;
  }
  return authorized;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Protect,
  SignedIn,
  SignedOut
});
//# sourceMappingURL=controlComponents.js.map