'use client';

import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { CompactAudienceCard } from './CompactAudienceCard';
import { PaginationControls } from './PaginationControls';
import { SavedAudience } from '@/stores/audienceStore';

interface AudienceSectionProps {
  audiences: SavedAudience[];
  selectedAudienceId: string | null;
  currentPage: number;
  totalPages: number;
  onAudienceSelectAction: (audience: SavedAudience) => void;
  onPageChangeAction: (page: number) => void;
  onPreviousPageAction: () => void;
  onNextPageAction: () => void;
}

export function AudienceSection({
  audiences,
  selectedAudienceId,
  currentPage,
  totalPages,
  onAudienceSelectAction,
  onPageChangeAction,
  onPreviousPageAction,
  onNextPageAction,
}: AudienceSectionProps) {
  const audiencesPerPage = 6;
  const startIndex = (currentPage - 1) * audiencesPerPage;
  const endIndex = startIndex + audiencesPerPage;
  const currentAudiences = audiences.slice(startIndex, endIndex);

  // Memoized audience cards to prevent unnecessary re-renders
  const audienceCards = useMemo(() => {
    return currentAudiences.map((audience) => {
      const isSelected = selectedAudienceId === audience.id;
      return (
        <CompactAudienceCard
          key={audience.id}
          audience={audience}
          isSelected={isSelected}
          onClick={() => onAudienceSelectAction(audience)}
        />
      );
    });
  }, [currentAudiences, selectedAudienceId, onAudienceSelectAction]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Saved Audiences
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Select an audience to generate concepts
        </p>
      </div>
      <div className="p-6">
        {audiences.length > 0 ? (
          <div className="space-y-6">
            {/* Saved Audiences Grid */}
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {audienceCards}
              </div>
            </div>

            {/* Pagination Controls */}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={audiences.length}
              itemsPerPage={audiencesPerPage}
              onPageChangeAction={onPageChangeAction}
              onPreviousPageAction={onPreviousPageAction}
              onNextPageAction={onNextPageAction}
              itemType="audiences"
            />
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FontAwesomeIcon
                icon={faUsers}
                className="h-8 w-8 text-gray-400"
              />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No Saved Audiences
            </h3>
            <p className="mx-auto max-w-md text-gray-600">
              Create and save audience demographic data in the Audience
              section to begin generating targeted advertising concepts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
