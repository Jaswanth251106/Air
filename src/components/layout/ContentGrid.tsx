import React from "react";
import { cn } from "@/lib/utils";

interface ContentGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  className?: string;
}

export function ContentGrid({ children, columns = 12, className }: ContentGridProps) {
  const colStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-12",
  };

  return (
    <div className={cn("grid gap-4 lg:gap-6", colStyles[columns], className)}>
      {children}
    </div>
  );
}
