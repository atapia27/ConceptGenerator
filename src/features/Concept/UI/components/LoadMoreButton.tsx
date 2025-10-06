'use client';

import React from 'react';
import Button from '@/components/Button';

interface LoadMoreButtonProps {
  onLoadMoreAction: () => void;
  isLoading: boolean;
  hasMore: boolean;
  className?: string;
}

export function LoadMoreButton({
  onLoadMoreAction,
  isLoading,
  hasMore,
  className = '',
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <Button
        variant="secondary"
        size="md"
        color="gray"
        onClick={onLoadMoreAction}
        disabled={isLoading}
        className="min-w-[120px]"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-600"></div>
            <span>Loading...</span>
          </div>
        ) : (
          'Load More'
        )}
      </Button>
    </div>
  );
}
