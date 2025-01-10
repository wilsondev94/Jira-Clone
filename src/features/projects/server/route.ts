import {
  BUCKET_ID,
  DATABASE_ID,
  PROJECTS_COLLECTION_ID,
  TASKS_COLLECTION_ID,
} from "@/lib/appwriteConstants";
import { getMember } from "@/features/members/membersUtils";
import {
  createProjectSchema,
  projectsSchema,
  UpdateSchema,
} from "@/lib/schemas";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { Project } from "@/types/projectTypes/types";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", projectsSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { workspaceId } = c.req.valid("query");

      if (!workspaceId) {
        return c.json({ error: "Missing workspaceId." });
      }

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized request!" });
      }

      const projects = await databases.listDocuments(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        [Query.equal("workspaceId", workspaceId), Query.orderDesc("$createdAt")]
      );

      return c.json({ data: projects });
    }
  )
  .get("/:projectId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const { projectId } = c.req.param();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      projectId
    );

    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });
    if (!member) {
      return c.json({ error: "Unauthorized member" }, 401);
    }

    return c.json({ data: project });
  })
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", createProjectSchema),

    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image, workspaceId } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });
      if (!member) {
        return c.json({ error: "Unauthorized member" }, 401);
      }

      let upLoadImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(BUCKET_ID, ID.unique(), image);

        const bufferArray = await storage.getFilePreview(BUCKET_ID, file.$id);

        upLoadImageUrl = `data:image/png;base64,${Buffer.from(
          bufferArray
        ).toString("base64")}`;
      }

      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        ID.unique(),
        {
          name,
          imageUrl: upLoadImageUrl,
          workspaceId,
        }
      );

      return c.json({ data: project });
    }
  )

  .patch(
    "/:projectId",
    sessionMiddleware,
    zValidator("form", UpdateSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { projectId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId
      );

      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      let upLoadImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(BUCKET_ID, ID.unique(), image);

        const bufferArray = await storage.getFilePreview(BUCKET_ID, file.$id);

        upLoadImageUrl = `data:image/png;base64,${Buffer.from(
          bufferArray
        ).toString("base64")}`;
      } else {
        upLoadImageUrl = image;
      }

      const project = await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId,
        { name, imageUrl: upLoadImageUrl }
      );

      return c.json({ data: project });
    }
  )
  .delete(
    "/:projectId",
    sessionMiddleware,
    zValidator("form", UpdateSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const { projectId } = c.req.param();

      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId
      );

      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized!" }, 401);
      }

      await databases.deleteDocument(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId
      );

      return c.json({ data: { $id: existingProject.workspaceId } });
    }
  );

export default app;
