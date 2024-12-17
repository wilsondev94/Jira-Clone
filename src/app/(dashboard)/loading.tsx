import { Loader } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="size-6 animate-spin to-muted-foreground" />
    </div>
  );
}
