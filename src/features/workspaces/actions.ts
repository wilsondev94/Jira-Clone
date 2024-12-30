"use server";

import { Query } from "node-appwrite";

import {
  DATABASE_ID,
  MEMBERS_COLLECTION_ID,
  WORKSPACES_COLLECTION_ID,
} from "@/lib/appwriteConstants";
import { getMember } from "@/features/members/membersUtils";
import { createSessionClient } from "@/lib/appwriteConfig";
import { GetWorkspaceProps, Workspace } from "../../types/workspaceTypes/types";

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

export async function getWorkspace({ workspaceId }: GetWorkspaceProps) {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const members = await getMember({
    databases,
    userId: user.$id,
    workspaceId,
  });
  if (!members) {
    throw new Error("Unauthorized user.");
  }

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_COLLECTION_ID,
    workspaceId
  );
  return workspace;
}

export async function getWorkspaceInfo({ workspaceId }: GetWorkspaceProps) {
  const { databases } = await createSessionClient();

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_COLLECTION_ID,
    workspaceId
  );

  return {
    name: workspace.name,
  };
}
