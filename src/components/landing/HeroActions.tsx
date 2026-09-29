"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/forms/Button";
import { cn } from "@/lib/utils";

interface HeroActionsProps {
  className?: string;
}

export function HeroActions({ className }: HeroActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3.5", className)}>
      <Link href="/overview" className="no-underline">
        <Button
          variant="primary"
          size="lg"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          className="shadow-sih-card hover:scale-[1.02] transition-transform cursor-pointer"
        >
          Explore Market
        </Button>
      </Link>

      <Link href="/index-engine" className="no-underline">
        <Button
          variant="outline"
          size="lg"
          icon={<BookOpen className="w-4 h-4 text-[#568AB2]" />}
          iconPosition="left"
          className="hover:border-[#0A5B9E] hover:text-[#0A5B9E] transition-colors cursor-pointer"
        >
          View Methodology
        </Button>
      </Link>
    </div>
  );
}
