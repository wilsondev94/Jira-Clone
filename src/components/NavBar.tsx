"use client";

import { MobileSideBar } from "./MobileSideBar";
import { UserButton } from "../features/auth/components/UserButton";
import { usePathname } from "next/navigation";

const pathMap = {
  tasks: {
    title: "My tasks",
    description: "View all your tasks here",
  },
  projects: {
    title: "My projects",
    description: "View all your project's tasks here",
  },
};

const defaultPath = {
  title: "Home",
  description: "Monitor all your projects and tasks here",
};

export function NavBar() {
  const pathname = usePathname();

  const pathnameParts = pathname.split("/");

  const pathKey = pathnameParts[3] as keyof typeof pathMap;

  const { title, description } = pathMap[pathKey] || defaultPath;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex ">
        <h1 className="text-2xl font-semibold ">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSideBar />
      <UserButton />
    </nav>
  );
}
