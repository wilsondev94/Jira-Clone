import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export function useGetWorkspaces() {
  const query = useQuery({
    queryKey: ["workspaces"],

    queryFn: async () => {
      const res = await client.api.workspaces.$get();

      if (!res.ok) throw new Error("Failed to fetch workspaces");
      const data = await res.json();
      return data;
    },
  });

  return query;
}
