import React from "react";
import { DataTableColumn } from "@/types";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableRow } from "./DataTableRow";
import { EmptyState } from "@/components/feedback/EmptyState";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (row: T) => void;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  className,
  emptyTitle = "No Statistical Records Found",
  emptyDescription = "There are no entries matching the selected corridor filters or search parameters.",
}: DataTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-sih-md p-8 shadow-sih-card">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-sih-md shadow-sih-card overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <DataTableHeader columns={columns} />
          <tbody>
            {data.map((row, idx) => (
              <DataTableRow
                key={idx}
                row={row}
                columns={columns}
                rowIndex={idx}
                onClick={onRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#F6F8FB] px-4 py-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#5B6B82] font-mono">
        <span>Showing {data.length} statistical record entries</span>
        <span>SIH-2026 Engine Standard Verification</span>
      </div>
    </div>
  );
}
