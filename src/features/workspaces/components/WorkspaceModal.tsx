"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { WorkspaceForm } from "./WorkspaceForm";
import { useWorkspaceModal } from "../workSpaceParamHooks/useWorkSpacesParamHook";

export function WorkspaceModal() {
  const { isOpen, setIsOpen, close } = useWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <WorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
}
