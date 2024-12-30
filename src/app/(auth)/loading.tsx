import { Loader } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className=" h-screen flex flex-col gap-y-4 items-center justify-center ">
      <Loader className=" size-6 animate-spin" />
    </div>
  );
}
