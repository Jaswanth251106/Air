"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  position?: "right" | "left";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = "right",
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-[#14213D]/40 backdrop-blur-xs transition-opacity">
      <div
        className="flex-1 cursor-pointer"
        onClick={onClose}
        aria-label="Close overlay"
      />
      <div
        className={cn(
          "w-full max-w-md bg-white border-l border-[#E2E8F0] shadow-sih-drawer h-full flex flex-col animate-in slide-in-from-right duration-200",
          position === "left" && "border-l-0 border-r animate-in slide-in-from-left"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-[#F6F8FB]">
          <div>
            <h3 className="text-base font-bold text-[#14213D] font-sans">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-[#5B6B82] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5B6B82] rounded-md hover:bg-[#EAF3FB] hover:text-[#0A5B9E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
