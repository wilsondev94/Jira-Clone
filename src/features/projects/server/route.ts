import { projectsSchema } from "@/lib/schemas";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono().get(
  "/",
  sessionMiddleware,
  zValidator("query", projectsSchema),
  async (c) => {
    const user = c.get("user");
  }
);

export default app;
