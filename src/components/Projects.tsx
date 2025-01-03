"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useGetProjects } from "@/features/projects/hooks/projectsApi/useGetProjects";
import { cn } from "@/lib/utils";
import { useProjectModal } from "@/features/projects/hooks/useCreateProjectModal/useProjectModal";
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar";

export function Projects() {
  const pathname = usePathname();
  const workspaceId = useWorkSpacesId();

  const { open } = useProjectModal();

  const { data } = useGetProjects({ workspaceId });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500 cursor-pointer hover:opacity-75 transition">
          Projects
        </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer"
        />
      </div>

      {/* @ts-expect-error ignore error */}
      {data?.data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar
                image={project.imageUrl}
                name={project.name}
                fallbackClassName=""
              />
              <span className="truncate">{project?.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
