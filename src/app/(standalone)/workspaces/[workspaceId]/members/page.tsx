import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";
import { MembersList } from "@/features/members/components/MembersList";

async function MembersPage() {
  const user = getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div className="w-full lg:max-w-xl">
      <MembersList />
    </div>
  );
}

export default MembersPage;
