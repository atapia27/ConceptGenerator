'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck,
  faDownload,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { DemographicSelectionData } from '../types/types';
import {
  useAudiences,
  useAudienceLoading,
  useAudienceError,
  useGenerateDefaultName,
} from '@/stores';
import { SaveAudienceModal } from './SaveAudienceModal';
import { useAudienceValidation } from '../hooks/useAudienceValidation';
import { useAudienceComparison } from '../hooks/useAudienceComparison';
import { useAudienceSaving } from '../hooks/useAudienceSaving';
import { useAudienceDuplicateDetection } from '../hooks/useAudienceDuplicateDetection';
import { CompactAudienceCard } from '@/features/Concept/UI/components/CompactAudienceCard';

interface CurrentAudienceProps {
  selections: DemographicSelectionData;
  onGenerateAudienceAction: () => void;
  isLoading: boolean;
}

export function CurrentAudience({
  selections,
  onGenerateAudienceAction,
  isLoading: isGenerating,
}: CurrentAudienceProps) {
  const audiences = useAudiences();
  const isLoading = useAudienceLoading();
  const error = useAudienceError();
  const generateDefaultName = useGenerateDefaultName();

  // Use custom hooks for better separation of concerns
  const { hasSelections } = useAudienceComparison({ currentSelections: selections });
  const { isValid: isFormValid } = useAudienceValidation({ selections });
  const { currentAudienceName, isDuplicate } = useAudienceDuplicateDetection({
    selections,
    audiences,
  });
  const {
    isSaved,
    showModal,
    handleSaveAudience,
    handleSaveWithName,
    closeModal,
  } = useAudienceSaving({ selections });

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {error && (
        <div className="border-b border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FontAwesomeIcon
                icon={faTimes}
                className="h-5 w-5 text-red-400"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Current Audience
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {currentAudienceName
                ? 'Saved audience profile'
                : 'Your current audience based on demographic selections'}
            </p>
          </div>
          {hasSelections && (
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveAudience}
                disabled={isSaved || isDuplicate || isLoading}
                className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isSaved
                    ? 'cursor-not-allowed bg-green-100 text-green-800'
                    : isDuplicate
                      ? 'cursor-not-allowed bg-gray-100 text-gray-500'
                      : isLoading
                        ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                        : 'cursor-pointer bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none'
                }`}
              >
                {isSaved ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="mr-2 h-4 w-4" />
                    Saved!
                  </>
                ) : isDuplicate ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="mr-2 h-4 w-4" />
                    Already Saved
                  </>
                ) : isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="mr-2 h-4 w-4"
                    />
                    Save Audience
                  </>
                )}
              </button>

              <button
                onClick={onGenerateAudienceAction}
                disabled={!isFormValid || isGenerating}
                className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  !isFormValid || isGenerating
                    ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                    : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="mr-2 h-4 w-4"
                    />
                    Generate Insights
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        {hasSelections && (
          <CompactAudienceCard
            audience={{
              id: 'preview',
              name: currentAudienceName || 'Audience Preview',
              data: selections,
              createdAt: new Date(),
            }}
          />
        )}
      </div>

      {/* Save Audience Modal */}
      <SaveAudienceModal
        isOpen={showModal}
        onCloseAction={closeModal}
        onSaveAction={handleSaveWithName}
        audienceData={selections}
        defaultName={generateDefaultName(selections)}
      />
    </div>
  );
}