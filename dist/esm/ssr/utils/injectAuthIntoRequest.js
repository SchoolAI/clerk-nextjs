function injectAuthIntoRequest(ctx, authData) {
  const { user, session, userId, sessionId, getToken, claims, organization } = authData;
  ctx.req.auth = {
    userId,
    sessionId,
    getToken,
    claims,
    actor: (claims == null ? void 0 : claims.act) || null
  };
  ctx.req.user = user;
  ctx.req.session = session;
  ctx.req.organization = organization;
  return ctx;
}
export {
  injectAuthIntoRequest
};
//# sourceMappingURL=injectAuthIntoRequest.js.map