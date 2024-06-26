/**
 * These need to be explicitly listed. Do not use an * here.
 * If you do, app router will break.
 */
export { RedirectToUserProfile, RedirectToSignUp, RedirectToSignIn, RedirectToOrganizationProfile, RedirectToCreateOrganization, MultisessionAppSupport, ClerkLoading, ClerkLoaded, AuthenticateWithRedirectCallback, } from './client-boundary/controlComponents';
/**
 * These need to be explicitly listed. Do not use an * here.
 * If you do, app router will break.
 */
export { UserButton, UserProfile, SignUpButton, SignIn, SignUp, OrganizationSwitcher, OrganizationProfile, CreateOrganization, SignInButton, SignOutButton, SignInWithMetamaskButton, OrganizationList, __experimental_GoogleOneTap, } from './client-boundary/uiComponents';
/**
 * These need to be explicitly listed. Do not use an * here.
 * If you do, app router will break.
 */
export { useUser, useAuth, useSession, useClerk, useSignIn, useSignUp, useSessionList, useOrganization, useOrganizationList, useOrganizations, useEmailLink, useMagicLink, EmailLinkErrorCode, MagicLinkErrorCode, isEmailLinkError, isMagicLinkError, isClerkAPIResponseError, isMetamaskError, isKnownError, withUser, withSession, withClerk, WithUser, WithSession, WithClerk, } from './client-boundary/hooks';
export type { WithUserProp, WithSessionProp, WithClerkProp } from './client-boundary/hooks';
export declare const ClerkProvider: typeof import("./components.server").ClerkProvider;
export declare const SignedIn: typeof import("./components.server").SignedIn;
export declare const SignedOut: typeof import("./components.server").SignedOut;
export declare const Protect: typeof import("./components.server").Protect;
export declare const auth: () => (Omit<import("@clerk/backend").SignedInAuthObject & {
    protect: {
        (params?: import("@clerk/types").CheckAuthorizationParamsWithCustomPermissions | ((has: import("@clerk/types").CheckAuthorizationWithCustomPermissions) => boolean) | undefined, options?: {
            redirectUrl: string;
        } | undefined): import("./server/types").AuthObjectWithDeprecatedResources<import("@clerk/backend").SignedInAuthObject>;
        (params?: {
            redirectUrl: string;
        } | undefined): import("./server/types").AuthObjectWithDeprecatedResources<import("@clerk/backend").SignedInAuthObject>;
    };
}, "session" | "user" | "organization"> & {
    user: import("@clerk/backend").User | undefined;
    organization: import("@clerk/backend").Organization | undefined;
    session: import("@clerk/backend").Session | undefined;
}) | (Omit<import("@clerk/backend").SignedOutAuthObject & {
    protect: never;
}, "session" | "user" | "organization"> & {
    user: null;
    organization: null;
    session: null;
});
export declare const currentUser: typeof import("./server-helpers.server").currentUser;
export declare const clerkClient: {
    __unstable_options: {
        apiKey?: string | undefined;
        secretKey?: string | undefined;
        apiUrl?: string | undefined;
        apiVersion?: string | undefined;
        userAgent?: string | undefined;
        httpOptions?: RequestInit | undefined;
        proxyUrl?: string | undefined;
        publishableKey?: string | undefined;
        isSatellite?: boolean | undefined;
        domain?: string | undefined;
        audience?: string | string[] | undefined;
        jwtKey?: string | undefined;
    };
    authenticateRequest: ({ apiKey: runtimeApiKey, secretKey: runtimeSecretKey, audience: runtimeAudience, frontendApi: runtimeFrontendApi, proxyUrl: runtimeProxyUrl, publishableKey: runtimePublishableKey, jwtKey: runtimeJwtKey, isSatellite: runtimeIsSatellite, domain: runtimeDomain, searchParams, ...rest }: Omit<import("@clerk/backend").AuthenticateRequestOptions, "apiUrl" | "apiVersion">) => Promise<import("@clerk/backend").RequestState>;
    localInterstitial: ({ frontendApi: runtimeFrontendApi, publishableKey: runtimePublishableKey, proxyUrl: runtimeProxyUrl, isSatellite: runtimeIsSatellite, domain: runtimeDomain, ...rest }: Omit<import("@clerk/backend/dist/types/tokens/interstitial").LoadInterstitialOptions, "apiUrl">) => string;
    remotePublicInterstitial: ({ frontendApi: runtimeFrontendApi, publishableKey: runtimePublishableKey, proxyUrl: runtimeProxyUrl, isSatellite: runtimeIsSatellite, domain: runtimeDomain, userAgent: runtimeUserAgent, ...rest }: import("@clerk/backend/dist/types/tokens/interstitial").LoadInterstitialOptions) => Promise<string>;
    remotePrivateInterstitial: () => Promise<string>;
    remotePublicInterstitialUrl: typeof import("@clerk/backend/dist/types/tokens/interstitial").buildPublicInterstitialUrl;
    debugRequestState: (params: import("@clerk/backend").RequestState) => {
        frontendApi: string;
        isSignedIn: boolean;
        proxyUrl: string | undefined;
        isInterstitial: boolean;
        reason: import("@clerk/backend/dist/types/tokens/authStatus").AuthReason | null;
        message: string | null;
        publishableKey: string;
        isSatellite: boolean;
        domain: string;
    };
    allowlistIdentifiers: import("@clerk/backend/dist/types/api/endpoints").AllowlistIdentifierAPI;
    clients: import("@clerk/backend/dist/types/api/endpoints").ClientAPI;
    emailAddresses: import("@clerk/backend/dist/types/api/endpoints").EmailAddressAPI;
    emails: import("@clerk/backend/dist/types/api/endpoints").EmailAPI;
    interstitial: import("@clerk/backend/dist/types/api/endpoints").InterstitialAPI;
    invitations: import("@clerk/backend/dist/types/api/endpoints").InvitationAPI;
    organizations: import("@clerk/backend/dist/types/api/endpoints").OrganizationAPI;
    phoneNumbers: import("@clerk/backend/dist/types/api/endpoints").PhoneNumberAPI;
    redirectUrls: import("@clerk/backend/dist/types/api/endpoints").RedirectUrlAPI;
    sessions: import("@clerk/backend/dist/types/api/endpoints").SessionAPI;
    signInTokens: import("@clerk/backend/dist/types/api/endpoints").SignInTokenAPI;
    smsMessages: import("@clerk/backend/dist/types/api/endpoints").SMSMessageAPI;
    users: import("@clerk/backend/dist/types/api/endpoints").UserAPI;
    domains: import("@clerk/backend/dist/types/api/endpoints").DomainAPI;
};
export declare const authMiddleware: import("./server/authMiddleware").AuthMiddleware;
export declare const redirectToSignIn: ({ returnBackUrl }?: {
    returnBackUrl?: string | undefined;
} | undefined) => any;
export declare const redirectToSignUp: ({ returnBackUrl }?: {
    returnBackUrl?: string | undefined;
} | undefined) => any;
export declare const withClerkMiddleware: import("./server").WithClerkMiddleware;
//# sourceMappingURL=index.d.ts.map