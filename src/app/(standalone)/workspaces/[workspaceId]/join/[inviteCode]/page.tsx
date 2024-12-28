import { getCurrent } from "@/features/auth/actions";
import { getWorkspaceInfo } from "@/features/workspaces/actions";
import JoinWorkspaceForm from "@/features/workspaces/components/JoinWorkspaceForm";
import { WorkspaceIdProps } from "@/types/workspaceTypes/types";
import { redirect } from "next/navigation";

async function JoinWorkspace({ params }: WorkspaceIdProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  console.log(initialValues);

  if (!initialValues) redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
}

export default JoinWorkspace;
