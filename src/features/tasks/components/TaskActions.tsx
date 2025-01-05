import { useRouter } from "next/navigation";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TaskActionsProps } from "@/types/taskTypes/types";
import { useDeleteTask } from "../hooks/taskApi/useDeleteTask ";
import { useConfirmationModal } from "@/components/ConfirmationModal";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useEditTaskModal } from "../hooks/useTaskModal/useEditModal";

export default function TaskActions({
  id,
  projectId,
  children,
}: TaskActionsProps) {
  const workspaceId = useWorkSpacesId();
  const router = useRouter();

  const { open } = useEditTaskModal();

  const [ConfirmDialog, confirm] = useConfirmationModal(
    "Delete task",
    "This action cannot be undone",
    "destructive"
  );

  const { mutate: deleteTask, isPending: deletingTask } = useDeleteTask();

  async function onDelete() {
    const ok = await confirm();
    if (!ok) return;

    deleteTask({ param: { taskId: id } });
  }

  function onOpenTask() {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  }

  function onOpenProject() {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  }

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            className=" font-medium p-[10px] cursor-pointer"
          >
            <ExternalLinkIcon className=" size-4 mr-2 stroke-2" />
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className=" font-medium p-[10px] cursor-pointer"
          >
            <ExternalLinkIcon className=" size-4 mr-2 stroke-2" />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className=" font-medium p-[10px] cursor-pointer"
          >
            <PencilIcon className=" size-4 mr-2 stroke-2" />
            Edit task
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDelete}
            disabled={deletingTask}
            className=" text-amber-700 focus:text-amber-700 font-medium p-[10px] cursor-pointer"
          >
            <TrashIcon className=" size-4 mr-2 stroke-2 " />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
