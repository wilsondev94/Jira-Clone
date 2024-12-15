import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-neutral-200 diabled:text-neutral-300 border border-neutral-200 shadow-sm neutral [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-blue-600 to-blue-700  text-primary-foreground hover:from-blue-700 hover:to-blue-700",
        destructive:
          "bg-gradient-to-b from-amber-600 to-amber-700 text-destructive-foreground hover:from-amber-700 hover:to-amber-700",
        outline: "bg-white text-black hover:bg-neutral-100",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "border border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
        muted: "bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80",
        teritary:
          "bg-blue-100 border border-transparent hover:bg-blue-200 shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        xs: "h-7 rounded-md px-2 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
