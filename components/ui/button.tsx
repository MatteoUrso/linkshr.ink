import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-9 text-white hover:bg-indigo-10 active:bg-indigo-10 active:brightness-[0.92] active:saturate-[1.1] dark:active:brightness-[1.08] focus-visible:ring-indigo-8 focus-visible:ring-2 focus-visible:outline-none",
        outline:
          "border border-slate-7 bg-background hover:bg-slate-9 hover:text-white focus-visible:ring-slate-8 focus-visible:ring-2 focus-visible:outline-none",
        ghost:
          "text-slate-12 hover:bg-slate-9 hover:text-white focus-visible:ring-slate-8 focus-visible:ring-2 focus-visible:outline-none",
        link: "text-blue-11 hover:text-blue-12 focus-visible:ring-slate-8 focus-visible:ring-1 focus-visible:outline-none",
        linkNeutral:
          "text-slate-11 hover:text-slate-12 focus-visible:ring-slate-8 focus-visible:ring-1 focus-visible:outline-none",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
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
  ({ className, variant, size, asChild = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        // The `data-disabled` attribute enables correct styles when doing `<Button asChild disabled>`
        data-disabled={disabled || undefined}
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
