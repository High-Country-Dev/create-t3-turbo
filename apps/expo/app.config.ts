import type { ExpoConfig } from "@expo/config";

const versionCode = 5;

const env = process.env.EXPO_ENVIRONMENT;

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */
  const localhost =
    // Constants.manifest?.debuggerHost?.split(":")[0] ??
    process.env.LOCALHOST ?? "localhost";

  const appUrl = env === "production" ? "" : `http://${localhost}:3000`;
  return appUrl;
};

const APP_URL = getBaseUrl();
const API_URL = APP_URL + "/api/trpc";
const AUTH_URL = APP_URL + "/api/auth";

const defineConfig = (): ExpoConfig => ({
  name: "t3template",
  slug: "t3template",
  scheme: "t3template",
  version: "2.0.0",
  owner: "mountain_dev",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.mountaindev.t3template",
    buildNumber: versionCode.toString(),
  },
  android: {
    package: "com.mountaindev.t3template",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
    versionCode,
  },
  extra: {
    eas: {
      // TODO PUBLISH: Change this to your own EAS project ID
      projectId: "9ae04bbe-5ef6-4ea9-b148-ac984152b1b4",
    },
    APP_URL,
    API_URL,
    AUTH_URL,
    nextAuthUrl: AUTH_URL,
  },
  // nextAuthUrl: process.env.NEXTAUTH_URL,
  // githubId: process.env.EXPO_GITHUB_ID,
  plugins: [
    "expo-router",
    "./expo-plugins/with-modify-gradle.js",
    "expo-apple-authentication",
  ],
});

export default defineConfig;
