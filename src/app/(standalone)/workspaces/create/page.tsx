import { getCurrent } from "@/features/auth/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/CreateWorkspaceForm";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className=" w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
}
