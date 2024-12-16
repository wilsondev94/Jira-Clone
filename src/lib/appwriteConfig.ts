import "server-only";

import { Account, Client } from "node-appwrite";

export const {
  NEXT_KEY,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  NEXT_PUBLIC_WORKSPACES_COLLECTION_ID: WORKSPACES_ID,
} = process.env;

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(NEXT_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}
