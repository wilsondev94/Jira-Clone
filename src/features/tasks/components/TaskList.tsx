import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useCreateTaskModal } from "../hooks/useTaskModal/useCreateTaskModal";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/taskTypes/types";

interface TasKListProps {
  tasks: Task[];
  total: number;
}

export function TaskList({ tasks, total }: TasKListProps) {
  const workspaceId = useWorkSpacesId();

  const { open: openTaskForm } = useCreateTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-xl p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks({total})</p>
          <Button variant="muted" size="icon" onClick={openTaskForm}>
            <PlusIcon className="size-4" />
          </Button>
        </div>
        <DottedSeparator clasName="my-4" />
        <ul className="flex flex-col gap-y-4">
          {tasks.map((task) => (
            <li key={task.id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition ">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate">{task.name}</p>
                    <div className="flex items-center gap-x-2">
                      <p>{task.project?.name}</p>
                      <div className="size-1 rounded-full bg-muted-foreground flex items-center" />
                      <CalendarIcon className="size-3 mr-1" />
                      <span className="truncate">
                        {formatDistanceToNow(new Date(task.dueDate))}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}

          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No task found.
          </li>
        </ul>
        <Button variant="muted" className="mt-4 w-full" asChild>
          <Link href={`/workspaces/${workspaceId}/tasks`}>Show all</Link>
        </Button>
      </div>
    </div>
  );
}
