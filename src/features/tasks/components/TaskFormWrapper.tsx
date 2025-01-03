import { Loader } from "lucide-react";

import { useGetMembers } from "@/features/members/membersApiHooks/useGetMembers";
import { useGetProjects } from "@/features/projects/hooks/projectsApi/useGetProjects";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { TaskFormWrapperProps } from "@/types/taskTypes/types";
import { Card, CardContent } from "@/components/ui/card";
import { CreateTaskForm } from "./CreateTaskForm";

export function TaskFormWrapper({ onCancel }: TaskFormWrapperProps) {
  const workspaceId = useWorkSpacesId();

  const { data: Projects, isLoading: loadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: loadingMembers } = useGetMembers({
    workspaceId,
  });

  // @ts-expect-error ignore error
  const projectOptions = Projects?.data.documents.map(
    // @ts-expect-error ignore error
    (project) => ({
      id: project.$id,
      name: project.name,
      imageUrl: project.imageUrl,
    })
  );



  const memberOptions = members?.data.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));
 

  const loading = loadingProjects || loadingMembers;

  if (loading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none ">
        <CardContent className="flex items-center justify-center h-full ">
          <Loader className="size-5 animate-spin text-muted-foreground " />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <CreateTaskForm
        onCancel={onCancel}
        projectOptions={projectOptions || []}
        memberOptions={memberOptions || []}
      />
    </div>
  );
}
