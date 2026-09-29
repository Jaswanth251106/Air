import React from "react";
import { DataTableColumn } from "@/types";
import { cn } from "@/lib/utils";

interface DataTableRowProps<T> {
  row: T;
  columns: DataTableColumn<T>[];
  rowIndex: number;
  onClick?: (row: T) => void;
}

export function DataTableRow<T>({ row, columns, rowIndex, onClick }: DataTableRowProps<T>) {
  return (
    <tr
      onClick={() => onClick && onClick(row)}
      className={cn(
        "border-b border-[#EDF2F7] transition-colors hover:bg-[#EAF3FB]/50",
        rowIndex % 2 === 0 ? "bg-white" : "bg-[#F6F8FB]/30",
        onClick && "cursor-pointer"
      )}
    >
      {columns.map((col, idx) => {
        const value = (row as Record<string, unknown>)[col.key.toString()];
        return (
          <td
            key={col.key.toString() || idx}
            className={cn(
              "px-4 py-3 text-xs text-[#14213D] font-sans font-medium whitespace-nowrap",
              col.align === "right"
                ? "text-right font-mono"
                : col.align === "center"
                ? "text-center"
                : "text-left"
            )}
          >
            {col.render ? col.render(row) : (value as React.ReactNode)}
          </td>
        );
      })}
    </tr>
  );
}
