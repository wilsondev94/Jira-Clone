import { cn } from "@/lib/utils";

import { MemberAvatar } from "@/features/members/components/MembersAvatar";
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar";
import { EventCardProps, TaskStatus } from "@/types/taskTypes/types";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useRouter } from "next/navigation";

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-orange-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emrald-500",
};

export function EventCard({
  title,
  project,
  assignee,
  status,
  id,
}: EventCardProps) {
  const workspaceId = useWorkSpacesId();
  const router = useRouter();

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();

    router.push(`worspace/${workspaceId}/tasks/${id}`);
  }

  return (
    <div onClick={onClick} className="px-2">
      <div
        className={cn(
          " p-1.5 text-sm bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition ",
          statusColorMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-2 ">
          <MemberAvatar name={assignee?.name} />

          <div
            className="
          size-1 rounded-full bg-neutral-300  "
          >
            <ProjectAvatar name={project?.name} image={project?.imageUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
