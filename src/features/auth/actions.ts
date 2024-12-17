"use server";


import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constant";
import { ENDPOINT, PROJECT_ID } from "@/appwrite-config";

export async function getCurrent() {
  try {
    const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

    const session = await cookies().get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);

    const account = new Account(client);

    return await account.get();
  } catch {
    return null;
  }
}
