import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { GetWorkspaceIdProps } from "@/types/workspaceTypes/types";

export type ResponseProjectAnalyticsType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>;

export function useGetWorkspaceAnalytics({ workspaceId }: GetWorkspaceIdProps) {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],

    queryFn: async () => {
      const res = await client.api.workspaces[":workspaceId"]["analytics"].$get(
        {
          param: { workspaceId },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch workspaces analytics");

      const data = await res.json();

      return data;
    },
  });

  return query;
}
