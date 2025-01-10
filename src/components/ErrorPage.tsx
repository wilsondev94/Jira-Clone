import { ErrorpageProps } from "@/types/taskTypes/types";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  message = "Something went wrong.",
}: ErrorpageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full  ">
      <AlertTriangle className=" size-6 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
