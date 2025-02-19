import { useParams } from "next/navigation";

export function useTaskId() {
  const param = useParams();

  return param.taskId as string;
}
