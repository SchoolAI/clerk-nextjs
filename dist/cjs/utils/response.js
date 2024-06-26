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
var response_exports = {};
__export(response_exports, {
  isRedirect: () => isRedirect,
  mergeResponses: () => mergeResponses,
  setHeader: () => setHeader,
  stringifyHeaders: () => stringifyHeaders
});
module.exports = __toCommonJS(response_exports);
var import_server = require("next/server");
var import_constants = require("../constants");
const mergeResponses = (...responses) => {
  const normalisedResponses = responses.filter(Boolean).map((res) => {
    if (res instanceof import_server.NextResponse) {
      return res;
    }
    return new import_server.NextResponse(res.body, res);
  });
  if (normalisedResponses.length === 0) {
    return;
  }
  const lastResponse = normalisedResponses[normalisedResponses.length - 1];
  const finalResponse = new import_server.NextResponse(lastResponse.body, lastResponse);
  for (const response of normalisedResponses) {
    response.headers.forEach((value, name) => {
      finalResponse.headers.set(name, value);
    });
    response.cookies.getAll().forEach((cookie) => {
      const { name, value, ...options } = cookie;
      finalResponse.cookies.set(name, value, options);
    });
  }
  return finalResponse;
};
const isRedirect = (res) => {
  return res.headers.get(import_constants.constants.Headers.NextRedirect);
};
const setHeader = (res, name, val) => {
  res.headers.set(name, val);
  return res;
};
const stringifyHeaders = (headers) => {
  if (!headers) {
    return JSON.stringify({});
  }
  const obj = {};
  headers.forEach((value, name) => {
    obj[name] = value;
  });
  return JSON.stringify(obj);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isRedirect,
  mergeResponses,
  setHeader,
  stringifyHeaders
});
//# sourceMappingURL=response.js.map