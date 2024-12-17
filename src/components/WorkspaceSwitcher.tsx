"use client";

import { RiAddCircleFill } from "react-icons/ri";

import { useGetWorkspaces } from "@/features/workspaces/customWorkspacesApiHook/useGetWorkspaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function WorkspaceSwitcher() {
  const { data } = useGetWorkspaces();

  const workspaces = data?.data.documents;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500 cursor-pointer hover:opacity-75 transition">
          Workspaces
        </p>
        <RiAddCircleFill />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              {workspace.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
