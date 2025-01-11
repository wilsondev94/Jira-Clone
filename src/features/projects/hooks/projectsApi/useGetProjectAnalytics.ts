import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { GetProjectIdProps } from "@/types/projectTypes/types";

export type ResponseProjectAnalyticsType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;

export function useGetProjectAnalytics({ projectId }: GetProjectIdProps) {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],

    queryFn: async () => {
      const res = await client.api.projects[":projectId"]["analytics"].$get({
        param: { projectId },
      });

      if (!res.ok) throw new Error("Failed to fetch project analytics");

      const data = await res.json();

      return data;
    },
  });

  return query;
}
