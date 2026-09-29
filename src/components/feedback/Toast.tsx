import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id?: string;
  type?: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  onClose?: () => void;
}

export function Toast({
  type = "info",
  title,
  message,
  onClose,
}: ToastProps) {
  const typeConfig = {
    info: {
      icon: <Info className="w-4 h-4 text-[#0A5B9E]" />,
      bg: "bg-white border-[#B2D4F0]",
      accent: "bg-[#0A5B9E]",
    },
    success: {
      icon: <CheckCircle2 className="w-4 h-4 text-[#4EB050]" />,
      bg: "bg-white border-[#B9E4BA]",
      accent: "bg-[#4EB050]",
    },
    warning: {
      icon: <AlertTriangle className="w-4 h-4 text-[#F3AC27]" />,
      bg: "bg-white border-[#FBE6B6]",
      accent: "bg-[#F3AC27]",
    },
    error: {
      icon: <XCircle className="w-4 h-4 text-[#D1262C]" />,
      bg: "bg-white border-[#F7C1C3]",
      accent: "bg-[#D1262C]",
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-sih-md border shadow-sih-dropdown min-w-[320px] max-w-md animate-in slide-in-from-bottom-5 duration-200 overflow-hidden",
        config.bg
      )}
    >
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", config.accent)} />
      <div className="shrink-0 mt-0.5 pl-1">{config.icon}</div>
      <div className="flex-1 pr-2">
        <h4 className="text-xs font-bold text-[#14213D] font-sans">{title}</h4>
        {message && (
          <p className="text-xs text-[#5B6B82] mt-0.5 font-sans">{message}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-[#8A99AD] hover:text-[#14213D] transition-colors p-0.5 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
