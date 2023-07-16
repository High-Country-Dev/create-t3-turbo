import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "@acme/db";

import { env } from "../env.mjs";

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    // AppleProvider({
    //   id: "expo-apple",
    //   name: "Apple Expo",
    //   checks: ["state", "pkce"],
    //   clientId: process.env.APPLE_CLIENT_ID as string,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    //   token: {
    //     async request(context) {
    //       const tokens = await context.client.callback(
    //         process.env.NEXTAUTH_EXPO_URL,
    //         context.params,
    //         context.checks,
    //       );
    //       return { tokens };
    //     },
    //   },
    // }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // GithubProvider({
    //   // id: "expo-github",
    //   name: "GitHub Expo",
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    //   checks: ["state", "pkce"], // This is because Expo Authentication uses PKCE. It can be disabled though.
    //   token: {
    //     async request(context) {
    //       console.log("context", context);
    //       // When requesting tokens, if the callbackUrl does not match, it will not work, the Authorization
    //       // Server won't give out tokens. Apparently this works with GitHub, though it should be an Expo
    //       // Auth proxy callbackUrl, like https://auth.expo.io/@xuanan2001/expo-app.
    //       const tokens = await context.client.oauthCallback(
    //         // "https://auth.expo.io/@juliusmarminge/expo",
    //         undefined,
    //         context.params,
    //         context.checks,
    //       );
    //       console.log("tokens", tokens);
    //       return { tokens };
    //     },
    //   },
    // }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    }),
    {
      ...GithubProvider({
        name: "Github Expo Proxy",
        clientId: env.GITHUB_CLIENT_ID as string,
        clientSecret: env.GITHUB_CLIENT_SECRET as string,
        checks: ["state"],
        token: {
          async request(context) {
            const tokens = await context.client.oauthCallback(
              undefined,
              context.params,
              context.checks,
            );
            return { tokens };
          },
        },
      }),
      id: "github-expo",
    },
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID as string,
      clientSecret: env.DISCORD_CLIENT_SECRET as string,
    }),
    {
      ...DiscordProvider({
        name: "Discord Expo",
        checks: ["state"],
        clientId: env.DISCORD_CLIENT_ID as string,
        clientSecret: env.DISCORD_CLIENT_SECRET as string,
        token: {
          async request(context) {
            const tokens = await context.client.oauthCallback(
              env.NEXTAUTH_EXPO_URL,
              context.params,
              context.checks,
            );
            return { tokens };
          },
        },
      }),
      id: "discord-expo",
    },
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
};
