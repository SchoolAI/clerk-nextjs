import { __internal__setErrorThrowerOptions, ClerkProvider as ReactClerkProvider } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import React from "react";
import { ClerkNextOptionsProvider } from "../client-boundary/NextOptionsContext";
import { useSafeLayoutEffect } from "../client-boundary/useSafeLayoutEffect";
import { invalidateNextRouterCache } from "../utils/invalidateNextRouterCache";
import { mergeNextClerkPropsWithEnv } from "../utils/mergeNextClerkPropsWithEnv";
__internal__setErrorThrowerOptions({ packageName: "@clerk/nextjs" });
function ClerkProvider({ children, ...props }) {
  var _a;
  const { __unstable_invokeMiddlewareOnAuthStateChange = true } = props;
  const { push } = useRouter();
  ReactClerkProvider.displayName = "ReactClerkProvider";
  useSafeLayoutEffect(() => {
    window.__unstable__onBeforeSetActive = invalidateNextRouterCache;
  }, []);
  useSafeLayoutEffect(() => {
    window.__unstable__onAfterSetActive = () => {
      if (__unstable_invokeMiddlewareOnAuthStateChange) {
        void push(window.location.href);
      }
    };
  }, []);
  const navigate = (to) => push(to);
  const mergedProps = mergeNextClerkPropsWithEnv({ ...props, navigate });
  const initialState = ((_a = props.authServerSideProps) == null ? void 0 : _a.__clerk_ssr_state) || props.__clerk_ssr_state;
  return /* @__PURE__ */ React.createElement(ClerkNextOptionsProvider, { options: mergedProps }, /* @__PURE__ */ React.createElement(
    ReactClerkProvider,
    {
      ...mergedProps,
      initialState
    },
    children
  ));
}
export {
  ClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map