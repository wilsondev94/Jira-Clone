import { useRouter } from "next/navigation";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { TaskBreadCrumbsProps } from "@/types/taskTypes/types";
import { useDeleteTask } from "../hooks/taskApi/useDeleteTask ";
import { useConfirmationModal } from "@/components/ConfirmationModal";

export function TaskBreadCrumbs({ project, task }: TaskBreadCrumbsProps) {
  const router = useRouter();

  const workspaceId = useWorkSpacesId();

  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirmationModal(
    "Delete task",
    "This action cannot be undone",
    "destructive"
  );

  async function handleDeleteTask() {
    const ok = await confirm();
    if (!ok) return;

    deleteTask(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`);
        },
      }
    );
  }

  return (
    <div className="flex items-center gap-x-2 ">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />

      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>

      <ChevronRightIcon className=" size-4 lg:size-5 text-muted-foreground" />
      <p className=" text-sm lg:text-lg font-semibold">{task.name}</p>

      <Button
        className=" ml-auto"
        variant="destructive"
        size="sm"
        disabled={isDeletingTask}
        onClick={handleDeleteTask}
      >
        <TrashIcon className=" size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
}
