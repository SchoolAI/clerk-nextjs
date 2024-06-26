import { API_KEY, clerkClient, FRONTEND_API, PROXY_URL, PUBLISHABLE_KEY, SECRET_KEY } from "../../server";
function authenticateRequest(ctx, opts = {}) {
  var _a;
  const { headers, cookies } = ctx.req;
  const cookieToken = cookies["__session"];
  const headerToken = (_a = headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
  return clerkClient.authenticateRequest({
    ...opts,
    apiKey: API_KEY,
    secretKey: SECRET_KEY,
    frontendApi: FRONTEND_API,
    publishableKey: PUBLISHABLE_KEY,
    cookieToken,
    headerToken,
    clientUat: cookies["__client_uat"],
    origin: headers.origin,
    host: headers.host,
    forwardedPort: headers["x-forwarded-port"],
    forwardedHost: headers["x-forwarded-host"],
    referrer: headers.referer,
    userAgent: headers["user-agent"],
    proxyUrl: PROXY_URL
  });
}
export {
  authenticateRequest
};
//# sourceMappingURL=authenticateRequest.js.map