import { SettingsIcon } from "lucide-react";
import Link from "next/link";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkSpacesId } from "@/features/workspaces/hooks/workspaceParam/useWorkSpaceParam";
import { Member } from "@/types/memberTypes/type";
import { MemberAvatar } from "./MembersAvatar";

interface ProjectListProps {
  members: Member[];
  total: number;
}

export function MemberList({ members, total }: ProjectListProps) {
  const workspaceId = useWorkSpacesId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members({total})</p>
          <Button asChild variant="secondary" size="icon">
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <DottedSeparator clasName="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <li key={member.id}>
              <Card className="shadow-none rounded-lg overflow-hidden ">
                <CardContent className="p-3 flex items-center gap-x-2">
                  <MemberAvatar name={member.name} className="size-12" />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-1 mr-7">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}

          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No member found.
          </li>
        </ul>
      </div>
    </div>
  );
}
