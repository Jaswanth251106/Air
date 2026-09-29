import React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  ariaLabel: string;
}

export function IconButton({
  icon,
  variant = "outline",
  size = "md",
  ariaLabel,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  const variantStyles = {
    primary: "bg-[#0A5B9E] text-white hover:bg-[#08497E] border-transparent",
    secondary: "bg-[#EAF3FB] text-[#0A5B9E] hover:bg-[#D5E6F7] border-[#B2D4F0]",
    outline: "bg-white text-[#5B6B82] border-[#E2E8F0] hover:bg-[#F6F8FB] hover:text-[#0A5B9E] hover:border-[#B2D4F0]",
    ghost: "bg-transparent text-[#5B6B82] hover:bg-[#F6F8FB] hover:text-[#14213D] border-transparent",
  };

  const sizeStyles = {
    sm: "p-1.5 rounded-sih-sm",
    md: "p-2 rounded-sih-md",
    lg: "p-2.5 rounded-sih-md",
  };

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center border transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
