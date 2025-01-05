import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useGetTasksProps } from "@/types/taskTypes/types";

export function useGetTasks({
  workspaceId,
  projectId,
  assigneeId,
  status,
  search,
  dueDate,
}: useGetTasksProps) {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      assigneeId,
      status,
      search,
      dueDate,
    ],

    queryFn: async () => {
      const res = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          assigneeId: assigneeId ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();

      return data;
    },
  });

  return query;
}
