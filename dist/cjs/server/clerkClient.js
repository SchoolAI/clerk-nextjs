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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var clerkClient_exports = {};
__export(clerkClient_exports, {
  Clerk: () => import_backend.Clerk,
  clerkClient: () => clerkClient,
  createClerkClient: () => createClerkClient
});
module.exports = __toCommonJS(clerkClient_exports);
var import_backend = require("@clerk/backend");
var import_constants = require("./constants");
__reExport(clerkClient_exports, require("@clerk/backend"), module.exports);
__reExport(clerkClient_exports, require("./constants"), module.exports);
const clerkClient = (0, import_backend.Clerk)({
  apiKey: import_constants.API_KEY,
  secretKey: import_constants.SECRET_KEY,
  apiUrl: import_constants.API_URL,
  apiVersion: import_constants.API_VERSION,
  userAgent: `${"@clerk/nextjs"}@${"4.30.0"}`,
  proxyUrl: import_constants.PROXY_URL,
  domain: import_constants.DOMAIN,
  isSatellite: import_constants.IS_SATELLITE
});
const createClerkClient = import_backend.Clerk;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Clerk,
  clerkClient,
  createClerkClient,
  ...require("@clerk/backend"),
  ...require("./constants")
});
//# sourceMappingURL=clerkClient.js.map