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
