import { getCurrent } from "@/features/auth/actions";
import { WorkspaceIdProps } from "@/features/workspaces/types";
import { redirect } from "next/navigation";

export default async function WorkSpaceIdPage({ params }: WorkspaceIdProps) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <div>WorkspaceId: {params.workspaceId}</div>;
}
