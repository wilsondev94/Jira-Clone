"use client";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useTaskModal } from "../hooks/useCreateTaskModal/useTaskModal";
import { useGetTask } from "../hooks/taskApi/useGetTask";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useQueryState } from "nuqs";
import DataFilters from "./DataFilters";
import { useTaskFilter } from "../hooks/useTaskFilter/useTaskFilter";
import { DataTable } from "./DataTable";
import { Columns } from "./Column";

export default function TaskViewSwitcher() {
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilter();

  const workspaceId = useWorkSpacesId();

  const { data: tasks, isLoading: loadingTask } = useGetTask({
    workspaceId,
    // @ts-expect-error ignore error
    status,
    assigneeId,
    projectId,
    dueDate,
  });

  const { open } = useTaskModal();

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
        <DataFilters />
        <DottedSeparator clasName="my-4" />
        {loadingTask ? (
          <div className=" w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className=" size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              Data table
              <DataTable columns={Columns} data={tasks?.data.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              Data kanban
              {JSON.stringify(tasks)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Data calendar
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}
