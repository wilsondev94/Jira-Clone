"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Errorpage() {
  return (
    <div className=" h-screen flex flex-col items-center justify-center gap-y-4 ">
      <AlertTriangle className=" size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong!</p>
      <Button variant="secondary" size="sm">
        <Link href="/">
          <span className="flex items-center gap-2">
            <ArrowLeft />
            Back to home
          </span>
        </Link>
      </Button>
    </div>
  );
}
