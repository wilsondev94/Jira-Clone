import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMembers } from "@/features/members/membersApiHooks/useGetMembers";
import { useGetProjects } from "@/features/projects/hooks/projectsApi/useGetProjects";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { DataFiltersProps, TaskStatus } from "@/types/taskTypes/types";
import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";
import { useTaskFilter } from "../hooks/useTaskFilter/useTaskFilter";
import DatePicker from "@/components/DatePicker";

export default function DataFilters({ hideProjectFilter }: DataFiltersProps) {
  const workspaceId = useWorkSpacesId();

  const { data: projects, isLoading: loadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: loadingMembers } = useGetMembers({
    workspaceId,
  });

  const loading = loadingProjects || loadingMembers;

  //  @ts-expect-error ignore error
  const projectOptions = projects?.data.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));
  const memberOptions = members?.data.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ status, assigneeId, projectId, dueDate }, setFilters] =
    useTaskFilter();

  function onStatusChange(value: string) {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  }

  function onAssigneeChange(value: string) {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  }

  function onProjectChange(value: string) {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  }

  if (loading) return null;

  return (
    <div className=" flex flex-col lg:flex- gap-2">
      <Select
        defaultValue={status || undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className=" w-full h-8 lg:w-auto">
          <div className="flex items-center pr-2">
            <ListCheckIcon className=" size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={assigneeId || undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className=" w-full h-8 lg:w-auto">
          <div className="flex items-center pr-2">
            <UserIcon className=" size-4 mr-2" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All assignees</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={projectId || undefined}
        onValueChange={(value) => onProjectChange(value)}
      >
        <SelectTrigger className=" w-full h-8 lg:w-auto">
          <div className="flex items-center pr-2">
            <FolderIcon className=" size-4 mr-2" />
            <SelectValue placeholder="All projects" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All projects</SelectItem>
          <SelectSeparator />
          {/*  @ts-expect-error ignore error */}
          {projectOptions?.map((project) => (
            <SelectItem key={project.value} value={project.value}>
              {project.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Due date"
        className=" h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) =>
          setFilters({ dueDate: date ? date.toISOString() : null })
        }
      />
    </div>
  );
}
