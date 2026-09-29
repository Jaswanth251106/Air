"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plane,
  Compass,
  Calculator,
  Brain,
  Database,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
} from "lucide-react";
import { Tooltip } from "@/components/feedback/Tooltip";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { useFilterContext } from "@/context/FilterContext";
import { cn } from "@/lib/utils";

export interface SidebarModuleItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: "primary" | "secondary" | "alert" | "attention" | "validated" | "forecast" | "steel" | "coral" | "neutral";
  description: string;
}

export const MODULE_NAVIGATION: SidebarModuleItem[] = [
  {
    label: "Overview",
    href: "/overview",
    icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    description: "National executive summary & trunk corridor indices",
  },
  {
    label: "Air Network Explorer",
    href: "/air-network",
    icon: <Compass className="w-4 h-4 shrink-0" />,
    badge: "2D Map",
    badgeVariant: "attention",
    description: "Geographic 2D route map & spatial airfare intelligence",
  },
  {
    label: "Market Data",
    href: "/market-data",
    icon: <Plane className="w-4 h-4 shrink-0" />,
    badge: "Live",
    badgeVariant: "primary",
    description: "Observed fare dynamics across carrier sources",
  },
  {
    label: "Index Engine",
    href: "/index-engine",
    icon: <Calculator className="w-4 h-4 shrink-0" />,
    badge: "v1.0",
    badgeVariant: "steel",
    description: "Paasche-Laspeyres calculation & weight breakdown",
  },
  {
    label: "Intelligence",
    href: "/intelligence",
    icon: <Brain className="w-4 h-4 shrink-0" />,
    badge: "ML",
    badgeVariant: "forecast",
    description: "Predictive price modeling & surge forecasting",
  },
  {
    label: "Data & API",
    href: "/data-api",
    icon: <Database className="w-4 h-4 shrink-0" />,
    badge: "NDC",
    badgeVariant: "validated",
    description: "Multi-source feed status & API endpoints",
  },
];

interface SidebarProps {
  onCloseMobile?: () => void;
  className?: string;
}

export function Sidebar({ onCloseMobile, className }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useFilterContext();

  return (
    <aside
      className={cn(
        "bg-white border-r border-[#D8E8EC] flex flex-col justify-between transition-all duration-200 z-30 shrink-0 sticky top-0 h-screen select-none",
        sidebarCollapsed ? "w-18" : "w-64",
        className
      )}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 border-b border-[#D8E8EC] px-4 flex items-center justify-between bg-[#F7FBFC]/80">
          <Link href="/overview" className="flex items-center gap-2.5 overflow-hidden">
            <div className="p-2 rounded-sih-md bg-[#167D8D] text-white shrink-0 shadow-sih-card">
              <Plane className="w-5 h-5 transform -rotate-45" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-[#17324D] leading-none tracking-tight">
                  AIRFARE PRICE INDEX
                </span>
                <span className="text-[10px] font-mono font-bold text-[#167D8D] mt-0.5">
                  India Analytics
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 text-[#68818C] rounded-md hover:bg-[#DDF8F2] hover:text-[#167D8D] transition-colors cursor-pointer hidden lg:block focus:outline-none focus:ring-2 focus:ring-[#167D8D]/30"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-[#68818C] rounded-md hover:bg-[#DDF8F2] hover:text-[#167D8D] transition-colors cursor-pointer lg:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Primary Module Navigation */}
        <div className="p-3">
          {!sidebarCollapsed && (
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#95A7B0] font-mono">
                Primary Modules
              </span>
              <span className="text-[10px] font-mono text-[#68818C]">Navigation</span>
            </div>
          )}

          <nav className="flex flex-col gap-1" aria-label="Primary Navigation">
            {MODULE_NAVIGATION.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              const linkContent = (
                <Link
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-sih-md text-xs font-semibold font-sans transition-all duration-150 group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#167D8D]/40",
                    isActive
                      ? "bg-[#167D8D] text-white shadow-sih-card"
                      : "text-[#68818C] hover:bg-[#DDF8F2] hover:text-[#167D8D]",
                    sidebarCollapsed && "justify-center px-0"
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <div className="flex items-center justify-between flex-1 overflow-hidden">
                      <span className="truncate tracking-wide">{item.label}</span>
                      {item.badge && (
                        <MetricBadge
                          label={item.badge}
                          variant={item.badgeVariant || "primary"}
                          size="sm"
                        />
                      )}
                    </div>
                  )}
                </Link>
              );

              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.href} content={item.label} position="right">
                    {linkContent}
                  </Tooltip>
                );
              }

              return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 border-t border-[#D8E8EC] bg-[#F7FBFC]">
        {!sidebarCollapsed ? (
          <div className="p-3 rounded-sih-md bg-white border border-[#D8E8EC] text-xs font-sans">
            <div className="flex items-center gap-1.5 font-bold text-[#17324D] mb-1">
              <Shield className="w-3.5 h-3.5 text-[#167D8D]" />
              <span>National Analytics Platform</span>
            </div>
            <p className="text-[11px] text-[#68818C] leading-tight mb-2">
              Enterprise analytics platform & global filter state.
            </p>
            <div className="flex items-center justify-between">
              <MetricBadge label="Operational" variant="validated" size="sm" />
              <span className="text-[10px] font-mono text-[#95A7B0]">v1.0.0</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-[#167D8D]" title="National Analytics Platform">
            <Shield className="w-5 h-5" />
          </div>
        )}
      </div>
    </aside>
  );
}
