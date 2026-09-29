"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Cpu,
  BrainCircuit,
  Database,
  ChevronRight,
} from "lucide-react";
import { NavItemType } from "@/types";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { cn } from "@/lib/utils";

interface NavItemProps {
  item: NavItemType;
  isCollapsed?: boolean;
}

export function NavItem({ item, isCollapsed = false }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

  const getIcon = () => {
    const iconProps = { className: "w-4 h-4 shrink-0 transition-colors" };
    switch (item.iconName) {
      case "Overview":
        return <LayoutDashboard {...iconProps} />;
      case "Market Data":
        return <BarChart3 {...iconProps} />;
      case "Index Engine":
        return <Cpu {...iconProps} />;
      case "Intelligence":
        return <BrainCircuit {...iconProps} />;
      case "Data & API":
        return <Database {...iconProps} />;
      default:
        return <LayoutDashboard {...iconProps} />;
    }
  };

  return (
    <Link
      href={item.href}
      title={isCollapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-sih-md text-xs font-semibold font-sans transition-all duration-150 group relative cursor-pointer",
        isActive
          ? "bg-[#0A5B9E] text-white shadow-sih-card"
          : "text-[#5B6B82] hover:bg-[#EAF3FB] hover:text-[#0A5B9E]",
        isCollapsed && "justify-center px-0"
      )}
    >
      {getIcon()}
      {!isCollapsed && (
        <div className="flex items-center justify-between flex-1 overflow-hidden">
          <span className="truncate tracking-wide">{item.label}</span>
          {item.badge ? (
            <MetricBadge
              label={item.badge}
              variant={item.badgeVariant || "primary"}
              size="sm"
            />
          ) : (
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity",
                isActive && "opacity-100 text-white"
              )}
            />
          )}
        </div>
      )}
    </Link>
  );
}
