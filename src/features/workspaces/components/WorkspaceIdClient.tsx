"use client";

import { useGetMembers } from "@/features/members/membersApiHooks/useGetMembers";
import { useGetProjects } from "@/features/projects/hooks/projectsApi/useGetProjects";
import { useGetTasks } from "@/features/tasks/hooks/taskApi/useGetTasks";
import { useWorkSpacesId } from "../hooks/workspaceParam/useWorkSpaceParam";
import { useGetWorkspaceAnalytics } from "../hooks/workspacesApi/useGetWorkspaceAnalytics";

import { Analytics } from "@/components/Analytics";
import ErrorPage from "@/components/ErrorPage";
import LoaderPage from "@/components/LoaderPage";
import { MemberList } from "@/features/members/components/MemberList";
import { ProjectList } from "@/features/projects/components/ProjectList";
import { TaskList } from "@/features/tasks/components/TaskList";

export function WorkspaceIdClient() {
  const workspaceId = useWorkSpacesId();

  const { data: workspaceAnalytics, isLoading: isLoadingWorkspaceAnalytics } =
    useGetWorkspaceAnalytics({ workspaceId });

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });

  const { data, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  // @ts-expect-error ignore error
  const projects = data?.data;

  const { data: members, isLoading: isLoadingmembers } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isLoadingWorkspaceAnalytics ||
    isLoadingProjects ||
    isLoadingTasks ||
    isLoadingmembers;

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!workspaceAnalytics || !projects || !tasks || !members) {
    return <ErrorPage message="Failed to load workspace data" />;
  }
  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={workspaceAnalytics?.data} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList tasks={tasks.data.documents} total={tasks.data.total} />
        <ProjectList projects={projects.documents} total={projects.total} />
        <MemberList
          members={members?.data.documents}
          total={members?.data.total}
        />
      </div>
    </div>
  );
}
