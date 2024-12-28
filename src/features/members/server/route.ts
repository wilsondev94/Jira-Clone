import { DATABASE_ID, MEMBERS_COLLECTION_ID } from "@/lib/appwriteConstants";
import { createAdminClient } from "@/lib/appwriteConfig";
import { MemberIdSchema, MemberSchema } from "@/lib/schemas";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Query } from "node-appwrite";
import { getMember } from "../membersUtils";
import { MemberRole } from "../../../types/memberTypes/type";

const app = new Hono()
  .get("/", sessionMiddleware, zValidator("query", MemberSchema), async (c) => {
    const { users } = await createAdminClient();

    const databases = c.get("databases");
    const user = c.get("user");
    const { workspaceId } = c.req.valid("query");
    if (!workspaceId) {
      return c.json({ error: "workspaceId is required" }, 400);
    }

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized!" }, 401);
    }

    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_COLLECTION_ID,
      [Query.equal("workspaceId", workspaceId)]
    );

    const populatedMembers = await Promise.all(
      members.documents.map(async (member) => {
        const user = await users.get(member.userId);

        return {
          ...member,
          name: user.name,
          email: user.email,
        };
      })
    );

    return c.json({
      data: { ...members, documents: populatedMembers },
    });
  })
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();

    const user = c.get("user");
    const databases = c.get("databases");

    const deleteMember = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_COLLECTION_ID,
      memberId
    );

    const allMembersInWorkspace = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_COLLECTION_ID,
      [Query.equal("workspaceId", deleteMember.workspaceId)]
    );

    if (allMembersInWorkspace.total === 1)
      return c.json(
        {
          error: "Cannot delete the only member",
        },
        400
      );

    const member = await getMember({
      databases,
      workspaceId: deleteMember.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorize!" }, 401);
    }

    if (member.$id !== deleteMember.$id && member.role !== MemberRole.ADMIN) {
      return c.json(
        {
          error: "Unauthorized!",
        },
        401
      );
    }

    await databases.deleteDocument(
      DATABASE_ID,
      MEMBERS_COLLECTION_ID,
      memberId
    );

    return c.json({ data: { $id: deleteMember.$id } });
  })
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator("json", MemberIdSchema),
    async (c) => {
      const { memberId } = c.req.param();
      const { role } = c.req.valid("json");

      const user = c.get("user");
      const databases = c.get("databases");

      const updateMember = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        memberId
      );

      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        [Query.equal("workspaceId", updateMember.workspaceId)]
      );

      if (allMembersInWorkspace.total === 1)
        return c.json(
          {
            error: "Cannot downgrade the only member",
          },
          400
        );

      const member = await getMember({
        databases,
        workspaceId: updateMember.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorize!" }, 401);
      }

      if (member.$id !== updateMember.$id && member.role !== MemberRole.ADMIN) {
        return c.json(
          {
            error: "Unauthorized!",
          },
          401
        );
      }

      await databases.updateDocument(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        memberId,
        { role }
      );

      return c.json({ data: { $id: updateMember.$id } });
    }
  );

export default app;
