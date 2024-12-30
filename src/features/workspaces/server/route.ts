import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

import { getMember } from "@/features/members/membersUtils";
import {
  BUCKET_ID,
  DATABASE_ID,
  MEMBERS_COLLECTION_ID,
  WORKSPACES_COLLECTION_ID,
} from "@/lib/appwriteConstants";
import { InviteCodeSchema, UpdateSchema, workspaceSchema } from "@/lib/schemas";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { generateInviteCode } from "@/lib/utils";
import { MemberRole } from "@/types/memberTypes/type";
import { Workspace } from "../../../types/workspaceTypes/types";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_COLLECTION_ID,
      [Query.equal("userId", user.$id)]
    );

    if (members.documents.length === 0)
      return c.json({ data: { documents: [], total: 0 } });

    const workspaceId = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceId)]
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
        {
          name,
          userId: user.$id,
          imageUrl: upLoadImageUrl,
          inviteCode: generateInviteCode(10),
        }
      );

      await databases.createDocument(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        ID.unique(),
        { userId: user.$id, workspaceId: workspace.$id, role: MemberRole.ADMIN }
      );

      return c.json({ data: workspace });
    }
  )
  .patch(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form", UpdateSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { workspaceId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
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

      const workspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACES_COLLECTION_ID,
        workspaceId,
        { name, imageUrl: upLoadImageUrl }
      );

      return c.json({ data: workspace });
    }
  )
  .delete(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form", UpdateSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const { workspaceId } = c.req.param();

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({ error: "Unauthorized!" }, 401);
      }

      await databases.deleteDocument(
        DATABASE_ID,
        WORKSPACES_COLLECTION_ID,
        workspaceId
      );

      return c.json({ data: { $id: workspaceId } });
    }
  )
  .post(
    "/:workspaceId/reset-invite-code",
    sessionMiddleware,
    zValidator("form", UpdateSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const { workspaceId } = c.req.param();

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({ error: "Unauthorized!" }, 401);
      }

      const workspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACES_COLLECTION_ID,
        workspaceId,
        { inviteCode: generateInviteCode(10) }
      );

      return c.json({ data: workspace });
    }
  )
  .post(
    "/:workspaceId/join",
    sessionMiddleware,
    zValidator("json", InviteCodeSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const { workspaceId } = c.req.param();
      const { code } = c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (member) {
        return c.json({ error: "Already a member" }, 400);
      }

      const workspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_COLLECTION_ID,
        workspaceId
      );

      if (workspace.inviteCode !== code)
        return c.json({ error: "Invalid invite code" }, 400);

      await databases.createDocument(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        ID.unique(),
        {
          workspaceId,
          userId: user.$id,
          role: MemberRole.MEMBER,
        }
      );

      return c.json({ data: workspace });
    }
  );

export default app;
