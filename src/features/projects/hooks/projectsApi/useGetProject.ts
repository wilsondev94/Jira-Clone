import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { GetProjectProps } from "@/types/projectTypes/types";

export function useGetProject({ projectId }: GetProjectProps) {
  const query = useQuery({
    queryKey: ["project", projectId],

    queryFn: async () => {
      const res = await client.api.projects[":projectId"].$get({
        param: { projectId },
      });

      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();

      return data;
    },
  });

  return query;
}
