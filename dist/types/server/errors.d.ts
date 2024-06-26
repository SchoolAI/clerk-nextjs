export declare const missingDomainAndProxy = "\nMissing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.\n\n1) With middleware\n   e.g. export default withClerkMiddleware(req => {...}, {domain:'YOUR_DOMAIN',isSatellite:true});\n2) With environment variables e.g.\n   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'\n   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'\n   ";
export declare const missingSignInUrlInDev = "\nInvalid signInUrl. A satellite application requires a signInUrl for development instances.\nCheck if signInUrl is missing from your configuration or if it is not an absolute URL\n\n1) With middleware\n   e.g. export default withClerkMiddleware(req => {...}, {signInUrl:'SOME_URL',isSatellite:true});\n2) With environment variables e.g.\n   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'\n   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'";
export declare const receivedRequestForIgnoredRoute: (url: string, matcher: string) => string;
export declare const getAuthAuthHeaderMissing: () => string;
export declare const authAuthHeaderMissing: (helperName?: string) => string;
export declare const clockSkewDetected: (verifyMessage: string) => string;
export declare const infiniteRedirectLoopDetected: () => string;
export declare const informAboutProtectedRouteInfo: (path: string, hasPublicRoutes: boolean, hasIgnoredRoutes: boolean, isApiRoute: boolean, defaultIgnoredRoutes: string[]) => string;
//# sourceMappingURL=errors.d.ts.map