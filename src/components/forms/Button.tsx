import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "alert" | "forecast";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-[#0A5B9E] text-white hover:bg-[#08497E] border-transparent shadow-sih-subtle",
    secondary: "bg-[#EAF3FB] text-[#0A5B9E] hover:bg-[#D5E6F7] border-[#B2D4F0]",
    outline: "bg-white text-[#14213D] border-[#E2E8F0] hover:bg-[#F6F8FB] hover:border-[#568AB2]",
    ghost: "bg-transparent text-[#5B6B82] hover:bg-[#F6F8FB] hover:text-[#14213D] border-transparent",
    alert: "bg-[#D1262C] text-white hover:bg-[#B01E23] border-transparent shadow-sih-subtle",
    forecast: "bg-[#6F498E] text-white hover:bg-[#5A3A75] border-transparent shadow-sih-subtle",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5 rounded-sih-sm",
    md: "px-4 py-2 text-xs font-bold tracking-wide gap-2 rounded-sih-md",
    lg: "px-5 py-2.5 text-sm font-bold tracking-wide gap-2 rounded-sih-md",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-sans border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}
