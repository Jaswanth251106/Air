import React from "react";
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { DATA_STATUS_MAP } from "@/design-system/colors";
import { StatusBadgeProps, DataStatus } from "@/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, label, showIcon = true, size = "md" }: StatusBadgeProps) {
  const statusConfig = DATA_STATUS_MAP[status];
  const displayLabel = label || statusConfig.label;

  const renderIcon = () => {
    if (!showIcon) return null;
    const iconProps = { className: size === "sm" ? "w-3 h-3 shrink-0" : "w-3.5 h-3.5 shrink-0" };
    switch (status) {
      case "observed":
        return <Activity {...iconProps} />;
      case "forecast":
        return <TrendingUp {...iconProps} />;
      case "alert":
        return <AlertTriangle {...iconProps} />;
      case "validated":
        return <CheckCircle2 {...iconProps} />;
      case "event":
        return <Calendar {...iconProps} />;
      default:
        return null;
    }
  };

  const getVariant = (s: DataStatus) => {
    switch (s) {
      case "observed":
        return "bg-[#DDF8F2] text-[#167D8D] border-[#B2E0E3] border-solid";
      case "forecast":
        return "bg-[#E8F7FA] text-[#59C7CB] border-[#B4E6E8] border-dashed";
      case "alert":
        return "bg-[#FDF0F1] text-[#D1262C] border-[#F7C1C3] border-solid";
      case "validated":
        return "bg-[#E6F6F8] text-[#2FA9B8] border-[#A5E1E8] border-solid";
      case "event":
        return "bg-[#FEF8EC] text-[#F3AC27] border-[#FBE6B6] border-dotted";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-mono tracking-wide uppercase shadow-2xs font-semibold shrink-0 whitespace-nowrap max-w-full overflow-hidden text-ellipsis",
        size === "sm" ? "px-1.5 py-0.5 text-[10px] gap-1" : "px-2 py-0.5 text-[11px] gap-1.5",
        getVariant(status)
      )}
      title={statusConfig.description}
    >
      {renderIcon()}
      <span className="truncate">{displayLabel}</span>
    </span>
  );
}
