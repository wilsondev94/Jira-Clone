import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskActionsProps } from "@/types/taskTypes/types";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

export default function TaskActions({
  id,
  projectId,
  children,
}: TaskActionsProps) {
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" w-48">
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className=" font-medium p-[10px]"
          >
            <ExternalLinkIcon className=" size-4 mr-2 stroke-2" />
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className=" font-medium p-[10px]"
          >
            <ExternalLinkIcon className=" size-4 mr-2 stroke-2" />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className=" font-medium p-[10px]"
          >
            <PencilIcon className=" size-4 mr-2 stroke-2" />
            Edit task
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className=" text-amber-700 focus:text-amber-700 font-medium p-[10px]"
          >
            <TrashIcon className=" size-4 mr-2 stroke-2" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
