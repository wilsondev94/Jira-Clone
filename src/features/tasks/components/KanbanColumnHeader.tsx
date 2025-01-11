import { Button } from "@/components/ui/button";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { KanbanColumnHeaderProps, TaskStatus } from "@/types/taskTypes/types";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";
import { useCreateTaskModal } from "../hooks/useTaskModal/useCreateTaskModal";

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className=" size-[18px] text-orange-400" />
  ),
  [TaskStatus.TODO]: <CircleIcon className=" size-[18px] text-red-400" />,

  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className=" size-[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className=" size-[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className=" size-[18px] text-emerald-400" />
  ),
};

export function KanbanColumnHeader({
  board,
  taskCount,
}: KanbanColumnHeaderProps) {
  const { open } = useCreateTaskModal();

  const icon = statusIconMap[board];

  return (
    <div className=" px-2 py-1.5 flex items-center justify-between">
      {icon}
      <div className=" flex items-center gap-x-2">
        <h2 className=" text-sm font-medium ">{snakeCaseToTitleCase(board)}</h2>
        <div className=" size-5 flex items-center justify-center  rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button onClick={open} variant="ghost" size="icon" className=" size-5">
        <PlusIcon className="size-4 text-neutral-500 " />
      </Button>
    </div>
  );
}
