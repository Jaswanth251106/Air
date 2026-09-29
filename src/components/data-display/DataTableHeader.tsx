import React from "react";
import { DataTableColumn } from "@/types";
import { cn } from "@/lib/utils";

interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[];
}

export function DataTableHeader<T>({ columns }: DataTableHeaderProps<T>) {
  return (
    <thead className="bg-[#F6F8FB] border-b border-[#E2E8F0]">
      <tr>
        {columns.map((col, idx) => (
          <th
            key={col.key.toString() || idx}
            style={{ width: col.width }}
            className={cn(
              "px-4 py-3 text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono",
              col.align === "right"
                ? "text-right"
                : col.align === "center"
                ? "text-center"
                : "text-left"
            )}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
