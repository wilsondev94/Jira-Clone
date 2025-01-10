import { OverViewPropertyProps } from "@/types/taskTypes/types";

export default function OverViewProperty({
  label,
  children,
}: OverViewPropertyProps) {
  return (
    <div className=" items-center gap-x-2 ">
      <div className="min-w-[100px]">
        <p className="text-sm text-muted-foreground">{label}</p>

        <div className="flex items-center gap-x-2 mt-2">{children}</div>
      </div>
    </div>
  );
}
