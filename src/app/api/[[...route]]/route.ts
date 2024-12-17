import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line
const routes = app.route("/auth", auth).route("/workspaces", workspaces);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
