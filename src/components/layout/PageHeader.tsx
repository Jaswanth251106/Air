import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/navigation/Breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description = "Analytics module coming in the next implementation phase.",
  breadcrumbItems,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6 pb-4 border-b border-[#E2E8F0]", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}
        {action && <div>{action}</div>}
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#14213D] font-sans tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs lg:text-sm text-[#5B6B82] mt-1 font-sans max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
