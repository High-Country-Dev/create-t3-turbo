import { useEffect, useState } from "react";
import Clerk from "@clerk/clerk-js";
import { Admin, Resource } from "react-admin";

import { env } from "~/env.mjs";
import { ClerkAuthProvider } from "./providers/ClerkAuthProvider";
import { dataProvider } from "./providers/dataProvider";
import { queryClient } from "./providers/queryClient";
import * as resources from "./resources";

const App = () => {
  const [loadedClerk, setLoadedClerk] = useState<Clerk>();

  useEffect(() => {
    const clerk = new Clerk(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
    void clerk.load().then(() => {
      setLoadedClerk(clerk);
    });
  }, []);

  return !loadedClerk ? null : (
    <Admin
      dataProvider={dataProvider}
      queryClient={queryClient}
      authProvider={ClerkAuthProvider(loadedClerk, {
        redirectOnCheckAuth: true,
        afterSignInUrl: `${window.location.origin}/auth-callback`,
      })}
      requireAuth={true}
    >
      {/* <Resource {...resources.userResource} /> */}
      <Resource {...resources.postResource} />
    </Admin>
  );
};

export default App;
