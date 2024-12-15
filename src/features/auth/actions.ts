"use server";

import { Account, Client } from "node-appwrite";
import { ENDPOINT, PROJECT_ID } from "@/lib/appwriteConfig";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "./constant";

export async function getCurrent() {
  try {
    const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);

    const session = await cookies().get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);

    const account = new Account(client);

    return await account.get();
  } catch {
    return null;
  }
}
