import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { Project } from "@/types/projectTypes/types";
import { ProjectAvatar } from "./ProjectAvatar";
import { useProjectModal } from "../hooks/useCreateProjectModal/useProjectModal";

interface ProjectListProps {
  projects: Project[];
  total: number;
}

export function ProjectList({ projects, total }: ProjectListProps) {
  const workspaceId = useWorkSpacesId();

  const { open: openProjectForm } = useProjectModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects({total})</p>
          <Button variant="secondary" size="icon" onClick={openProjectForm}>
            <PlusIcon className="size-4" />
          </Button>
        </div>
        <DottedSeparator clasName="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition ">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      name={project.name}
                      image={project.imageUrl}
                      fallbackClassName="text-lg"
                      className="size-12"
                    />
                    <p className="text-lg font-medium truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}

          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No project found.
          </li>
        </ul>
      </div>
    </div>
  );
}
