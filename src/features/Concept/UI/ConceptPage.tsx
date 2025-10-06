'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { ConceptCard } from './components/ConceptCard';
import { CompactAudienceCard } from './components/CompactAudienceCard';
import { MetricsPanel } from './components/MetricsPanel';
import { LoadMoreButton } from './components/LoadMoreButton';
import { useConceptData } from './hooks/useConceptData';
import {
  useCurrentAudience,
  useSetCurrentAudience,
  useAudiences,
  useLoadAudiences,
  type SavedAudience,
  useUpdateConcept,
  useConceptLoading,
  useConceptError,
} from '@/stores';
import { Concept } from './types/types';

export function ConceptPage() {
  const [selectedAudienceId, setSelectedAudienceId] = useState<string | null>(
    null
  );

  const currentAudience = useCurrentAudience();
  const setCurrentAudience = useSetCurrentAudience();
  const audiences = useAudiences();
  const loadAudiences = useLoadAudiences();
  const {
    concepts,
    isLoading,
    error,
    generateConcepts,
    validationErrors,
    hasConcepts,
    hasMoreConcepts,
    isLoadingMoreConcepts,
    loadConceptsForAudience,
    loadMoreConceptsForAudience,
    totalReach,
    avgEngagement,
    isAIConfigured,
  } = useConceptData(selectedAudienceId || undefined);
  const updateConcept = useUpdateConcept();
  const storeLoading = useConceptLoading();
  const storeError = useConceptError();

  // Load audiences on mount (concepts will be loaded lazily when audience is selected)
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load audiences first
        await loadAudiences();
      } catch (error) {
        console.error('Failed to initialize data:', error);
      }
    };

    initializeData();
  }, [loadAudiences]);

  const handleGenerateConcepts = useCallback(async () => {
    if (currentAudience && selectedAudienceId) {
      await generateConcepts(currentAudience, 1, selectedAudienceId);
    }
  }, [currentAudience, selectedAudienceId, generateConcepts]);

  const handleSelectAudience = useCallback(
    async (audience: SavedAudience) => {
      setCurrentAudience(audience.data);
      setSelectedAudienceId(audience.id);

      // Load concepts for this audience (lazy loading)
      await loadConceptsForAudience(audience.id);
    },
    [loadConceptsForAudience, setCurrentAudience]
  );

  const handleUpdateConcept = useCallback(
    async (updatedConcept: Concept) => {
      if (selectedAudienceId) {
        try {
          await updateConcept(
            selectedAudienceId,
            updatedConcept.id,
            updatedConcept
          );
        } catch (error) {
          console.error('Failed to update concept:', error);
        }
      }
    },
    [selectedAudienceId, updateConcept]
  );

  const handleLoadMore = useCallback(async () => {
    if (selectedAudienceId) {
      await loadMoreConceptsForAudience(selectedAudienceId);
    }
  }, [selectedAudienceId, loadMoreConceptsForAudience]);

  const isFormValid = useMemo(() => {
    return (
      currentAudience &&
      currentAudience.age &&
      currentAudience.profession &&
      currentAudience.location &&
      currentAudience.interests.length > 0 &&
      currentAudience.income &&
      currentAudience.education &&
      selectedAudienceId
    );
  }, [currentAudience, selectedAudienceId]);

  // Memoized computed values
  const displayError = useMemo(() => error || storeError, [error, storeError]);
  const displayLoading = useMemo(
    () => isLoading || storeLoading,
    [isLoading, storeLoading]
  );

  // Memoized audience cards to prevent unnecessary re-renders
  const audienceCards = useMemo(() => {
    return audiences.slice(0, 6).map((audience) => {
      const isSelected = selectedAudienceId === audience.id;
      return (
        <CompactAudienceCard
          key={audience.id}
          audience={audience}
          isSelected={isSelected}
          onClick={() => handleSelectAudience(audience)}
        />
      );
    });
  }, [audiences, selectedAudienceId, handleSelectAudience]);

  // Memoized concept cards to prevent unnecessary re-renders
  const conceptCards = useMemo(() => {
    return concepts.map((concept) => (
      <ConceptCard
        key={concept.id}
        concept={concept}
        onUpdate={handleUpdateConcept}
      />
    ));
  }, [concepts, handleUpdateConcept]);

  return (
    <>
      {/* Store Error Display */}
      {storeError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Store Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{storeError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Panel */}
      <MetricsPanel
        concepts={concepts}
        totalReach={totalReach}
        avgEngagement={avgEngagement}
        isLoading={displayLoading}
      />

      {/* Audience Preview Section */}
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

      {/* Generate Section */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                Concept Generation
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {isFormValid
                  ? hasConcepts
                    ? `This audience has ${concepts.length} concepts. Generate another to expand your collection.`
                    : 'All requirements met. Click generate to create a concept.'
                  : 'Please select an audience to generate concepts.'}
              </p>
              {!isAIConfigured && (
                <div className="mt-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> AI generation is not configured. Set
                    the{' '}
                    <code className="rounded bg-yellow-100 px-1">
                      NEXT_PUBLIC_OPENROUTER_API_KEY
                    </code>{' '}
                    environment variable to enable AI-powered concept
                    generation.
                  </p>
                </div>
              )}
            </div>
            <Button
              variant="primary"
              size="lg"
              color="blue"
              onClick={handleGenerateConcepts}
              disabled={!isFormValid || displayLoading}
              className="ml-6"
            >
              {displayLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  <span>Generating...</span>
                </div>
              ) : hasConcepts ? (
                'Generate Another'
              ) : (
                'Generate Concept'
              )}
            </Button>
          </div>
        </div>
        <div>
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <h4 className="mb-2 font-medium text-red-800">
                Validation Required
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-red-700">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {displayLoading ? (
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
      ) : displayError ? (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Error</h2>
          </div>
          <div className="p-6">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-red-800">{displayError}</p>
            </div>
          </div>
        </div>
      ) : !selectedAudienceId ? (
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
      ) : concepts.length === 0 ? (
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
      ) : (
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

            {/* Load More Button */}
            <LoadMoreButton
              onLoadMoreAction={handleLoadMore}
              isLoading={isLoadingMoreConcepts}
              hasMore={hasMoreConcepts}
              className="mt-6"
            />
          </div>
        </div>
      )}
    </>
  );
}
