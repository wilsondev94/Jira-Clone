import { parseAsBoolean, useQueryState } from "nuqs";
import { useParams } from "next/navigation";

export function useWorkSpacesId() {
  const param = useParams();

  return param.workspaceId as string;
}

export const useWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-workspace",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
