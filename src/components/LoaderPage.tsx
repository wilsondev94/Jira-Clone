import { Loader } from "lucide-react";

export default function LoaderPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-6 animate-spin text-muted-foreground " />
    </div>
  );
}
