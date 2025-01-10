"use client";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/useTaskModal/useCreateTaskModal";
import { useGetTasks } from "../hooks/taskApi/useGetTasks";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useQueryState } from "nuqs";
import DataFilters from "./DataFilters";
import { useTaskFilter } from "../hooks/useTaskFilter/useTaskFilter";
import { DataTable } from "./DataTable";
import { Columns } from "./Column";
import { DataKanban } from "./DataKanban";
import { useCallback } from "react";
import { DataFiltersProps, TaskStatus } from "@/types/taskTypes/types";
import { useBulkUpdateTask } from "../hooks/taskApi/useBulkUpdateTask";
import { DataCalendar } from "./DataCalendar";

export default function TaskView({ hideProjectFilter }: DataFiltersProps) {
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });

  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilter();
  console.log(status);

  const workspaceId = useWorkSpacesId();

  const { data: tasks, isLoading: loadingTask } = useGetTasks({
    workspaceId,
    // @ts-expect-error ignore error
    status,
    assigneeId,
    projectId,
    dueDate,
  });

  const { mutate: bulkUpdate } = useBulkUpdateTask();

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );

  const { open } = useCreateTaskModal();

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className=" h-full flex flex-col overflow-auto p-4 ">
        <div
          className="
            flex flex-col gap-y-2 lg:flex-row justify-between items-center"
        >
          <TabsList className=" w-full lg:w-auto">
            <TabsTrigger className=" h-8 w-full lg:w-auto " value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className=" h-8 w-full lg:w-auto " value="kanban">
              Table
            </TabsTrigger>
            <TabsTrigger className=" h-8 w-full lg:w-auto " value="calendar">
              Table
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className=" w-full lg:w-auto" onClick={open}>
            <PlusIcon className=" size-4 mr-2" />
            New task
          </Button>
        </div>
        <DottedSeparator clasName="my-4" />
        <DataFilters hideProjectFilter={!hideProjectFilter} />
        <DottedSeparator clasName="my-4" />
        {loadingTask ? (
          <div className=" w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className=" size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={Columns} data={tasks?.data.documents ?? []} />
            </TabsContent>

            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.data.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              <DataCalendar data={tasks?.data.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}
