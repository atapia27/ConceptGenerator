'use client';

import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { ConceptCard } from './ConceptCard';
import { PaginationControls } from './PaginationControls';
import { LoadMoreButton } from './LoadMoreButton';
import { Concept } from '../types/types';

interface ConceptsDisplaySectionProps {
  concepts: Concept[];
  selectedAudienceId: string | null;
  currentPage: number;
  totalPages: number;
  hasMoreConcepts: boolean;
  isLoadingMoreConcepts: boolean;
  onUpdateConceptAction: (updatedConcept: Concept) => void;
  onPageChangeAction: (page: number) => void;
  onPreviousPageAction: () => void;
  onNextPageAction: () => void;
  onLoadMoreAction: () => void;
}

export function ConceptsDisplaySection({
  concepts,
  selectedAudienceId,
  currentPage,
  totalPages,
  hasMoreConcepts,
  isLoadingMoreConcepts,
  onUpdateConceptAction: onUpdateConcept,
  onPageChangeAction: onPageChange,
  onPreviousPageAction: onPreviousPage,
  onNextPageAction: onNextPage,
  onLoadMoreAction: onLoadMore,
}: ConceptsDisplaySectionProps) {
  const conceptsPerPage = 6;
  const conceptStartIndex = (currentPage - 1) * conceptsPerPage;
  const conceptEndIndex = conceptStartIndex + conceptsPerPage;
  const currentConcepts = concepts.slice(conceptStartIndex, conceptEndIndex);

  // Memoized concept cards to prevent unnecessary re-renders
  const conceptCards = useMemo(() => {
    return currentConcepts.map((concept) => (
      <ConceptCard
        key={concept.id}
        concept={concept}
        onUpdate={onUpdateConcept}
      />
    ));
  }, [currentConcepts, onUpdateConcept]);

  if (!selectedAudienceId) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Generated Concepts
          </h2>
        </div>
        <div className="p-12">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FontAwesomeIcon
                icon={faUsers}
                className="h-8 w-8 text-gray-400"
              />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Select an audience to view concepts
            </h3>
            <p className="text-gray-600">
              Choose an audience from the list above to see their generated
              concepts or create new ones.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (concepts.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Generated Concepts
          </h2>
        </div>
        <div className="p-12">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="h-8 w-8 text-gray-400"
              />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No concepts generated yet
            </h3>
            <p className="text-gray-600">
              Click generate above to create concepts for this audience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Generated Concepts
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {concepts.length} concepts generated
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {conceptCards}
        </div>

        {/* Concept Pagination Controls */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={concepts.length}
          itemsPerPage={conceptsPerPage}
          onPageChangeAction={onPageChange}
          onPreviousPageAction={onPreviousPage}
          onNextPageAction={onNextPage}
          itemType="concepts"
        />

        {/* Load More Button - Keep for loading more concepts from server */}
        {hasMoreConcepts && (
          <div className="mt-4">
            <LoadMoreButton
              onLoadMoreAction={onLoadMore}
              isLoading={isLoadingMoreConcepts}
              hasMore={hasMoreConcepts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
