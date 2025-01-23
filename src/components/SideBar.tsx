import { DottedSeparator } from "@/components/DottedSeparator";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./Navigation";

import { Projects } from "./Projects";
import WorkspaceView from "@/features/workspaces/components/WorkspaceView";

export function SideBar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/icon/nijiral-01.svg" height={50} width={50} alt="logo" />
      </Link>
      <DottedSeparator clasName="my-4 " />

      <WorkspaceView />
      <DottedSeparator clasName="my-4 " />
      <Navigation />
      <DottedSeparator clasName="my-4 " />
      <Projects />
    </aside>
  );
}
