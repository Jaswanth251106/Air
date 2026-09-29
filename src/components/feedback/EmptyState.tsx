import React from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No Statistical Data Available",
  description = "No airfare records or indices match the current filter selection.",
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-sih-md border border-dashed border-[#E2E8F0] bg-[#F6F8FB]/50",
        className
      )}
    >
      <div className="p-3 rounded-full bg-[#EAF3FB] text-[#0A5B9E] mb-3">
        {icon || <SearchX className="w-6 h-6" />}
      </div>
      <h4 className="text-sm font-bold text-[#14213D] tracking-tight">{title}</h4>
      <p className="text-xs text-[#5B6B82] max-w-sm mt-1 mb-4 leading-relaxed font-sans">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
