import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn("flex items-center gap-1.5 text-xs text-[#5B6B82] font-mono select-none", className)}
    >
      <Link
        href="/overview"
        className="flex items-center gap-1 text-[#5B6B82] hover:text-[#0A5B9E] transition-colors focus:outline-none focus:underline"
        title="Dashboard Overview"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Dashboard Home</span>
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-[#8A99AD] shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#0A5B9E] transition-colors truncate max-w-[160px] focus:outline-none focus:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "truncate max-w-[220px]",
                  isLast ? "font-bold text-[#14213D]" : "text-[#5B6B82]"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
