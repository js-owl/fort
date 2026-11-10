import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1920px] px-page", className)}>
      {children}
    </div>
  );
}
