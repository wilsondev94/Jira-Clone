import { getCurrent } from "@/features/auth/actions";
import { ProjectIdSettingsClient } from "@/features/projects/components/ProjectIdSettingsClient";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjectIdSettingsClient />;
}
