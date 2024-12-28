import { getCurrent } from "@/features/auth/actions";
import { ProjectIdProps } from "@/types/projectTypes/types";
import { redirect } from "next/navigation";

export default async function ProjectPage({ params }: ProjectIdProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <div>page: {params.projectId}</div>;
}
