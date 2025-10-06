/**
 * Pagination utility functions
 */

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export interface PaginationActions {
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  resetToFirstPage: () => void;
}

export interface PaginationConfig {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
}

/**
 * Calculate pagination state from configuration
 */
export function calculatePaginationState(config: PaginationConfig): PaginationState {
  const { itemsPerPage, totalItems, currentPage } = config;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
  };
}

/**
 * Check if pagination should be reset when items change
 */
export function shouldResetPagination(
  currentPage: number,
  totalItems: number,
  itemsPerPage: number
): boolean {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return currentPage > totalPages && totalPages > 0;
}

