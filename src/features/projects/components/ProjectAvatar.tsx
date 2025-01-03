import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarProps } from "@/types/types";

export const ProjectAvatar = ({
  image,
  name,
  className,
  fallbackClassName,
}: AvatarProps) => {
  if (!image)
    return (
      <Avatar className={cn("size-5 ", className)}>
        <AvatarFallback
          className={cn(
            "text-white bg-blue-500 font-semibold text-sm uppercase",
            fallbackClassName
          )}
        >
          {name?.[0]}
        </AvatarFallback>
      </Avatar>
    );

  return (
    <div
      className={cn("size-5 relative rounded-md  overflow-hidden", className)}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
};
