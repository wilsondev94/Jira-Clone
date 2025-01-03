import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/SignInPage";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignInCard />;
}
