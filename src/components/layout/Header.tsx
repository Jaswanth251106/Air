"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, HelpCircle, UserCheck } from "lucide-react";
import { SearchInput } from "@/components/forms/SearchInput";
import { IconButton } from "@/components/forms/IconButton";
import { Tooltip } from "@/components/feedback/Tooltip";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MODULE_NAVIGATION } from "./Sidebar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  className?: string;
}

export function Header({ onToggleMobileSidebar, className }: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");
  const pathname = usePathname();

  const currentModule = MODULE_NAVIGATION.find((m) => pathname.startsWith(m.href)) || {
    label: "Dashboard Overview",
    href: "/overview",
  };

  const breadcrumbItems = [
    { label: currentModule.label, href: currentModule.href },
  ];

  return (
    <header
      className={cn(
        "h-16 bg-white border-b border-[#D8E8EC] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20 shadow-sih-subtle select-none",
        className
      )}
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <IconButton
            icon={<Menu className="w-5 h-5 text-[#17324D]" />}
            ariaLabel="Toggle Navigation Sidebar"
            onClick={onToggleMobileSidebar}
            variant="ghost"
            size="sm"
            className="lg:hidden cursor-pointer"
          />
        )}

        <div className="flex items-center gap-2">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Center: Search Bar Placeholder */}
      <div className="w-48 md:w-64 lg:w-80 hidden sm:block">
        <SearchInput
          value={searchVal}
          onChange={setSearchVal}
          placeholder="Search corridor, carrier, or index..."
        />
      </div>

      {/* Right: Control Icons */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Tooltip content="System Notifications">
            <IconButton
              icon={<Bell className="w-4 h-4 text-[#68818C]" />}
              ariaLabel="Notifications"
              variant="ghost"
              size="sm"
            />
          </Tooltip>

          <Tooltip content="Methodology & Documentation">
            <IconButton
              icon={<HelpCircle className="w-4 h-4 text-[#68818C]" />}
              ariaLabel="Documentation"
              variant="ghost"
              size="sm"
            />
          </Tooltip>

          <Tooltip content="Analyst Profile">
            <div className="flex items-center gap-2 pl-2 border-l border-[#D8E8EC] cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-[#DDF8F2] border border-[#B2E0E3] flex items-center justify-center text-[#167D8D]">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
