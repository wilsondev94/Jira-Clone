import "server-only";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Client,
  Account,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";

import { AUTH_COOKIE } from "@/features/auth/constant";
import { ENDPOINT, PROJECT_ID } from "@/lib/appwriteConstants";

type SessionMidddlewareProps = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<SessionMidddlewareProps>(
  async (c, next) => {
    const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);
