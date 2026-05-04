import { useMemo, useState, useEffect } from "react";

interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
}

export function usePagination<T>({ data, itemsPerPage = 6 }: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when data changes (e.g., when search or filter is applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

  // Adjust current page if it exceeds total pages
  const adjustedPage = useMemo(() => {
    if (totalPages === 0) return 1;
    return Math.min(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const startIndex = useMemo(() => (adjustedPage - 1) * itemsPerPage, [adjustedPage, itemsPerPage]);

  const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex, itemsPerPage]);

  const paginatedData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    goToPage(adjustedPage + 1);
  };

  const previousPage = () => {
    goToPage(adjustedPage - 1);
  };

  return {
    currentPage: adjustedPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, data.length),
    totalItems: data.length,
  };
}
