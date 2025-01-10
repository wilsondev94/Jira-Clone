import { useParams } from "next/navigation";

export function useProjectId() {
  const param = useParams();

  return param.projectId as string;
}
