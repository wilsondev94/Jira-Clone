"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { useCreateTaskModal } from "../hooks/useTaskModal/useCreateTaskModal";
import { CreateTaskFormWrapper } from "./CreateTaskFormWrapper";

export function CreateTaskModal() {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
}
