"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}: TablePaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    const start = Math.max(1, currentPage - 2);
    return start + i;
  }).filter((page) => page <= totalPages);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-6 py-6 sm:flex-row">
      <div className="text-sm font-medium text-slate-600">
        Affichage de <span className="font-semibold text-slate-900">{startIndex}</span> à{" "}
        <span className="font-semibold text-slate-900">{endIndex}</span> sur{" "}
        <span className="font-semibold text-slate-900">{totalItems}</span> résultats
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Précédent</span>
        </Button>

        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn(
              "min-w-10",
              page === currentPage && "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1.5"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
