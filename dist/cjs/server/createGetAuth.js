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
var createGetAuth_exports = {};
__export(createGetAuth_exports, {
  createGetAuth: () => createGetAuth,
  getAuth: () => getAuth,
  parseJwt: () => parseJwt
});
module.exports = __toCommonJS(createGetAuth_exports);
var import_backend = require("@clerk/backend");
var import_deprecated = require("@clerk/shared/deprecated");
var import_debugLogger = require("../utils/debugLogger");
var import_clerkClient = require("./clerkClient");
var import_errors = require("./errors");
var import_utils = require("./utils");
const createGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => (0, import_debugLogger.withLogger)(debugLoggerName, (logger) => {
  return (req, opts) => {
    var _a;
    if ((0, import_utils.getHeader)(req, import_backend.constants.Headers.EnableDebug) === "true") {
      logger.enable();
    }
    const authToken = (0, import_utils.getAuthKeyFromRequest)(req, "AuthToken");
    const authStatus = (0, import_utils.getAuthKeyFromRequest)(req, "AuthStatus");
    const authMessage = (0, import_utils.getAuthKeyFromRequest)(req, "AuthMessage");
    const authReason = (0, import_utils.getAuthKeyFromRequest)(req, "AuthReason");
    const cookieId = (_a = req == null ? void 0 : req.cookies) == null ? void 0 : _a.hubspotutk;
    logger.debug({
      logKey: "authKeys",
      authReason,
      authMessage,
      authStatus,
      authToken,
      cookieId
    });
    if (!authStatus) {
      throw new Error(noAuthStatusMessage);
    }
    const options = {
      apiKey: (opts == null ? void 0 : opts.apiKey) || import_clerkClient.API_KEY,
      authStatus,
      authMessage,
      secretKey: (opts == null ? void 0 : opts.secretKey) || import_clerkClient.SECRET_KEY,
      authReason,
      authToken,
      apiUrl: import_clerkClient.API_URL,
      apiVersion: import_clerkClient.API_VERSION
    };
    logger.debug({ logKey: "options", ...options });
    if (authStatus !== import_backend.AuthStatus.SignedIn) {
      return (0, import_backend.signedOutAuthObject)(options);
    }
    const jwt = (0, import_backend.decodeJwt)(authToken);
    logger.debug({ logKey: "jwt", content: jwt.raw.text });
    const signedIn = (0, import_backend.signedInAuthObject)(jwt.payload, {
      ...options,
      token: jwt.raw.text
    });
    logger.debug({
      logKey: "signedIn",
      ...signedIn.sessionClaims,
      sessionId: signedIn.sessionId,
      userId: signedIn.userId,
      issuedAt: new Date(signedIn.sessionClaims.iat * 1e3).toISOString(),
      expiresAt: new Date(signedIn.sessionClaims.exp * 1e3).toISOString(),
      notBefore: new Date(signedIn.sessionClaims.nbf * 1e3).toISOString()
    });
    if (signedIn) {
      if (signedIn.user) {
        (0, import_deprecated.deprecatedObjectProperty)(signedIn, "user", "Use `clerkClient.users.getUser` instead.");
      }
      if (signedIn.organization) {
        (0, import_deprecated.deprecatedObjectProperty)(
          signedIn,
          "organization",
          "Use `clerkClient.organizations.getOrganization` instead."
        );
      }
      if (signedIn.session) {
        (0, import_deprecated.deprecatedObjectProperty)(signedIn, "session", "Use `clerkClient.sessions.getSession` instead.");
      }
    }
    return signedIn;
  };
});
const parseJwt = (req) => {
  var _a;
  const cookieToken = (0, import_utils.getCookie)(req, import_backend.constants.Cookies.Session);
  const headerToken = (_a = (0, import_utils.getHeader)(req, "authorization")) == null ? void 0 : _a.replace("Bearer ", "");
  return (0, import_backend.decodeJwt)(cookieToken || headerToken || "");
};
const getAuth = createGetAuth({
  debugLoggerName: "getAuth()",
  noAuthStatusMessage: (0, import_errors.getAuthAuthHeaderMissing)()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createGetAuth,
  getAuth,
  parseJwt
});
//# sourceMappingURL=createGetAuth.js.map