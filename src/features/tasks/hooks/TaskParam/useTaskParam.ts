import { useParams } from "next/navigation";

export function useTaskId() {
  const param = useParams();

  console.log(param.taskId);

  return param.taskId as string;
}
