import { getCurrent } from "@/features/auth/actions";
import TaskView from "@/features/tasks/components/TaskViews";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className=" h-full flex flex-col">
      <TaskView />;
    </div>
  );
}

export default page;
