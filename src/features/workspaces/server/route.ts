import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  WORKSPACES_COLLECTION_ID,
} from "@/appwrite-config";
import { workspaceSchema } from "@/lib/schemas";
import { sessionMiddleware } from "@/lib/sessionMiddleware";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_COLLECTION_ID
    );

    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", workspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image } = c.req.valid("form");

      let upLoadImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(BUCKET_ID, ID.unique(), image);

        const bufferArray = await storage.getFilePreview(BUCKET_ID, file.$id);

        upLoadImageUrl = `data:image/png;base64,${Buffer.from(
          bufferArray
        ).toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_COLLECTION_ID,
        ID.unique(),
        { name, userId: user.$id, imageUrl: upLoadImageUrl }
      );

      return c.json({ data: workspace });
    }
  );

export default app;
