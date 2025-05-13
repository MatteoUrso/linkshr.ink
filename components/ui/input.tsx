import { cn } from "@/lib/utils";
import * as React from "react";

type InputProps = React.ComponentProps<"input">;
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-slate-10",
          "focus-visible:ring-slate-8 focus-visible:ring-1 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "border-slate-7 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base transition-colors md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, type InputProps };
