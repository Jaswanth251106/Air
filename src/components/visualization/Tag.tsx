import React from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  variant?: "blue" | "cyan" | "gold" | "green" | "plum" | "steel" | "red" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function Tag({ label, variant = "blue", size = "md", className }: TagProps) {
  const styles = {
    blue: "bg-[#DDF8F2] text-[#167D8D] border-[#B2E0E3]",
    cyan: "bg-[#E8F7FA] text-[#59C7CB] border-[#B4E6E8]",
    gold: "bg-[#FEF8EC] text-[#F3AC27] border-[#FBE6B6]",
    green: "bg-[#E6F6F8] text-[#2FA9B8] border-[#A5E1E8]",
    plum: "bg-[#E8F7FA] text-[#167D8D] border-[#B4E6E8]",
    steel: "bg-[#EAF7FA] text-[#2FA9B8] border-[#B2E2E8]",
    red: "bg-[#FDF0F1] text-[#D1262C] border-[#F7C1C3]",
    neutral: "bg-[#F7FBFC] text-[#17324D] border-[#D8E8EC]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-medium rounded border tracking-wide uppercase",
        size === "sm" ? "px-1.5 py-0.2 text-[10px]" : "px-2 py-0.5 text-xs",
        styles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
