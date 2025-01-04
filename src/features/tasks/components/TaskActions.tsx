import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskActionsProps } from "@/types/taskTypes/types";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../hooks/taskApi/useDeleteTask ";
import { useConfirmationModal } from "@/components/ConfirmationModal";

export default function TaskActions({
  id,
  projectId,
  children,
}: TaskActionsProps) {
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

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" w-48">
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className=" font-medium p-[10px] cursor-pointer"
          >
            <ExternalLinkIcon className=" size-4 mr-2 stroke-2" />
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className=" font-medium p-[10px] cursor-pointer"
          >
            <ExternalLinkIcon className=" size-4 mr-2 stroke-2" />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
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
