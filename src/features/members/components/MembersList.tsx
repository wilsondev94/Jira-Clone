"use client";

import Link from "next/link";
import { Fragment } from "react";
import { ArrowLeft, MoreVerticalIcon } from "lucide-react";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { useGetMembers } from "../membersApiHooks/useGetMembers";
import { MemberAvatar } from "./MembersAvatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateMember } from "../membersApiHooks/useUpdateMember";
import { useDeleteMember } from "../membersApiHooks/useDeleteMember";
import { MemberRole } from "../../../types/memberTypes/type";
import { useConfirmationModal } from "@/components/ConfirmationModal";

export function MembersList() {
  const workspaceId = useWorkSpacesId();

  const { data } = useGetMembers({
    workspaceId,
  });
  const members = data?.data.documents;

  const [ConfirmDialog, confirm] = useConfirmationModal(
    "Remove member",
    "This member will be removed from the workspace",
    "destructive"
  );

  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();

  function handleUpdateMember(memberId: string, role: MemberRole) {
    updateMember({ json: { role }, param: { memberId } });
  }

  async function handleDeleteMember(memberId: string) {
    const ok = await confirm();
    if (!ok) return;

    deleteMember(
      {
        param: { memberId },
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeft className=" size-4 mr-2" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Member list</CardTitle>
      </CardHeader>
      <div className="p-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        {members?.map((member) => {
          return (
            <Fragment key={member?.$id}>
              <div className="flex items-center gap-2">
                <MemberAvatar
                  className="size-10 "
                  fallbackClassName="text-lg "
                  name={member?.name}
                />

                <div className="flex flex-col">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="ml-auto">
                      <MoreVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() =>
                        handleUpdateMember(member.$id, MemberRole.ADMIN)
                      }
                      disabled={isUpdatingMember}
                    >
                      Set as Administrator
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() =>
                        handleUpdateMember(member.$id, MemberRole.MEMBER)
                      }
                      disabled={isUpdatingMember}
                    >
                      Set as Member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-amber-700"
                      onClick={() => handleDeleteMember(member.$id)}
                      disabled={isDeletingMember}
                    >
                      Remove {member.name}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {members.length > 1 && <Separator className="my-4" />}
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}
