import React from "react";
import { cn } from "@/lib/utils";
import { MetricBadgeProps } from "@/types";

export function MetricBadge({
  label,
  variant = "primary",
  size = "md",
  icon,
  dotted = false,
}: MetricBadgeProps) {
  const variantStyles = {
    primary: "bg-[#EAF3FB] text-[#0A5B9E] border-[#B2D4F0]",
    alert: "bg-[#FDF0F1] text-[#D1262C] border-[#F7C1C3]",
    forecast: "bg-[#F4EFF8] text-[#6F498E] border-[#D2C1E3]",
    attention: "bg-[#FEF8EC] text-[#F3AC27] border-[#FBE6B6]",
    validated: "bg-[#EFF8EF] text-[#4EB050] border-[#B9E4BA]",
    secondary: "bg-[#F0F9FC] text-[#7DC9DE] border-[#CBE9F3]",
    steel: "bg-[#EEF4F8] text-[#568AB2] border-[#BDD3E4]",
    coral: "bg-[#FDF3F3] text-[#D16260] border-[#F6C8C7]",
    neutral: "bg-[#EDF2F7] text-[#14213D] border-[#E2E8F0]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium gap-1",
    md: "px-2.5 py-1 text-xs font-semibold gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border tracking-wide uppercase font-mono transition-colors",
        dotted ? "border-dashed" : "border-solid",
        variantStyles[variant],
        sizeStyles[size]
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
