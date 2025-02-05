import "server-only";

import { cookies } from "next/headers";
import { Account, Client, Databases, Users } from "node-appwrite";
import { ENDPOINT, NEXT_KEY, PROJECT_ID } from "@/lib/appwriteConstants";
import { AUTH_COOKIE } from "@/features/auth/constant";

export async function createSessionClient() {
  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

  const session = await cookies().get(AUTH_COOKIE);

  if (!session || !session.value) {
    throw new Error("Unauthorized");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(NEXT_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    },
  };
}
