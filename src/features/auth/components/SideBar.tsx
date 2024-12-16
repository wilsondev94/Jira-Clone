import { DottedSeparator } from "@/components/DottedSeparator";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./Nvigation";

export function SideBar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="./icon/jiraclone2.svg" height={35} width={35} alt="logo" />
      </Link>
      <DottedSeparator clasName="my-4 " />

      <Navigation />
    </aside>
  );
}
