import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";
import { getProject } from "@/features/projects/actions";
import { ProjectIdParamsProps } from "@/types/projectTypes/types";
import { EditProjectForm } from "@/features/projects/components/EditProjectForm";

export default async function page({ params }: ProjectIdParamsProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
}
