import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import WorkspaceIdSettingsClient from "@/features/workspaces/components/WorkspaceIdSettingsClient";

export default async function SettingsPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingsClient />;
}
