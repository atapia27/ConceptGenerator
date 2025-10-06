'use client';

import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChangeAction: (page: number) => void;
  onPreviousPageAction: () => void;
  onNextPageAction: () => void;
  itemType: string; // e.g., 'audiences', 'concepts'
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChangeAction,
  onPreviousPageAction,
  onNextPageAction,
  itemType,
}: PaginationControlsProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
      <div className="flex items-center text-sm text-gray-700">
        <span>
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{' '}
          {totalItems} {itemType}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onPreviousPageAction}
          disabled={currentPage === 1 || totalPages <= 1}
          className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
            currentPage === 1 || totalPages <= 1
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'cursor-pointer bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          }`}
        >
          Previous
        </button>
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChangeAction(page)}
              disabled={totalPages <= 1}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : totalPages <= 1
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'cursor-pointer bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={onNextPageAction}
          disabled={currentPage === totalPages || totalPages <= 1}
          className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
            currentPage === totalPages || totalPages <= 1
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'cursor-pointer bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
