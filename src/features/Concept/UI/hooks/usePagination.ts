'use client';

import { useState, useCallback, useMemo } from 'react';
import { 
  calculatePaginationState, 
  shouldResetPagination,
  type PaginationState,
  type PaginationActions
} from '../utils/pagination';

export interface UsePaginationOptions {
  itemsPerPage: number;
  totalItems: number;
  initialPage?: number;
}

export interface UsePaginationReturn extends PaginationState, PaginationActions {}

/**
 * Custom hook for managing pagination state and actions
 */
export function usePagination({
  itemsPerPage,
  totalItems,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate pagination state
  const paginationState = useMemo(() => {
    return calculatePaginationState({
      itemsPerPage,
      totalItems,
      currentPage,
    });
  }, [itemsPerPage, totalItems, currentPage]);

  // Pagination actions
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, paginationState.totalPages));
  }, [paginationState.totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Auto-reset pagination if current page is invalid
  useMemo(() => {
    if (shouldResetPagination(currentPage, totalItems, itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [currentPage, totalItems, itemsPerPage]);

  return {
    ...paginationState,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    resetToFirstPage,
  };
}
