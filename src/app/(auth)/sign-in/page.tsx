import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/SignInPageCard";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignInCard />;
}
