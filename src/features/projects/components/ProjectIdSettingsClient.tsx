"use client";

import ErrorPage from "@/components/ErrorPage";
import LoaderPage from "@/components/LoaderPage";
import { useProjectId } from "../hooks/ProjectIdParam/useProjectId";
import { useGetProject } from "../hooks/projectsApi/useGetProject";
import { EditProjectForm } from "./EditProjectForm";

export function ProjectIdSettingsClient() {
  const projectId = useProjectId();

  const { data, isLoading } = useGetProject({
    projectId: projectId,
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
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
}
