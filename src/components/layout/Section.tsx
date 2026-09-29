import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, subtitle, action, children, className }: SectionProps) {
  return (
    <section className={cn("mb-8", className)}>
      {(title || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-[#EDF2F7]">
          <div>
            {title && (
              <h2 className="text-base font-bold text-[#14213D] font-sans tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-[#5B6B82] mt-0.5 font-sans">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}
