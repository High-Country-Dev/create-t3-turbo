import { dataProvider as prismaDataProvider } from "ra-data-simple-prisma";
import { type DataProvider } from "react-admin";

import { Header } from "@acme/common";

export const dataProvider: DataProvider = prismaDataProvider("/api/admin", {
  headers: {
    [Header.Client]: "web",
  },
});
