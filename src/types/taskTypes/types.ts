import { Models } from "node-appwrite";

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

export interface useGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus;
  search?: string | null;
  assigneeId?: string | null;
  dueDate?: string | null;
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
  position: string;
  dueDate: string;
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
