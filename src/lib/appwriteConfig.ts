import "server-only";

import { Account, Client } from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_KEY,
} = process.env;

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(NEXT_PUBLIC_PROJECT_ID!)
    .setKey(NEXT_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}
