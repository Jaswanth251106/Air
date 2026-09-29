import React from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant?: "info" | "warning" | "error" | "success" | "forecast";
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  className,
}: AlertProps) {
  const variantStyles = {
    info: {
      container: "bg-[#EAF3FB] border-[#B2D4F0] text-[#0A5B9E]",
      icon: <Info className="w-4 h-4 shrink-0 text-[#0A5B9E]" />,
    },
    warning: {
      container: "bg-[#FEF8EC] border-[#FBE6B6] text-[#14213D]",
      icon: <AlertTriangle className="w-4 h-4 shrink-0 text-[#F3AC27]" />,
    },
    error: {
      container: "bg-[#FDF0F1] border-[#F7C1C3] text-[#D1262C]",
      icon: <XCircle className="w-4 h-4 shrink-0 text-[#D1262C]" />,
    },
    success: {
      container: "bg-[#EFF8EF] border-[#B9E4BA] text-[#14213D]",
      icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-[#4EB050]" />,
    },
    forecast: {
      container: "bg-[#F4EFF8] border-[#D2C1E3] text-[#6F498E]",
      icon: <Info className="w-4 h-4 shrink-0 text-[#6F498E]" />,
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={cn(
        "p-4 rounded-sih-md border flex items-start gap-3 text-xs font-sans shadow-sih-subtle",
        style.container,
        className
      )}
      role="alert"
    >
      {icon || style.icon}
      <div className="flex-1">
        {title && <h5 className="font-bold mb-1 tracking-tight">{title}</h5>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
