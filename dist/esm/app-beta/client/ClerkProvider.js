"use client";
import { deprecated } from "@clerk/shared/deprecated";
deprecated(
  "@clerk/nextjs/app-beta",
  "Use imports from `@clerk/nextjs` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
);
import { ClerkProvider as ReactClerkProvider } from "@clerk/clerk-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
const useAwaitableNavigate = () => {
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  useEffect(() => {
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
  useEffect(() => {
    if (typeof window.__clerk_nav_await === "undefined") {
      window.__clerk_nav_await = [];
    }
    window.__clerk_nav_await.forEach((resolve) => resolve());
    window.__clerk_nav_await = [];
  });
  return useCallback((to) => {
    return window.__clerk_nav(to);
  }, []);
};
function ClerkProvider(props) {
  const navigate = useAwaitableNavigate();
  return /* @__PURE__ */ React.createElement(
    ReactClerkProvider,
    {
      navigate,
      ...props
    }
  );
}
export {
  ClerkProvider,
  useAwaitableNavigate
};
//# sourceMappingURL=ClerkProvider.js.map