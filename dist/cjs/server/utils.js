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
var utils_exports = {};
__export(utils_exports, {
  apiEndpointUnauthorizedNextResponse: () => apiEndpointUnauthorizedNextResponse,
  decorateRequest: () => decorateRequest,
  getAuthKeyFromRequest: () => getAuthKeyFromRequest,
  getAuthStatusFromRequest: () => getAuthStatusFromRequest,
  getCookie: () => getCookie,
  getCustomAttributeFromRequest: () => getCustomAttributeFromRequest,
  getHeader: () => getHeader,
  handleMultiDomainAndProxy: () => handleMultiDomainAndProxy,
  injectSSRStateIntoObject: () => injectSSRStateIntoObject,
  isCrossOrigin: () => isCrossOrigin,
  isDevelopmentFromApiKey: () => isDevelopmentFromApiKey,
  nextJsVersionCanOverrideRequestHeaders: () => nextJsVersionCanOverrideRequestHeaders,
  setCustomAttributeOnRequest: () => setCustomAttributeOnRequest,
  setRequestHeadersOnNextResponse: () => setRequestHeadersOnNextResponse
});
module.exports = __toCommonJS(utils_exports);
var import_backend = require("@clerk/backend");
var import_handleValueOrFn = require("@clerk/shared/handleValueOrFn");
var import_proxy = require("@clerk/shared/proxy");
var import_server = require("next/server");
var import_constants = require("../constants");
var import_clerkClient = require("./clerkClient");
var import_errors = require("./errors");
function setCustomAttributeOnRequest(req, key, value) {
  Object.assign(req, { [key]: value });
}
function getCustomAttributeFromRequest(req, key) {
  return key in req ? req[key] : void 0;
}
function getAuthKeyFromRequest(req, key) {
  const val = getCustomAttributeFromRequest(req, import_backend.constants.Attributes[key]) || getHeader(req, import_backend.constants.Headers[key]);
  if (val) {
    return val;
  }
  if (key === "AuthStatus" || key === "AuthToken") {
    return getQueryParam(req, key) || void 0;
  }
  return void 0;
}
function getAuthStatusFromRequest(req) {
  return getCustomAttributeFromRequest(req, import_backend.constants.Attributes.AuthStatus) || getHeader(req, import_backend.constants.Headers.AuthStatus) || getQueryParam(req, import_backend.constants.SearchParams.AuthStatus);
}
function getQueryParam(req, name) {
  if (isNextRequest(req)) {
    return req.nextUrl.searchParams.get(name);
  }
  let queryParam;
  if ("query" in req) {
    queryParam = req.query[name];
  }
  if (!queryParam) {
    const qs = (req.url || "").split("?")[1];
    queryParam = new URLSearchParams(qs).get(name);
  }
  return queryParam;
}
function getHeader(req, name) {
  var _a, _b;
  if (isNextRequest(req)) {
    return req.headers.get(name);
  }
  return req.headers[name] || req.headers[name.toLowerCase()] || ((_b = (_a = req.socket) == null ? void 0 : _a._httpMessage) == null ? void 0 : _b.getHeader(name));
}
function getCookie(req, name) {
  if (isNextRequest(req)) {
    const reqCookieOrString = req.cookies.get(name);
    if (!reqCookieOrString) {
      return void 0;
    }
    return typeof reqCookieOrString === "string" ? reqCookieOrString : reqCookieOrString.value;
  }
  return req.cookies[name];
}
function isNextRequest(val) {
  try {
    const { headers, nextUrl, cookies } = val || {};
    return typeof (headers == null ? void 0 : headers.get) === "function" && typeof (nextUrl == null ? void 0 : nextUrl.searchParams.get) === "function" && typeof (cookies == null ? void 0 : cookies.get) === "function";
  } catch (e) {
    return false;
  }
}
const OVERRIDE_HEADERS = "x-middleware-override-headers";
const MIDDLEWARE_HEADER_PREFIX = "x-middleware-request";
const setRequestHeadersOnNextResponse = (res, req, newHeaders) => {
  if (!res.headers.get(OVERRIDE_HEADERS)) {
    res.headers.set(OVERRIDE_HEADERS, [...req.headers.keys()]);
    req.headers.forEach((val, key) => {
      res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
    });
  }
  Object.entries(newHeaders).forEach(([key, val]) => {
    res.headers.set(OVERRIDE_HEADERS, `${res.headers.get(OVERRIDE_HEADERS)},${key}`);
    res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
  });
};
const nextJsVersionCanOverrideRequestHeaders = () => {
  try {
    const headerKey = "clerkTest";
    const headerKeyInRes = `${MIDDLEWARE_HEADER_PREFIX}-${headerKey}`;
    const res = import_server.NextResponse.next({ request: { headers: new Headers({ [headerKey]: "true" }) } });
    return res.headers.has(headerKeyInRes);
  } catch (e) {
    return false;
  }
};
const injectSSRStateIntoObject = (obj, authObject) => {
  const __clerk_ssr_state = process.env.NODE_ENV !== "production" ? JSON.parse(JSON.stringify({ ...authObject })) : { ...authObject };
  return { ...obj, __clerk_ssr_state };
};
function isDevelopmentFromApiKey(apiKey) {
  return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
function decorateRequest(req, res, requestState) {
  const { reason, message, status, token } = requestState;
  if (!res) {
    res = import_server.NextResponse.next();
  }
  if (res.headers.get(import_constants.constants.Headers.NextRedirect)) {
    return res;
  }
  let rewriteURL;
  if (res.headers.get(import_constants.constants.Headers.NextResume) === "1") {
    res.headers.delete(import_constants.constants.Headers.NextResume);
    rewriteURL = new URL(req.url);
  }
  const rewriteURLHeader = res.headers.get(import_constants.constants.Headers.NextRewrite);
  if (rewriteURLHeader) {
    const reqURL = new URL(req.url);
    rewriteURL = new URL(rewriteURLHeader);
    if (rewriteURL.origin !== reqURL.origin) {
      return res;
    }
  }
  if (rewriteURL) {
    if (nextJsVersionCanOverrideRequestHeaders()) {
      setRequestHeadersOnNextResponse(res, req, {
        [import_backend.constants.Headers.AuthStatus]: status,
        [import_backend.constants.Headers.AuthToken]: token || "",
        [import_backend.constants.Headers.AuthMessage]: message || "",
        [import_backend.constants.Headers.AuthReason]: reason || ""
      });
    } else {
      res.headers.set(import_backend.constants.Headers.AuthStatus, status);
      res.headers.set(import_backend.constants.Headers.AuthToken, token || "");
      res.headers.set(import_backend.constants.Headers.AuthMessage, message || "");
      res.headers.set(import_backend.constants.Headers.AuthReason, reason || "");
      rewriteURL.searchParams.set(import_backend.constants.SearchParams.AuthStatus, status);
      rewriteURL.searchParams.set(import_backend.constants.SearchParams.AuthToken, token || "");
      rewriteURL.searchParams.set(import_backend.constants.Headers.AuthMessage, message || "");
      rewriteURL.searchParams.set(import_backend.constants.Headers.AuthReason, reason || "");
    }
    res.headers.set(import_constants.constants.Headers.NextRewrite, rewriteURL.href);
  }
  return res;
}
const apiEndpointUnauthorizedNextResponse = () => {
  return import_server.NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
};
const isCrossOrigin = (from, to) => {
  const fromUrl = new URL(from);
  const toUrl = new URL(to);
  return fromUrl.origin !== toUrl.origin;
};
const handleMultiDomainAndProxy = (req, opts) => {
  const requestURL = (0, import_backend.buildRequestUrl)(req);
  const relativeOrAbsoluteProxyUrl = (0, import_handleValueOrFn.handleValueOrFn)(opts == null ? void 0 : opts.proxyUrl, requestURL, import_clerkClient.PROXY_URL);
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && !(0, import_proxy.isHttpOrHttps)(relativeOrAbsoluteProxyUrl)) {
    proxyUrl = new URL(relativeOrAbsoluteProxyUrl, requestURL).toString();
  } else {
    proxyUrl = relativeOrAbsoluteProxyUrl;
  }
  const isSatellite = (0, import_handleValueOrFn.handleValueOrFn)(opts.isSatellite, new URL(req.url), import_clerkClient.IS_SATELLITE);
  const domain = (0, import_handleValueOrFn.handleValueOrFn)(opts.domain, new URL(req.url), import_clerkClient.DOMAIN);
  const signInUrl = (opts == null ? void 0 : opts.signInUrl) || import_clerkClient.SIGN_IN_URL;
  if (isSatellite && !proxyUrl && !domain) {
    throw new Error(import_errors.missingDomainAndProxy);
  }
  if (isSatellite && !(0, import_proxy.isHttpOrHttps)(signInUrl) && isDevelopmentFromApiKey(import_clerkClient.SECRET_KEY || import_clerkClient.API_KEY)) {
    throw new Error(import_errors.missingSignInUrlInDev);
  }
  return {
    proxyUrl,
    isSatellite,
    domain,
    signInUrl
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiEndpointUnauthorizedNextResponse,
  decorateRequest,
  getAuthKeyFromRequest,
  getAuthStatusFromRequest,
  getCookie,
  getCustomAttributeFromRequest,
  getHeader,
  handleMultiDomainAndProxy,
  injectSSRStateIntoObject,
  isCrossOrigin,
  isDevelopmentFromApiKey,
  nextJsVersionCanOverrideRequestHeaders,
  setCustomAttributeOnRequest,
  setRequestHeadersOnNextResponse
});
//# sourceMappingURL=utils.js.map