import { getCurrent } from "@/features/auth/actions";
import { WorkspaceIdJoinClient } from "@/features/workspaces/components/WorkspaceIdJoinClient";
import { redirect } from "next/navigation";

async function JoinWorkspace() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdJoinClient />;
}

export default JoinWorkspace;
