"use server";

import { createSessionClient } from "@/lib/appwriteConfig";

export async function getCurrent() {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch {
    return null;
  }
}
