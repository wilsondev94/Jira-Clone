"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { useTaskModal } from "../hooks/useCreateTaskModal/useTaskModal";
import { TaskFormWrapper } from "./TaskFormWrapper";

export function TaskModal() {
  const { isOpen, setIsOpen, close } = useTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <TaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
}
