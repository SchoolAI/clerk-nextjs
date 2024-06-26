"use strict";
var import_next_url = require("next/dist/server/web/next-url");
var import_server = require("next/server");
var import_utils = require("../utils");
var import_authenticateRequest = require("./authenticateRequest");
var import_authMiddleware = require("./authMiddleware");
var import_clerkClient = require("./clerkClient");
const mockRedirectToSignIn = jest.fn().mockImplementation(() => {
  const res = import_server.NextResponse.redirect(
    "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected"
  );
  return (0, import_utils.setHeader)(res, "x-clerk-redirect-to", "true");
});
jest.mock("./redirect", () => {
  return {
    redirectToSignIn: mockRedirectToSignIn
  };
});
const consoleWarn = console.warn;
global.console.warn = jest.fn();
beforeAll(() => {
  global.console.warn = jest.fn();
});
afterAll(() => {
  global.console.warn = consoleWarn;
});
jest.mock("./authenticateRequest", () => {
  const { handleInterstitialState, handleUnknownState } = jest.requireActual("./authenticateRequest");
  return {
    authenticateRequest: jest.fn().mockResolvedValue({
      toAuth: () => ({})
    }),
    handleInterstitialState,
    handleUnknownState
  };
});
jest.mock("./clerkClient", () => {
  const { debugRequestState } = jest.requireActual("./clerkClient");
  return {
    PUBLISHABLE_KEY: "pk_test_Y2xlcmsuaW5jbHVkZWQua2F0eWRpZC05Mi5sY2wuZGV2JA",
    SECRET_KEY: "sk_test_xxxxxxxxxxxxxxxxxx",
    clerkClient: {
      localInterstitial: jest.fn().mockResolvedValue("<html>interstitial</html>")
    },
    debugRequestState
  };
});
const mockRequest = ({
  url,
  appendDevBrowserCookie = false,
  method = "GET",
  headers = new Headers()
}) => {
  return {
    url: new URL(url, "https://www.clerk.com").toString(),
    nextUrl: new import_next_url.NextURL(url, "https://www.clerk.com"),
    cookies: {
      get: () => appendDevBrowserCookie ? { name: "__clerk_db_jwt", value: "test_jwt" } : {}
    },
    method,
    headers
  };
};
describe("isPublicRoute", () => {
  describe("should work with path patterns", function() {
    it("matches path and all sub paths using *", () => {
      const isPublicRoute = (0, import_authMiddleware.createRouteMatcher)(["/hello(.*)"]);
      expect(isPublicRoute(mockRequest({ url: "/hello" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/hello" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/hello/test/a" }))).toBe(true);
    });
    it("matches filenames with specific extensions", () => {
      const isPublicRoute = (0, import_authMiddleware.createRouteMatcher)(["/(.*).ts", "/(.*).js"]);
      expect(isPublicRoute(mockRequest({ url: "/hello.js" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/test/hello.js" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/test/hello.ts" }))).toBe(true);
    });
    it("works with single values (non array)", () => {
      const isPublicRoute = (0, import_authMiddleware.createRouteMatcher)("/test/hello.ts");
      expect(isPublicRoute(mockRequest({ url: "/hello.js" }))).not.toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/test/hello.js" }))).not.toBe(true);
    });
  });
  describe("should work with regex patterns", function() {
    it("matches path and all sub paths using *", () => {
      const isPublicRoute = (0, import_authMiddleware.createRouteMatcher)([/^\/hello.*$/]);
      expect(isPublicRoute(mockRequest({ url: "/hello" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/hello/" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/hello/test/a" }))).toBe(true);
    });
    it("matches filenames with specific extensions", () => {
      const isPublicRoute = (0, import_authMiddleware.createRouteMatcher)([/^.*\.(ts|js)$/]);
      expect(isPublicRoute(mockRequest({ url: "/hello.js" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/test/hello.js" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/test/hello.ts" }))).toBe(true);
    });
    it("works with single values (non array)", () => {
      const isPublicRoute = (0, import_authMiddleware.createRouteMatcher)(/hello/g);
      expect(isPublicRoute(mockRequest({ url: "/hello.js" }))).toBe(true);
      expect(isPublicRoute(mockRequest({ url: "/test/hello.js" }))).toBe(true);
    });
  });
});
const validRoutes = [
  "/api",
  "/api/",
  "/api/hello",
  "/trpc",
  "/trpc/hello",
  "/trpc/hello.example",
  "/protected",
  "/protected/",
  "/protected/hello",
  "/protected/hello.example/hello",
  "/my-protected-page",
  "/my/$special/$pages"
];
const invalidRoutes = [
  "/_next",
  "/favicon.ico",
  "/_next/test.json",
  "/files/api.pdf",
  "/test/api/test.pdf",
  "/imgs/img.png",
  "/imgs/img-dash.jpg"
];
describe("default config matcher", () => {
  it("compiles to regex using path-to-regex", () => {
    [import_authMiddleware.DEFAULT_CONFIG_MATCHER].flat().forEach((path) => {
      expect(import_utils.paths.toRegexp(path)).toBeInstanceOf(RegExp);
    });
  });
  describe("does not match any static files or next internals", function() {
    it.each(invalidRoutes)(`does not match %s`, (path) => {
      const matcher = (0, import_authMiddleware.createRouteMatcher)(import_authMiddleware.DEFAULT_CONFIG_MATCHER);
      expect(matcher(mockRequest({ url: path }))).toBe(false);
    });
  });
  describe("matches /api or known framework routes", function() {
    it.each(validRoutes)(`matches %s`, (path) => {
      const matcher = (0, import_authMiddleware.createRouteMatcher)(import_authMiddleware.DEFAULT_CONFIG_MATCHER);
      expect(matcher(mockRequest({ url: path }))).toBe(true);
    });
  });
});
describe("default ignored routes matcher", () => {
  it("compiles to regex using path-to-regex", () => {
    [import_authMiddleware.DEFAULT_IGNORED_ROUTES].flat().forEach((path) => {
      expect(import_utils.paths.toRegexp(path)).toBeInstanceOf(RegExp);
    });
  });
  describe("matches all static files or next internals", function() {
    it.each(invalidRoutes)(`matches %s`, (path) => {
      const matcher = (0, import_authMiddleware.createRouteMatcher)(import_authMiddleware.DEFAULT_IGNORED_ROUTES);
      expect(matcher(mockRequest({ url: path }))).toBe(true);
    });
  });
  describe("does not match /api or known framework routes", function() {
    it.each(validRoutes)(`does not match %s`, (path) => {
      const matcher = (0, import_authMiddleware.createRouteMatcher)(import_authMiddleware.DEFAULT_IGNORED_ROUTES);
      expect(matcher(mockRequest({ url: path }))).toBe(false);
    });
  });
});
describe("authMiddleware(params)", () => {
  beforeEach(() => {
    import_authenticateRequest.authenticateRequest.mockClear();
    import_clerkClient.clerkClient.localInterstitial.mockClear();
  });
  describe("without params", function() {
    it("redirects to sign-in for protected route", async () => {
      const resp = await (0, import_authMiddleware.authMiddleware)()(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(307);
      expect(resp == null ? void 0 : resp.headers.get("location")).toEqual(
        "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected"
      );
    });
    it("renders public route", async () => {
      const signInResp = await (0, import_authMiddleware.authMiddleware)({ publicRoutes: "/sign-in" })(
        mockRequest({ url: "/sign-in" }),
        {}
      );
      expect(signInResp == null ? void 0 : signInResp.status).toEqual(200);
      expect(signInResp == null ? void 0 : signInResp.headers.get("x-middleware-rewrite")).toEqual("https://www.clerk.com/sign-in");
      const signUpResp = await (0, import_authMiddleware.authMiddleware)({ publicRoutes: ["/sign-up"] })(
        mockRequest({ url: "/sign-up" }),
        {}
      );
      expect(signUpResp == null ? void 0 : signUpResp.status).toEqual(200);
      expect(signUpResp == null ? void 0 : signUpResp.headers.get("x-middleware-rewrite")).toEqual("https://www.clerk.com/sign-up");
    });
  });
  describe("with ignoredRoutes", function() {
    it("skips auth middleware execution", async () => {
      const beforeAuthSpy = jest.fn();
      const afterAuthSpy = jest.fn();
      const resp = await (0, import_authMiddleware.authMiddleware)({
        ignoredRoutes: "/ignored",
        beforeAuth: beforeAuthSpy,
        afterAuth: afterAuthSpy
      })(mockRequest({ url: "/ignored" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(200);
      expect(import_authenticateRequest.authenticateRequest).not.toBeCalled();
      expect(beforeAuthSpy).not.toBeCalled();
      expect(afterAuthSpy).not.toBeCalled();
    });
    it("executes auth middleware execution when is not matched", async () => {
      const beforeAuthSpy = jest.fn();
      const afterAuthSpy = jest.fn();
      const resp = await (0, import_authMiddleware.authMiddleware)({
        ignoredRoutes: "/ignored",
        beforeAuth: beforeAuthSpy,
        afterAuth: afterAuthSpy
      })(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(200);
      expect(import_authenticateRequest.authenticateRequest).toBeCalled();
      expect(beforeAuthSpy).toBeCalled();
      expect(afterAuthSpy).toBeCalled();
    });
  });
  describe("with publicRoutes", function() {
    it("renders public route", async () => {
      const resp = await (0, import_authMiddleware.authMiddleware)({
        publicRoutes: "/public"
      })(mockRequest({ url: "/public" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(200);
      expect(resp == null ? void 0 : resp.headers.get("x-middleware-rewrite")).toEqual("https://www.clerk.com/public");
    });
    describe("when sign-in/sign-up routes are defined in env", () => {
      const currentSignInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
      const currentSignUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
      beforeEach(() => {
        process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL = "/custom-sign-in";
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL = "/custom-sign-up";
      });
      afterEach(() => {
        process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL = currentSignInUrl;
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL = currentSignUpUrl;
      });
      it("renders sign-in/sign-up routes", async () => {
        const signInResp = await (0, import_authMiddleware.authMiddleware)({
          publicRoutes: "/public"
        })(mockRequest({ url: "/custom-sign-in" }), {});
        expect(signInResp == null ? void 0 : signInResp.status).toEqual(200);
        expect(signInResp == null ? void 0 : signInResp.headers.get("x-middleware-rewrite")).toEqual("https://www.clerk.com/custom-sign-in");
        const signUpResp = await (0, import_authMiddleware.authMiddleware)({
          publicRoutes: "/public"
        })(mockRequest({ url: "/custom-sign-up" }), {});
        expect(signUpResp == null ? void 0 : signUpResp.status).toEqual(200);
        expect(signUpResp == null ? void 0 : signUpResp.headers.get("x-middleware-rewrite")).toEqual("https://www.clerk.com/custom-sign-up");
      });
    });
    it("redirects to sign-in for protected route", async () => {
      const resp = await (0, import_authMiddleware.authMiddleware)({
        publicRoutes: "/public"
      })(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(307);
      expect(resp == null ? void 0 : resp.headers.get("location")).toEqual(
        "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected"
      );
    });
  });
  describe("with beforeAuth", function() {
    it("skips auth middleware execution when beforeAuth returns false", async () => {
      const afterAuthSpy = jest.fn();
      const resp = await (0, import_authMiddleware.authMiddleware)({
        beforeAuth: () => false,
        afterAuth: afterAuthSpy
      })(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(200);
      expect(resp == null ? void 0 : resp.headers.get("x-clerk-auth-reason")).toEqual("skip");
      expect(import_authenticateRequest.authenticateRequest).not.toBeCalled();
      expect(afterAuthSpy).not.toBeCalled();
    });
    it("executes auth middleware execution when beforeAuth returns undefined", async () => {
      const afterAuthSpy = jest.fn();
      const resp = await (0, import_authMiddleware.authMiddleware)({
        beforeAuth: () => void 0,
        afterAuth: afterAuthSpy
      })(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(200);
      expect(import_authenticateRequest.authenticateRequest).toBeCalled();
      expect(afterAuthSpy).toBeCalled();
    });
    it("skips auth middleware execution when beforeAuth returns NextResponse.redirect", async () => {
      const afterAuthSpy = jest.fn();
      const resp = await (0, import_authMiddleware.authMiddleware)({
        beforeAuth: () => import_server.NextResponse.redirect("https://www.clerk.com/custom-redirect"),
        afterAuth: afterAuthSpy
      })(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(307);
      expect(resp == null ? void 0 : resp.headers.get("location")).toEqual("https://www.clerk.com/custom-redirect");
      expect(resp == null ? void 0 : resp.headers.get("x-clerk-auth-reason")).toEqual("redirect");
      expect(import_authenticateRequest.authenticateRequest).not.toBeCalled();
      expect(afterAuthSpy).not.toBeCalled();
    });
    it("executes auth middleware when beforeAuth returns NextResponse", async () => {
      const resp = await (0, import_authMiddleware.authMiddleware)({
        beforeAuth: () => import_server.NextResponse.next({
          headers: {
            "x-before-auth-header": "before"
          }
        }),
        afterAuth: () => import_server.NextResponse.next({
          headers: {
            "x-after-auth-header": "after"
          }
        })
      })(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(200);
      expect(resp == null ? void 0 : resp.headers.get("x-before-auth-header")).toEqual("before");
      expect(resp == null ? void 0 : resp.headers.get("x-after-auth-header")).toEqual("after");
      expect(import_authenticateRequest.authenticateRequest).toBeCalled();
    });
  });
  describe("with afterAuth", function() {
    it("redirects to sign-in for protected route and sets redirect as auth reason header", async () => {
      const resp = await (0, import_authMiddleware.authMiddleware)({
        beforeAuth: () => import_server.NextResponse.next()
      })(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(307);
      expect(resp == null ? void 0 : resp.headers.get("location")).toEqual(
        "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected"
      );
      expect(resp == null ? void 0 : resp.headers.get("x-clerk-auth-reason")).toEqual("redirect");
      expect(import_authenticateRequest.authenticateRequest).toBeCalled();
    });
    it("uses authenticateRequest result as auth", async () => {
      const req = mockRequest({ url: "/protected" });
      const event = {};
      import_authenticateRequest.authenticateRequest.mockResolvedValueOnce({ toAuth: () => ({ userId: null }) });
      const afterAuthSpy = jest.fn();
      await (0, import_authMiddleware.authMiddleware)({ afterAuth: afterAuthSpy })(req, event);
      expect(import_authenticateRequest.authenticateRequest).toBeCalled();
      expect(afterAuthSpy).toBeCalledWith(
        {
          userId: null,
          isPublicRoute: false,
          isApiRoute: false
        },
        req,
        event
      );
    });
  });
  describe("authenticateRequest", function() {
    it("returns 401 with local interstitial for interstitial requestState", async () => {
      import_authenticateRequest.authenticateRequest.mockResolvedValueOnce({ isInterstitial: true });
      const resp = await (0, import_authMiddleware.authMiddleware)()(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(401);
      expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("text/html");
      expect(import_clerkClient.clerkClient.localInterstitial).toBeCalled();
    });
    it("returns 401 for unknown requestState", async () => {
      import_authenticateRequest.authenticateRequest.mockResolvedValueOnce({ isUnknown: true });
      const resp = await (0, import_authMiddleware.authMiddleware)()(mockRequest({ url: "/protected" }), {});
      expect(resp == null ? void 0 : resp.status).toEqual(401);
      expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
      expect(import_clerkClient.clerkClient.localInterstitial).not.toBeCalled();
    });
    it("returns 401 for interstitial requestState in an API route", async () => {
      import_authenticateRequest.authenticateRequest.mockResolvedValueOnce({ isInterstitial: true });
      const resp = await (0, import_authMiddleware.authMiddleware)({ apiRoutes: ["/api/items"] })(
        mockRequest({ url: "/api/items" }),
        {}
      );
      expect(resp == null ? void 0 : resp.status).toEqual(401);
      expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
      expect(import_clerkClient.clerkClient.localInterstitial).not.toBeCalled();
    });
  });
});
describe("Dev Browser JWT when redirecting to cross origin", function() {
  it("does NOT append the Dev Browser JWT when cookie is missing", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next()
    })(mockRequest({ url: "/protected", appendDevBrowserCookie: false }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(307);
    expect(resp == null ? void 0 : resp.headers.get("location")).toEqual(
      "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected"
    );
    expect(resp == null ? void 0 : resp.headers.get("x-clerk-auth-reason")).toEqual("redirect");
    expect(import_authenticateRequest.authenticateRequest).toBeCalled();
  });
  it("appends the Dev Browser JWT to the search when cookie __clerk_db_jwt exists and location is an Account Portal URL", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next()
    })(mockRequest({ url: "/protected", appendDevBrowserCookie: true }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(307);
    expect(resp == null ? void 0 : resp.headers.get("location")).toEqual(
      "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected&__dev_session=test_jwt&__clerk_db_jwt=test_jwt"
    );
    expect(resp == null ? void 0 : resp.headers.get("x-clerk-auth-reason")).toEqual("redirect");
    expect(import_authenticateRequest.authenticateRequest).toBeCalled();
  });
  it("does NOT append the Dev Browser JWT if x-clerk-redirect-to header is not set", async () => {
    mockRedirectToSignIn.mockReturnValueOnce(
      import_server.NextResponse.redirect(
        "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected"
      )
    );
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next()
    })(mockRequest({ url: "/protected", appendDevBrowserCookie: true }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(307);
    expect(resp == null ? void 0 : resp.headers.get("location")).toEqual(
      "https://accounts.included.katydid-92.lcl.dev/sign-in?redirect_url=https%3A%2F%2Fwww.clerk.com%2Fprotected"
    );
    expect(resp == null ? void 0 : resp.headers.get("x-clerk-auth-reason")).toEqual("redirect");
    expect(import_authenticateRequest.authenticateRequest).toBeCalled();
  });
});
describe("isApiRoute", function() {
  it("treats route as API route if apiRoutes match the route path", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"],
      apiRoutes: ["/api/(.*)"]
    })(mockRequest({ url: "/api/items" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(401);
    expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
  });
  it("treats route as Page route if apiRoutes do not match the route path", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"],
      apiRoutes: ["/api/(.*)"]
    })(mockRequest({ url: "/page" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(307);
  });
  it("treats route as API route if apiRoutes prop is missing and route path matches the default matcher (/api/(.*))", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"]
    })(mockRequest({ url: "/api/items" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(401);
    expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
  });
  it("treats route as API route if apiRoutes prop is missing and route path matches the default matcher (/trpc/(.*))", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"]
    })(mockRequest({ url: "/trpc/items" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(401);
    expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
  });
  it("treats route as API route if apiRoutes prop is missing and Request method is not-GET,OPTIONS,HEAD", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"]
    })(mockRequest({ url: "/products/items", method: "POST" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(401);
    expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
  });
  it("treats route as API route if apiRoutes prop is missing and Request headers Content-Type is application/json", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"]
    })(
      mockRequest({ url: "/products/items", headers: new Headers({ "content-type": "application/json" }) }),
      {}
    );
    expect(resp == null ? void 0 : resp.status).toEqual(401);
    expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
  });
});
describe("401 Response on Api Routes", function() {
  it("returns 401 when route is not public and route matches API routes", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"],
      apiRoutes: ["/products/(.*)"]
    })(mockRequest({ url: "/products/items" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(401);
    expect(resp == null ? void 0 : resp.headers.get("content-type")).toEqual("application/json");
  });
  it("returns 307 when route is not public and route does not match API routes", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"],
      apiRoutes: ["/products/(.*)"]
    })(mockRequest({ url: "/api/items" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(307);
    expect(resp == null ? void 0 : resp.headers.get("content-type")).not.toEqual("application/json");
  });
  it("returns 200 when API route is public", async () => {
    const resp = await (0, import_authMiddleware.authMiddleware)({
      beforeAuth: () => import_server.NextResponse.next(),
      publicRoutes: ["/public"],
      apiRoutes: ["/public"]
    })(mockRequest({ url: "/public" }), {});
    expect(resp == null ? void 0 : resp.status).toEqual(200);
  });
});
//# sourceMappingURL=authMiddleware.test.js.map