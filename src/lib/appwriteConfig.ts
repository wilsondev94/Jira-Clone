import "server-only";

import { Account, Client } from "node-appwrite";
import { ENDPOINT, NEXT_KEY, PROJECT_ID } from "@/appwrite-config";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(NEXT_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}
