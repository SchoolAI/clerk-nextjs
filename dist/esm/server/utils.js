import { buildRequestUrl, constants } from "@clerk/backend";
import { handleValueOrFn } from "@clerk/shared/handleValueOrFn";
import { isHttpOrHttps } from "@clerk/shared/proxy";
import { NextResponse } from "next/server";
import { constants as nextConstants } from "../constants";
import { API_KEY, DOMAIN, IS_SATELLITE, PROXY_URL, SECRET_KEY, SIGN_IN_URL } from "./clerkClient";
import { missingDomainAndProxy, missingSignInUrlInDev } from "./errors";
function setCustomAttributeOnRequest(req, key, value) {
  Object.assign(req, { [key]: value });
}
function getCustomAttributeFromRequest(req, key) {
  return key in req ? req[key] : void 0;
}
function getAuthKeyFromRequest(req, key) {
  const val = getCustomAttributeFromRequest(req, constants.Attributes[key]) || getHeader(req, constants.Headers[key]);
  if (val) {
    return val;
  }
  if (key === "AuthStatus" || key === "AuthToken") {
    return getQueryParam(req, key) || void 0;
  }
  return void 0;
}
function getAuthStatusFromRequest(req) {
  return getCustomAttributeFromRequest(req, constants.Attributes.AuthStatus) || getHeader(req, constants.Headers.AuthStatus) || getQueryParam(req, constants.SearchParams.AuthStatus);
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
    const res = NextResponse.next({ request: { headers: new Headers({ [headerKey]: "true" }) } });
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
    res = NextResponse.next();
  }
  if (res.headers.get(nextConstants.Headers.NextRedirect)) {
    return res;
  }
  let rewriteURL;
  if (res.headers.get(nextConstants.Headers.NextResume) === "1") {
    res.headers.delete(nextConstants.Headers.NextResume);
    rewriteURL = new URL(req.url);
  }
  const rewriteURLHeader = res.headers.get(nextConstants.Headers.NextRewrite);
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
        [constants.Headers.AuthStatus]: status,
        [constants.Headers.AuthToken]: token || "",
        [constants.Headers.AuthMessage]: message || "",
        [constants.Headers.AuthReason]: reason || ""
      });
    } else {
      res.headers.set(constants.Headers.AuthStatus, status);
      res.headers.set(constants.Headers.AuthToken, token || "");
      res.headers.set(constants.Headers.AuthMessage, message || "");
      res.headers.set(constants.Headers.AuthReason, reason || "");
      rewriteURL.searchParams.set(constants.SearchParams.AuthStatus, status);
      rewriteURL.searchParams.set(constants.SearchParams.AuthToken, token || "");
      rewriteURL.searchParams.set(constants.Headers.AuthMessage, message || "");
      rewriteURL.searchParams.set(constants.Headers.AuthReason, reason || "");
    }
    res.headers.set(nextConstants.Headers.NextRewrite, rewriteURL.href);
  }
  return res;
}
const apiEndpointUnauthorizedNextResponse = () => {
  return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
};
const isCrossOrigin = (from, to) => {
  const fromUrl = new URL(from);
  const toUrl = new URL(to);
  return fromUrl.origin !== toUrl.origin;
};
const handleMultiDomainAndProxy = (req, opts) => {
  const requestURL = buildRequestUrl(req);
  const relativeOrAbsoluteProxyUrl = handleValueOrFn(opts == null ? void 0 : opts.proxyUrl, requestURL, PROXY_URL);
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && !isHttpOrHttps(relativeOrAbsoluteProxyUrl)) {
    proxyUrl = new URL(relativeOrAbsoluteProxyUrl, requestURL).toString();
  } else {
    proxyUrl = relativeOrAbsoluteProxyUrl;
  }
  const isSatellite = handleValueOrFn(opts.isSatellite, new URL(req.url), IS_SATELLITE);
  const domain = handleValueOrFn(opts.domain, new URL(req.url), DOMAIN);
  const signInUrl = (opts == null ? void 0 : opts.signInUrl) || SIGN_IN_URL;
  if (isSatellite && !proxyUrl && !domain) {
    throw new Error(missingDomainAndProxy);
  }
  if (isSatellite && !isHttpOrHttps(signInUrl) && isDevelopmentFromApiKey(SECRET_KEY || API_KEY)) {
    throw new Error(missingSignInUrlInDev);
  }
  return {
    proxyUrl,
    isSatellite,
    domain,
    signInUrl
  };
};
export {
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
};
//# sourceMappingURL=utils.js.map