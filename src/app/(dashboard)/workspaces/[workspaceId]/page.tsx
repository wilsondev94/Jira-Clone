import { getCurrent } from "@/features/auth/actions";
import { WorkspaceIdClient } from "@/features/workspaces/components/WorkspaceIdClient";
import { redirect } from "next/navigation";

async function WorkSpaceIdPage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <WorkspaceIdClient />;
}

export default WorkSpaceIdPage;
