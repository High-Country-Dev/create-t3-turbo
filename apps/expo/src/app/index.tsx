import React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}) {
  const router = useRouter();

  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <TouchableOpacity onPress={() => router.push(`/post/${props.post.id}`)}>
          <Text className="text-xl font-semibold text-pink-400">
            {props.post.title}
          </Text>
          <Text className="mt-2 text-white">{props.post.content}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onDelete}>
        <Text className="font-bold uppercase text-pink-400">Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreatePost() {
  const utils = api.useContext();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.all.invalidate();
    },
  });

  return (
    <View className="mt-4">
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <TouchableOpacity
        className="rounded bg-pink-400 p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className="font-semibold text-white">Publish post</Text>
      </TouchableOpacity>
    </View>
  );
}

const Index = () => {
  const utils = api.useContext();
  const router = useRouter();

  const postQuery = api.post.all.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate(),
  });

  const { userId, sessionId, signOut } = useAuth();
  const { isSignedIn, user } = useUser();

  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <SignedIn>
          <Text className="text-white">You are Signed in</Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Text className="text-white">Sign out</Text>
          </TouchableOpacity>
        </SignedIn>
        <SignedOut>
          <TouchableOpacity onPress={() => router.push("/auth/signUp")}>
            <Text className="text-white">Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth/signIn")}>
            <Text className="text-white">Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/auth/signInWithOAuth")}
          >
            <Text className="text-white">Sign in with OAuth</Text>
          </TouchableOpacity>
        </SignedOut>
        <Text className="text-white">
          Hello, {userId} your current active session is {sessionId} and
          isSignedIn: {isSignedIn} and name: {user?.fullName}
        </Text>
        <Text className="mx-auto mt-4 pb-2 text-5xl font-bold text-white">
          Create <Text className="text-pink-400">T3</Text> Turbo
        </Text>

        <Button
          onPress={() => void utils.post.all.invalidate()}
          title="Refresh posts"
          color={"#f472b6"}
        />

        <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
};

export default Index;
