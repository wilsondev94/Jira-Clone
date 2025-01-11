import { getCurrent } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/SignUpPageCard ";
import { redirect } from "next/navigation";

export default async function SignUPage() {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignUpCard />;
}
