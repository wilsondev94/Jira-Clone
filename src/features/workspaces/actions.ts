"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";

import {
  DATABASE_ID,
  ENDPOINT,
  MEMBERS_COLLECTION_ID,
  PROJECT_ID,
  WORKSPACES_COLLECTION_ID,
} from "@/appwrite-config";
import { AUTH_COOKIE } from "@/features/auth/constant";

export async function getWorkspaces() {
  try {
    const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

    const session = await cookies().get(AUTH_COOKIE);

    if (!session) return { documents: [], total: 0 };

    client.setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get();

    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_COLLECTION_ID,
      [Query.equal("userId", user.$id)]
    );

    if (members.documents.length === 0) return { documents: [], total: 0 };

    const workspaceId = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceId)]
    );

    return workspaces;
  } catch {
    return { documents: [], total: 0 };
  }
}
