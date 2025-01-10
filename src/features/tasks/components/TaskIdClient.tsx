"use client";

import { DottedSeparator } from "@/components/DottedSeparator";
import ErrorPage from "@/components/ErrorPage";
import LoaderPage from "@/components/LoaderPage";
import { TaskBreadCrumbs } from "@/features/tasks/components/TaskBreadCrumbs";
import { useGetTask } from "@/features/tasks/hooks/taskApi/useGetTask";
import { useTaskId } from "@/features/tasks/hooks/TaskParam/useTaskParam";
import { TaskOverView } from "./TaskOverView";
import TaskDescription from "./TaskDescription";

export default function TaskIdClient() {
  const taskId = useTaskId();

  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!data) {
    return <ErrorPage message="Task not found!" />;
  }

  return (
    <div className="flex flex-col ">
      <TaskBreadCrumbs project={data?.data.project} task={data.data} />
      <DottedSeparator clasName=" my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverView task={data.data} />
        <TaskDescription task={data.data} />
      </div>
    </div>
  );
}
