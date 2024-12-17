"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { SideBar } from "./SideBar";
import { usePathname } from "next/navigation";

export function MobileSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div>
      <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" className="lg:hidden">
            <MenuIcon className="size-4 text-neutral-500" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SideBar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
