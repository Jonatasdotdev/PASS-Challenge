"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div className="flex w-full items-center justify-between gap-4 px-2 py-3 relative">
      {/* rows selected */}
      <div className="text-muted-foreground text-xs whitespace-nowrap">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {/* Select*/}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-7 w-[90px] text-xs bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] px-2">
            <SelectValue className="text-left truncate">
              {table.getState().pagination.pageSize} / page
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-[#2a2a2a]">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem 
                key={pageSize} 
                value={`${pageSize}`}
                className="text-xs"
              >
                {pageSize} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page info + Navigation */}
      <div className="flex items-center gap-2">
        {/* Informações da página */}
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>
        </div>

        {/* Controles de navegação */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-3 w-3" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}