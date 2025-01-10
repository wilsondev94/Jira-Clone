import { DottedSeparator } from "@/components/DottedSeparator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MemberAvatar } from "@/features/members/components/MembersAvatar";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskOverViewAndDescriptionProps } from "@/types/taskTypes/types";
import { PencilIcon } from "lucide-react";
import { useEditTaskModal } from "../hooks/useTaskModal/useEditModal";
import OverViewProperty from "./OverViewProperty";
import TaskDate from "./TaskDate";

export function TaskOverView({ task }: TaskOverViewAndDescriptionProps) {
  const { open } = useEditTaskModal();

  return (
    <div className=" flex flex-col gap-y-4 col-span-1">
      <div className=" bg-muted rounded-lg p-4">
        <div className=" flex items-center justify-between">
          <p className="text-lg font-semibold"> Overview</p>
          <Button size="sm" variant="secondary" onClick={() => open(task.$id)}>
            <PencilIcon className=" size-4 mr-2 " />
            Edit
          </Button>
        </div>
        <DottedSeparator clasName=" my-4 " />
        <div className="flex gap-x-4">
          <OverViewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className=" text-sm font-medium">{task.assignee.name}</p>
          </OverViewProperty>

          <OverViewProperty label="Due date">
            <TaskDate value={task.dueDate} className=" text-sm font-medium" />
          </OverViewProperty>

          <OverViewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverViewProperty>
        </div>
      </div>
    </div>
  );
}
