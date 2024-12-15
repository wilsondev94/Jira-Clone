import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api.auth.signup)["$post"]>;

type RequestType = InferRequestType<(typeof client.api.auth.signup)["$post"]>;

export const useSignup = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.signup["$post"]({ json });

      return await res.json();
    },
  });

  return mutation;
};
