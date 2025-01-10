import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { ProjectIdClient } from "@/features/projects/components/ProjectIdClient";

export default async function ProjectPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjectIdClient />;
}
