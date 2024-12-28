"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { CreateWorkspaceForm } from "./CreateWorkspaceForm";
import { useWorkspaceModal } from "../hooks/useCreateWorkspaceModal/useWorkspaceModal";

export function WorkspaceModal() {
  const { isOpen, setIsOpen, close } = useWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
}
