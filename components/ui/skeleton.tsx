import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-skeleton-pulse pointer-events-none! cursor-default! rounded-md border-none! bg-none! box-decoration-clone! bg-clip-border! text-transparent! shadow-none! outline-none! select-none!",
        className
      )}
      tabIndex={-1}
      {...props}
    />
  );
}

export { Skeleton };
