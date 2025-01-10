"use client";

import LoaderPage from "@/components/LoaderPage";
import { useWorkSpacesId } from "../hooks/workspaceParam/useWorkSpaceParam";
import { useGetWorkspace } from "../hooks/workspacesApi/useGetWorkspace";
import { EditWorkspaceForm } from "./EditWorkspaceForm";
import ErrorPage from "@/components/ErrorPage";

export default function WorkspaceIdSettingsClient() {
  const workspaceId = useWorkSpacesId();

  const { data, isLoading } = useGetWorkspace({
    workspaceId,
  });

  const initialValues = data?.data;

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!initialValues) {
    return <ErrorPage message="Project not found!" />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
