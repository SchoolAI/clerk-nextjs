import { deprecated } from "@clerk/shared/deprecated";
deprecated(
  "@clerk/nextjs/app-beta",
  "Use imports from `@clerk/nextjs` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
);
import React from "react";
import { initialState } from "./auth";
import { ClerkProvider as ClerkProviderClient } from "./client/ClerkProvider";
function ClerkProvider(props) {
  var _a;
  const state = ((_a = initialState()) == null ? void 0 : _a.__clerk_ssr_state) || { sessionId: null, orgId: null, userId: null };
  return (
    // @ts-expect-error
    /* @__PURE__ */ React.createElement(
      ClerkProviderClient,
      {
        frontendApi: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || "",
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
        proxyUrl: process.env.NEXT_PUBLIC_CLERK_PROXY_URL,
        initialState: state,
        ...props
      }
    )
  );
}
export {
  ClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map