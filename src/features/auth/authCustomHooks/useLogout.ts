import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.auth.logout["$post"]();

      if (!res.ok) throw new Error("Logout failed.");

      return await res.json();
    },

    onSuccess: () => {
      toast.success("Logout Successful.");
      window.location.href = "/sign-in";
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("Logout Failed.");
    },
  });

  return mutation;
};
