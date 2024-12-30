"use server";

import { createSessionClient } from "@/lib/appwriteConfig";
import { DATABASE_ID, PROJECTS_COLLECTION_ID } from "@/lib/appwriteConstants";
import { GetProjectProps, Project } from "@/types/projectTypes/types";
import { getMember } from "../members/membersUtils";

export async function getProject({ projectId }: GetProjectProps) {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_COLLECTION_ID,
    projectId
  );

  const members = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });
  if (!members) {
    throw new Error("Unauthorized");
  }

  return project;
}
