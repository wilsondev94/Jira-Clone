"use server";

import { Query } from "node-appwrite";

import { createSessionClient } from "@/lib/appwriteConfig";
import {
  DATABASE_ID,
  MEMBERS_COLLECTION_ID,
  WORKSPACES_COLLECTION_ID,
} from "@/lib/appwriteConstants";

export async function getWorkspaces() {
  const { account, databases } = await createSessionClient();

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
}
