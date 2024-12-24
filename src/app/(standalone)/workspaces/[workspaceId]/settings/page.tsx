import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { EditWorkspaceForm } from "@/features/workspaces/components/EditWorkspaceForm";
import { getWorkspace } from "@/features/workspaces/actions";

interface WorkspaceIdSettingsProps {
  params: {
    workspaceId: string;
  };
}

export default async function SettingsPage({
  params,
}: WorkspaceIdSettingsProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  if (!initialValues) redirect(`/worksapces/${params.workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      {" "}
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
