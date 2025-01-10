"use client";

import { RiAddCircleFill } from "react-icons/ri";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/WorkspaceAvatar";
import { useRouter } from "next/navigation";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useWorkspaceModal } from "@/features/workspaces/hooks/useCreateWorkspaceModal/useWorkspaceModal";
import { useGetWorkspaces } from "@/features/workspaces/hooks/workspacesApi/useGetWorkspaces";

export default function WorkspaceView() {
  const router = useRouter();
  const workspsceId = useWorkSpacesId();
  const { open } = useWorkspaceModal();

  const { data } = useGetWorkspaces();
  const workspaces = data?.data.documents;

  function onSelect(id: string) {
    router.push(`/workspaces/${id}`);
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500 cursor-pointer hover:opacity-75 transition">
          Workspaces
        </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer"
        />
      </div>
      <Select onValueChange={onSelect} value={workspsceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.length === 0 ? (
            <div className="w-full text-sm font-normal px-2">
              No available workspace.
            </div>
          ) : (
            workspaces?.map((workspace) => (
              <SelectItem key={workspace.$id} value={workspace.$id}>
                <div className="flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />

                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
