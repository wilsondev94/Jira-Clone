"use server";

import { Query } from "node-appwrite";

import {
  DATABASE_ID,
  MEMBERS_COLLECTION_ID,
  WORKSPACES_COLLECTION_ID,
} from "@/appwrite-config";
import { getMember } from "@/features/members/membersUtils";
import { createSessionClient } from "@/lib/appwriteConfig";
import { GetWorksapceProps, Workspace } from "./type";

export async function getWorkspaces() {
  try {
    // const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

    // const session = await cookies().get(AUTH_COOKIE);

    // if (!session) return { documents: [], total: 0 };

    // client.setSession(session.value);

    // const databases = new Databases(client);
    // const account = new Account(client);

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
  } catch {
    return { documents: [], total: 0 };
  }
}

export async function getWorkspace({ workspaceId }: GetWorksapceProps) {
  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();

    const members = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });
    if (!members) return null;

    const workspaces = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_COLLECTION_ID,
      workspaceId
    );

    return workspaces;
  } catch {
    return null;
  }
}
