import { Admin, Resource } from "react-admin";

import { dataProvider } from "./providers/dataProvider";
import { queryClient } from "./providers/queryClient";
import * as resources from "./resources";

const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      queryClient={queryClient}
      // TODO: Implement react-admin auth with next-auth
      // authProvider={authProvider}
      // requireAuth={true}
    >
      <Resource {...resources.userResource} />
    </Admin>
  );
};

export default App;
