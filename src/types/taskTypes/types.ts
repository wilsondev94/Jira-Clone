import { Models } from "node-appwrite";
import { Project } from "../projectTypes/types";
import { Member } from "../memberTypes/type";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export interface TaskFormWrapperProps {
  onCancel: () => void;
}
export interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

export interface useGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus;
  search?: string | null;
  assigneeId?: string | null;
  dueDate?: string | null;
}
export interface useGetTaskProps {
  taskId: string;
}

export interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export type Task = Models.Document & {
  name: string;
  projectId: string;
  assigneeId: string;
  workspaceId: string;
  status: TaskStatus;
  position: number;
  dueDate: string;
  description?: string;
};

export interface TaskDateProps {
  value: string;
  className?: string;
}

export interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export interface DataKanbanProps {
  data: Task[];
  onChange: (
    task: { $id: string; status: TaskStatus; position: number }[]
  ) => void;
}

export interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

export interface KanbanCardProps {
  task: Task;
}

export interface DataCalendarProps {
  data: Task[];
}

export interface EventCardProps {
  title: string;
  project: Project;
  assignee: Member;
  status: TaskStatus;
  id: string;
}

export interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREVIOUS" | "NEXT" | "TODAY") => void;
}

export interface ErrorpageProps {
  message: string;
}

export interface TaskBreadCrumbsProps {
  project: Project;
  task: Task;
}

export interface TaskOverViewAndDescriptionProps {
  task: Task;
}

export interface OverViewPropertyProps {
  label: string;
  children: React.ReactNode;
}
