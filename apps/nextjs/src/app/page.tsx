"use client";

import { Suspense } from "react";
import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import Lottie from "lottie-react";

import groovyWalkAnimation from "../assets/groovyWalk.json";
import { CreatePostForm, PostList } from "./posts";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <div className="flex flex-row items-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Mountain <span className="text-pink-400">Dev</span> Template
          </h1>
          <Lottie animationData={groovyWalkAnimation} className="h-16 w-16" />
        </div>
        <AuthShowcase />

        <CreatePostForm />
        <Suspense fallback={<span>Loading...</span>}>
          <PostList />
        </Suspense>
      </div>
    </main>
  );
}

const AuthShowcase = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const userIdentifier =
    user?.emailAddresses.find((e) => e.emailAddress)?.emailAddress ??
    user?.fullName ??
    "Unknown";

  if (!isSignedIn) {
    return <SignInButton />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {user && <span>Logged in as {userIdentifier}</span>}
      </p>

      <SignOutButton />
    </div>
  );
};
