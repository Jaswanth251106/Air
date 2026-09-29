"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = "md",
}: ModalProps) {
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

  const widthStyles = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/40 backdrop-blur-xs transition-opacity">
      <div
        className={cn(
          "w-full bg-white rounded-sih-lg shadow-sih-dropdown border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200",
          widthStyles[maxWidth]
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-[#F6F8FB]">
          <div>
            <h3 className="text-lg font-bold text-[#14213D] font-sans tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-[#5B6B82] mt-0.5 font-sans">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5B6B82] rounded-md hover:bg-[#EAF3FB] hover:text-[#0A5B9E] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 text-sm text-[#14213D]">
          {children}
        </div>

        {footer && (
          <div className="p-4 border-t border-[#E2E8F0] bg-[#F6F8FB] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
