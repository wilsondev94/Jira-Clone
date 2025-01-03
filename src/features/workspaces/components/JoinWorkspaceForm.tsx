"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JoinWorkspaceProps } from "../../../types/workspaceTypes/types";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useInviteCode,
  useWorkSpacesId,
} from "../hooks/workspaceParam/useWorkSpaceParam";
import { useJoinWorkspace } from "../hooks/workspacesApi/useJoinWorkspace";
import { useRouter } from "next/navigation";

export default function JoinWorkspaceForm({
  initialValues,
}: JoinWorkspaceProps) {
  const router = useRouter();
  const workspaceId = useWorkSpacesId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  function handleSubmit() {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join worksapce</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join{" "}
          <strong>{initialValues.name}&apos;s</strong> workspace{" "}
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-7">
          <div className="flex flex-col gap-2 lg:flex-row items-center justify-between">
            <Button
              variant="secondary"
              size="lg"
              type="button"
              asChild
              disabled={isPending}
              className="w-full lg:w-fit"
            >
              <Link href="/">Cancel</Link>
            </Button>
            <Button
              size="lg"
              type="button"
              className="w-full lg:w-fit"
              disabled={isPending}
              onClick={handleSubmit}
            >
              Join workspace
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
