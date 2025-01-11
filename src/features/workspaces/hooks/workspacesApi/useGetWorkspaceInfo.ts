import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { GetWorkspaceIdProps } from "@/types/workspaceTypes/types";

export function useGetWorkspaceInfo({ workspaceId }: GetWorkspaceIdProps) {
  const query = useQuery({
    queryKey: ["workspace-info", workspaceId],

    queryFn: async () => {
      const res = await client.api.workspaces[":workspaceId"]["info"].$get({
        param: { workspaceId },
      });

      if (!res.ok) throw new Error("Failed to fetch workspace Information");
      const data = await res.json();

      return data;
    },
  });

  return query;
}
