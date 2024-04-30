import { AuthStatus, constants, decodeJwt, signedInAuthObject, signedOutAuthObject } from "@clerk/backend";
import { deprecatedObjectProperty } from "@clerk/shared/deprecated";
import { withLogger } from "../utils/debugLogger";
import { API_KEY, API_URL, API_VERSION, SECRET_KEY } from "./clerkClient";
import { getAuthAuthHeaderMissing } from "./errors";
import { getAuthKeyFromRequest, getCookie, getHeader } from "./utils";
const createGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => withLogger(debugLoggerName, (logger) => {
  return (req, opts) => {
    if (getHeader(req, constants.Headers.EnableDebug) === "true") {
      logger.enable();
    }
    const authToken = getAuthKeyFromRequest(req, "AuthToken");
    const authStatus = getAuthKeyFromRequest(req, "AuthStatus");
    const authMessage = getAuthKeyFromRequest(req, "AuthMessage");
    const authReason = getAuthKeyFromRequest(req, "AuthReason");
    logger.debug("Debug", {
      authReason,
      authMessage,
      authStatus,
      authToken
    });
    if (!authStatus) {
      throw new Error(noAuthStatusMessage);
    }
    const options = {
      apiKey: (opts == null ? void 0 : opts.apiKey) || API_KEY,
      authStatus,
      authMessage,
      secretKey: (opts == null ? void 0 : opts.secretKey) || SECRET_KEY,
      authReason,
      authToken,
      apiUrl: API_URL,
      apiVersion: API_VERSION
    };
    logger.debug("Options debug", options);
    if (authStatus !== AuthStatus.SignedIn) {
      return signedOutAuthObject(options);
    }
    const jwt = decodeJwt(authToken);
    logger.debug("JWT debug", jwt.raw.text);
    const signedIn = signedInAuthObject(jwt.payload, {
      ...options,
      token: jwt.raw.text
    });
    if (signedIn) {
      if (signedIn.user) {
        deprecatedObjectProperty(signedIn, "user", "Use `clerkClient.users.getUser` instead.");
      }
      if (signedIn.organization) {
        deprecatedObjectProperty(
          signedIn,
          "organization",
          "Use `clerkClient.organizations.getOrganization` instead."
        );
      }
      if (signedIn.session) {
        deprecatedObjectProperty(signedIn, "session", "Use `clerkClient.sessions.getSession` instead.");
      }
    }
    return signedIn;
  };
});
const parseJwt = (req) => {
  var _a;
  const cookieToken = getCookie(req, constants.Cookies.Session);
  const headerToken = (_a = getHeader(req, "authorization")) == null ? void 0 : _a.replace("Bearer ", "");
  return decodeJwt(cookieToken || headerToken || "");
};
const getAuth = createGetAuth({
  debugLoggerName: "getAuth()",
  noAuthStatusMessage: getAuthAuthHeaderMissing()
});
export {
  createGetAuth,
  getAuth,
  parseJwt
};
//# sourceMappingURL=createGetAuth.js.map