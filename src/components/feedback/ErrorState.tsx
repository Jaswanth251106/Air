import React from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { Button } from "@/components/forms/Button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Statistical Pipeline Synchronization Error",
  message = "Failed to pull index observations from the carrier data feed. Please retry verification.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-sih-md border border-[#F7C1C3] bg-[#FDF0F1] shadow-sih-subtle",
        className
      )}
    >
      <div className="p-3 rounded-full bg-white text-[#D1262C] mb-3 shadow-xs">
        <AlertOctagon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-bold text-[#D1262C] tracking-tight">{title}</h4>
      <p className="text-xs text-[#14213D] max-w-md mt-1 mb-4 leading-relaxed font-sans">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="alert"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Retry Data Fetch
        </Button>
      )}
    </div>
  );
}
