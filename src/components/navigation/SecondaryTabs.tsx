import React from "react";
import { TabItem } from "./Tabs";
import { cn } from "@/lib/utils";

interface SecondaryTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
}

export function SecondaryTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className,
}: SecondaryTabsProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sih-sm transition-all cursor-pointer font-sans",
              isActive
                ? "bg-white text-[#0A5B9E] shadow-sih-subtle border border-[#E2E8F0]"
                : "text-[#5B6B82] hover:text-[#14213D]"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
