import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$patch"]
>;

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const res = await client.api.projects[":projectId"]["$patch"]({
        form,
        param,
      });

      if (!res.ok) throw new Error("Failed to update project.");

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Project updated");

      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to update project.");
    },
  });

  return mutation;
};
