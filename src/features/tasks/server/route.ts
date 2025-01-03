import { getMember } from "@/features/members/membersUtils";
import { createAdminClient } from "@/lib/appwriteConfig";
import {
  DATABASE_ID,
  MEMBERS_COLLECTION_ID,
  PROJECTS_COLLECTION_ID,
  TASKS_COLLECTION_ID,
} from "@/lib/appwriteConstants";
import { createTaskSchema, getTaskSchema } from "@/lib/schemas";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { Project } from "@/types/projectTypes/types";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", getTaskSchema),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");

      const { status, workspaceId, projectId, dueDate, assigneeId, search } =
        c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const query = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ];

      if (projectId) {
        console.log("ProjectID:", projectId);
        query.push(Query.equal("projectId", projectId));
      }
      if (status) {
        console.log("Status:", status);
        query.push(Query.equal("status", status));
      }
      if (dueDate) {
        console.log("DueDate:", dueDate);
        query.push(Query.equal("dueDate", dueDate));
      }
      if (assigneeId) {
        console.log("AssigneeId:", assigneeId);
        query.push(Query.equal("assigneeId", assigneeId));
      }
      if (search) {
        console.log("Search:", search);
        query.push(Query.search("name", search));
      }

      const tasks = await databases.listDocuments(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        query
      );

      const projectIds = tasks.documents.map((task) => task.projectId);

      const assigneeIds = tasks.documents.map((task) => task.assigneeId);

      const projects = await databases.listDocuments<Project>(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
      );

      const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
      );

      const assignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);

          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find(
          (project) => project.$id === task.projectId
        );

        const assignee = assignees.find(
          (assignee) => assignee.$id === task.assigneeId
        );

        return {
          ...task,
          project,
          assignee,
        };
      });

      return c.json({
        data: {
          ...tasks,
          documents: populatedTasks,
        },
      });
    }
  )
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { name, status, workspaceId, projectId, dueDate, assigneeId } =
        c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1),
        ]
      );
      console.log(highestPositionTask);

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;

      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
          position: newPosition,
        }
      );

      return c.json({ data: task });
    }
  );

export default app;
