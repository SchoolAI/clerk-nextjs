"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ClerkProvider_exports = {};
__export(ClerkProvider_exports, {
  ClerkProvider: () => ClerkProvider,
  useAwaitableNavigate: () => useAwaitableNavigate
});
module.exports = __toCommonJS(ClerkProvider_exports);
var import_deprecated = require("@clerk/shared/deprecated");
var import_clerk_react = require("@clerk/clerk-react");
var import_navigation = require("next/navigation");
var import_react = __toESM(require("react"));
(0, import_deprecated.deprecated)(
  "@clerk/nextjs/app-beta",
  "Use imports from `@clerk/nextjs` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
);
const useAwaitableNavigate = () => {
  const { push, refresh } = (0, import_navigation.useRouter)();
  const pathname = (0, import_navigation.usePathname)();
  (0, import_react.useEffect)(() => {
    window.__clerk_nav = (to) => {
      return new Promise((res) => {
        window.__clerk_nav_await.push(res);
        if (to === pathname) {
          refresh();
        } else {
          push(to);
        }
      });
    };
  }, [pathname]);
  (0, import_react.useEffect)(() => {
    if (typeof window.__clerk_nav_await === "undefined") {
      window.__clerk_nav_await = [];
    }
    window.__clerk_nav_await.forEach((resolve) => resolve());
    window.__clerk_nav_await = [];
  });
  return (0, import_react.useCallback)((to) => {
    return window.__clerk_nav(to);
  }, []);
};
function ClerkProvider(props) {
  const navigate = useAwaitableNavigate();
  return /* @__PURE__ */ import_react.default.createElement(
    import_clerk_react.ClerkProvider,
    {
      navigate,
      ...props
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkProvider,
  useAwaitableNavigate
});
//# sourceMappingURL=ClerkProvider.js.map