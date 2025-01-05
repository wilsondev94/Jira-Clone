import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/membersApiHooks/useGetMembers";
import { useGetProjects } from "@/features/projects/hooks/projectsApi/useGetProjects";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { EditTaskFormWrapperProps } from "@/types/taskTypes/types";
import { useGetTask } from "../hooks/taskApi/useGetTask";
import { EditTaskForm } from "./EditTaskForm";

export function EditTaskFormWrapper({
  onCancel,
  id,
}: EditTaskFormWrapperProps) {
  const workspaceId = useWorkSpacesId();

  const { data: taskInitialValues, isLoading: loadingTask } = useGetTask({
    taskId: id,
  });

  const { data: Projects, isLoading: loadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: loadingMembers } = useGetMembers({
    workspaceId,
  });

  // @ts-expect-error ignore error
  const projectOptions = Projects?.data.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.data.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const loading = loadingProjects || loadingMembers || loadingTask;

  if (loading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none ">
        <CardContent className="flex items-center justify-center h-full ">
          <Loader className="size-5 animate-spin text-muted-foreground " />
        </CardContent>
      </Card>
    );
  }

  if (!taskInitialValues) {
    return null;
  }

  return (
    <div>
      <EditTaskForm
        onCancel={onCancel}
        projectOptions={projectOptions || []}
        memberOptions={memberOptions || []}
        // @ts-expect-error ignore error
        taskInitialValues={taskInitialValues}
      />
    </div>
  );
}
