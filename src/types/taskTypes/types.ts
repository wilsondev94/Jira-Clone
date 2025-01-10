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
