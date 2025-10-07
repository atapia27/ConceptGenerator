'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { MetricsPanel } from './components/MetricsPanel';
import { AudienceSection } from './components/AudienceSection';
import { ConceptGenerationSection } from './components/ConceptGenerationSection';
import { ConceptsDisplaySection } from './components/ConceptsDisplaySection';
import { LoadingSection } from './components/LoadingSection';
import { ErrorSection } from './components/ErrorSection';
import {
  useConceptData,
  usePagination,
  useConceptGeneration,
  useDataInitialization,
  useConceptUpdates,
} from './hooks';
import {
  useCurrentAudience,
  useSetCurrentAudience,
  useAudiences,
  useLoadAudiences,
  useUpdateConcept,
  useConceptLoading,
  useConceptError,
  type SavedAudience,
} from '@/stores';

export function ConceptPage() {
  const audiencesPerPage = 6;
  const conceptsPerPage = 6;

  // Store hooks
  const currentAudience = useCurrentAudience();
  const setCurrentAudience = useSetCurrentAudience();
  const audiences = useAudiences();
  const loadAudiences = useLoadAudiences();
  const updateConcept = useUpdateConcept();
  const storeLoading = useConceptLoading();
  const storeError = useConceptError();

  // Data initialization
  useDataInitialization({ loadAudiencesAction: loadAudiences });

  // Audience selection state
  const [selectedAudienceId, setSelectedAudienceId] = useState<string | null>(null);

  // Custom hooks (needs selectedAudienceId)
  const {
    concepts,
    isLoading,
    error,
    generateConcepts,
    remixConcept,
    hasConcepts,
    hasMoreConcepts,
    isLoadingMoreConcepts,
    loadConceptsForAudience,
    loadMoreConceptsForAudience,
    totalReach,
    avgEngagement,
    isAIConfigured,
  } = useConceptData(selectedAudienceId || undefined);

  // Audience selection handler
  const selectAudience = useCallback(
    async (audience: SavedAudience) => {
      setCurrentAudience(audience.data);
      setSelectedAudienceId(audience.id);

      // Load concepts for this audience (lazy loading)
      await loadConceptsForAudience(audience.id);
    },
    [loadConceptsForAudience, setCurrentAudience]
  );

  // Simple validation - audiences are pre-validated when saved
  const isFormValid = !!(currentAudience && selectedAudienceId);

  // Concept generation
  const { generateConceptsForAudience, remixConceptForAudience, loadMoreConcepts } = useConceptGeneration({
    currentAudience,
    selectedAudienceId,
    generateConceptsAction: generateConcepts,
    remixConceptAction: remixConcept,
    loadMoreConceptsForAudienceAction: loadMoreConceptsForAudience,
  });

  // Concept updates
  const { updateConceptData } = useConceptUpdates({
    selectedAudienceId,
    updateConceptAction: updateConcept,
  });

  // Pagination for audiences
  const audiencePagination = usePagination({
    itemsPerPage: audiencesPerPage,
    totalItems: audiences.length,
  });

  // Pagination for concepts
  const conceptPagination = usePagination({
    itemsPerPage: conceptsPerPage,
    totalItems: concepts.length,
  });

  // Reset concept pagination when audience changes
  React.useEffect(() => {
    conceptPagination.resetToFirstPage();
  }, [selectedAudienceId, conceptPagination]);

  // Memoized computed values
  const displayError = useMemo(() => error || storeError, [error, storeError]);
  const displayLoading = useMemo(
    () => isLoading || storeLoading,
    [isLoading, storeLoading]
  );

  return (
    <>
      {/* Error Display */}
      <ErrorSection error={error} storeError={storeError} />

      {/* Metrics Panel */}
      <MetricsPanel
        concepts={concepts}
        totalReach={totalReach}
        avgEngagement={avgEngagement}
        isLoading={displayLoading}
      />

      {/* Audience Section */}
      <AudienceSection
        audiences={audiences}
        selectedAudienceId={selectedAudienceId}
        currentPage={audiencePagination.currentPage}
        totalPages={audiencePagination.totalPages}
        onAudienceSelectAction={selectAudience}
        onPageChangeAction={audiencePagination.setCurrentPage}
        onPreviousPageAction={audiencePagination.goToPreviousPage}
        onNextPageAction={audiencePagination.goToNextPage}
      />

      {/* Concept Generation Section */}
      <ConceptGenerationSection
        hasConcepts={hasConcepts}
        conceptsCount={concepts.length}
        isAIConfigured={isAIConfigured}
        isLoading={displayLoading}
        isFormValid={isFormValid}
        onGenerateConceptsAction={generateConceptsForAudience}
      />

      {/* Results Section */}
      {displayLoading ? (
        <LoadingSection isLoading={isLoading} storeLoading={storeLoading} />
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
      ) : (
        <ConceptsDisplaySection
          concepts={concepts}
          selectedAudienceId={selectedAudienceId}
          currentPage={conceptPagination.currentPage}
          totalPages={conceptPagination.totalPages}
          hasMoreConcepts={hasMoreConcepts}
          isLoadingMoreConcepts={isLoadingMoreConcepts}
          onUpdateConceptAction={updateConceptData}
          onRemixConceptAction={remixConceptForAudience}
          onPageChangeAction={conceptPagination.setCurrentPage}
          onPreviousPageAction={conceptPagination.goToPreviousPage}
          onNextPageAction={conceptPagination.goToNextPage}
          onLoadMoreAction={loadMoreConcepts}
        />
      )}
    </>
  );
}
