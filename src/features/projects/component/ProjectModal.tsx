"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { CreateProjectForm } from "./CreateProjectForm";
import { useProjectModal } from "../hooks/useCreateProjectModal/useProjectModal";

export function ProjectModal() {
  const { isOpen, setIsOpen, close } = useProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
}
