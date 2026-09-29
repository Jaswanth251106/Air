import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/navigation/Breadcrumb";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  breadcrumbItems?: BreadcrumbItem[];
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  title,
  subtitle,
  breadcrumbItems,
  action,
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={cn("flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full", className)}>
      {/* Breadcrumbs & Action Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        {action && <div>{action}</div>}
      </div>

      {/* Page Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#14213D] font-sans tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs lg:text-sm text-[#5B6B82] mt-1 font-sans max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Content Body */}
      <div>{children}</div>
    </div>
  );
}
