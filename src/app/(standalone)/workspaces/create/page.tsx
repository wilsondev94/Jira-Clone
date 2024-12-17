import { getCurrent } from "@/features/auth/actions";
import { WorkspaceForm } from "@/features/workspaces/components/WorkspaceForm";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className=" w-full lg:max-w-xl">
      <WorkspaceForm />
    </div>
  );
}
