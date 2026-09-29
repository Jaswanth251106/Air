import React from "react";
import { ShieldAlert, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataStatusProps {
  label?: string;
  variant?: "prototype" | "demo" | "validated";
  size?: "sm" | "md";
  className?: string;
}

export function DataStatus({
  label = "Operational Data",
  variant = "prototype",
  size = "sm",
  className,
}: DataStatusProps) {
  const styles = {
    prototype: {
      bg: "bg-[#E6F6F8]",
      text: "text-[#2FA9B8]",
      border: "border-[#A5E1E8]",
      dot: "bg-[#2FA9B8]",
    },
    demo: {
      bg: "bg-[#FEF8EC]",
      text: "text-[#F3AC27]",
      border: "border-[#FBE6B6]",
      dot: "bg-[#F3AC27]",
    },
    validated: {
      bg: "bg-[#DDF8F2]",
      text: "text-[#167D8D]",
      border: "border-[#B2E0E3]",
      dot: "bg-[#167D8D]",
    },
  };

  const style = styles[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono font-semibold rounded border shadow-2xs select-none",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        style.bg,
        style.text,
        style.border,
        className
      )}
      title="Statistical platform data stream."
    >
      <span className={cn("w-2 h-2 rounded-full animate-pulse shrink-0", style.dot)} />
      <span>{label}</span>
    </span>
  );
}
