import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const allow_prod = process.argv.includes("--allow-prod");
  console.log("Doing main", allow_prod);

  // Can run on prod with this command:
  //  yarn workspace @mono/db ts-node prisma/seed.ts --allow-prod
  if (process.env.NODE_ENV === "production" && !allow_prod) {
    console.log("Not seeding because NODE_ENV is production!");
    return;
  }
  if ((process.env.DATABASE_URL ?? "").includes("_prod") && !allow_prod) {
    throw new Error("Cannot seed production database");
  }

  const users = await prisma.user.findMany();
  console.log("seeding", users.length, "users");
};

main();
