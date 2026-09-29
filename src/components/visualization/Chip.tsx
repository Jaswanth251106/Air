import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, onRemove, active = false, onClick, className }: ChipProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-sans border transition-all select-none cursor-pointer",
        active
          ? "bg-[#0A5B9E] text-white border-[#0A5B9E]"
          : "bg-[#F6F8FB] text-[#14213D] border-[#E2E8F0] hover:border-[#B2D4F0] hover:bg-[#EAF3FB]/50",
        className
      )}
    >
      <span>{label}</span>
      {onRemove && (
        <X
          className="w-3 h-3 hover:text-[#D1262C] cursor-pointer shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </span>
  );
}
