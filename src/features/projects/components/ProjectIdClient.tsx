"use client";

import Link from "next/link";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import TaskView from "@/features/tasks/components/TaskViews";
import { useProjectId } from "../hooks/ProjectIdParam/useProjectId";
import { useGetProject } from "../hooks/projectsApi/useGetProject";
import { ProjectAvatar } from "./ProjectAvatar";
import LoaderPage from "@/components/LoaderPage";
import ErrorPage from "@/components/ErrorPage";

export function ProjectIdClient() {
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
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.imageUrl}
            className="size-8"
          />
          <p className="text-xl font-semibold                                                             ">
            {initialValues.name}
          </p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit project
            </Link>
          </Button>
        </div>
      </div>
      <TaskView hideProjectFilter />
    </div>
  );
}
