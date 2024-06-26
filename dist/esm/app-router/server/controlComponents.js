import React from "react";
import { auth } from "./auth";
function SignedIn(props) {
  const { children } = props;
  const { userId } = auth();
  return userId ? /* @__PURE__ */ React.createElement(React.Fragment, null, children) : null;
}
function SignedOut(props) {
  const { children } = props;
  const { userId } = auth();
  return userId ? null : /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
function Protect(props) {
  const { children, fallback, ...restAuthorizedParams } = props;
  const { has, userId } = auth();
  const unauthorized = /* @__PURE__ */ React.createElement(React.Fragment, null, fallback != null ? fallback : null);
  const authorized = /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  if (!userId) {
    return unauthorized;
  }
  if (typeof restAuthorizedParams.condition === "function") {
    if (restAuthorizedParams.condition(has)) {
      return authorized;
    }
    return unauthorized;
  }
  if (restAuthorizedParams.role || restAuthorizedParams.permission) {
    if (has(restAuthorizedParams)) {
      return authorized;
    }
    return unauthorized;
  }
  return authorized;
}
export {
  Protect,
  SignedIn,
  SignedOut
};
//# sourceMappingURL=controlComponents.js.map