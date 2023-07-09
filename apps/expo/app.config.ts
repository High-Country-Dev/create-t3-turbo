import type { ExpoConfig } from "@expo/config";

const versionCode = 5;

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
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
