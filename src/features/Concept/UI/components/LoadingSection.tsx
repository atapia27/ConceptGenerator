'use client';

import React from 'react';

interface LoadingSectionProps {
  isLoading: boolean;
  storeLoading: boolean;
}

export function LoadingSection({ isLoading, storeLoading }: LoadingSectionProps) {
  if (!isLoading && !storeLoading) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {storeLoading ? 'Loading Concepts...' : 'Generating Concepts'}
        </h2>
      </div>
      <div className="p-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">
              {storeLoading
                ? 'Loading concepts from database...'
                : 'Analyzing audience data and generating concepts...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
