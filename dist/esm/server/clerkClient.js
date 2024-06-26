import { Clerk } from "@clerk/backend";
import { API_KEY, API_URL, API_VERSION, DOMAIN, IS_SATELLITE, PROXY_URL, SECRET_KEY } from "./constants";
const clerkClient = Clerk({
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  apiUrl: API_URL,
  apiVersion: API_VERSION,
  userAgent: `${"@clerk/nextjs"}@${"4.30.0"}`,
  proxyUrl: PROXY_URL,
  domain: DOMAIN,
  isSatellite: IS_SATELLITE
});
const createClerkClient = Clerk;
export * from "@clerk/backend";
export * from "./constants";
export {
  Clerk,
  clerkClient,
  createClerkClient
};
//# sourceMappingURL=clerkClient.js.map