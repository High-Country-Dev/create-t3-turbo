import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SessionProvider } from "@acme/auth/src/expo/session";

import { getBaseUrl, TRPCProvider } from "~/utils/api";
import { AuthScreen } from "~/screens/auth";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const baseUrl = getBaseUrl();
  console.log("using:", { baseUrl });
  return (
    <SessionProvider baseUrl={"http://localhost:3000"}>
      <TRPCProvider>
        <SafeAreaProvider>
          {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f472b6",
              },
            }}
          />
          <AuthScreen />
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </SessionProvider>
  );
};

export default RootLayout;

// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { getBaseUrl, TRPCProvider } from "./utils/api";
// import { SessionProvider } from "@acme/auth/src/expo/session";

// // import { HomeScreen } from "./screens/home";
// import { AuthScreen } from "./screens/auth";

// export const App = () => {
//   const baseUrl = getBaseUrl();
//   console.log("Using baseUrl", baseUrl);
//   return (
//     <SessionProvider baseUrl={"http://localhost:3000"}>
//       <TRPCProvider>
//         <SafeAreaProvider>
//           {/* <HomeScreen /> */}
//           <AuthScreen />
//           <StatusBar />
//         </SafeAreaProvider>
//       </TRPCProvider>
//     </SessionProvider>
//   );
// };
