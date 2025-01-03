import { useParams } from "next/navigation";

export function useWorkSpacesId() {
  const param = useParams();

  return param.workspaceId as string;
}

export function useInviteCode() {
  const param = useParams();

  return param.inviteCode as string;
}
