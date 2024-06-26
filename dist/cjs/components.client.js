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
var components_client_exports = {};
__export(components_client_exports, {
  ClerkProvider: () => import_ClerkProvider.ClerkProvider,
  Protect: () => import_controlComponents.Protect,
  SignedIn: () => import_controlComponents.SignedIn,
  SignedOut: () => import_controlComponents.SignedOut
});
module.exports = __toCommonJS(components_client_exports);
var import_ClerkProvider = require("./client-boundary/ClerkProvider");
var import_controlComponents = require("./client-boundary/controlComponents");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkProvider,
  Protect,
  SignedIn,
  SignedOut
});
//# sourceMappingURL=components.client.js.map