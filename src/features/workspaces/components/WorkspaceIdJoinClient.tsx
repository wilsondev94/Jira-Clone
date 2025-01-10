"use client";

import ErrorPage from "@/components/ErrorPage";
import LoaderPage from "@/components/LoaderPage";
import { useWorkSpacesId } from "../hooks/workspaceParam/useWorkSpaceParam";
import { useGetWorkspaceInfo } from "../hooks/workspacesApi/useGetWorkspaceInfo";
import JoinWorkspaceForm from "./JoinWorkspaceForm";

export function WorkspaceIdJoinClient() {
  const workspaceId = useWorkSpacesId();

  const { data, isLoading } = useGetWorkspaceInfo({
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
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
