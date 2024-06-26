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
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth,
  initialState: () => initialState
});
module.exports = __toCommonJS(auth_exports);
var import_deprecated = require("@clerk/shared/deprecated");
var import_headers = require("next/headers");
var import_server = require("next/server");
var import_server2 = require("../server");
(0, import_deprecated.deprecated)(
  "@clerk/nextjs/app-beta",
  "Use imports from `@clerk/nextjs` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
);
const buildRequestLike = () => {
  return new import_server.NextRequest("https://placeholder.com", { headers: (0, import_headers.headers)() });
};
const auth = () => {
  return (0, import_server2.getAuth)(buildRequestLike());
};
const initialState = () => {
  return (0, import_server2.buildClerkProps)(buildRequestLike());
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth,
  initialState
});
//# sourceMappingURL=auth.js.map