import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";
import TaskIdClient from "@/features/tasks/components/TaskIdClient";

async function page() {
  const user = getCurrent();
  if (!user) redirect("/sign-in");

  return <TaskIdClient />;
}

export default page;
