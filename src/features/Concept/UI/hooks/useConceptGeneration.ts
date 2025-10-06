'use client';

import { useCallback } from 'react';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';

export interface UseConceptGenerationOptions {
  currentAudience: DemographicSelectionData | null;
  selectedAudienceId: string | null;
  generateConceptsAction: (audience: DemographicSelectionData, count?: number, targetAudienceId?: string) => Promise<unknown>;
  loadMoreConceptsForAudienceAction: (audienceId: string) => Promise<void>;
}

export interface UseConceptGenerationReturn {
  generateConceptsForAudience: () => Promise<void>;
  loadMoreConcepts: () => Promise<void>;
}

/**
 * Custom hook for managing concept generation
 */
export function useConceptGeneration({
  currentAudience,
  selectedAudienceId,
  generateConceptsAction,
  loadMoreConceptsForAudienceAction,
}: UseConceptGenerationOptions): UseConceptGenerationReturn {
  const generateConceptsForAudience = useCallback(async () => {
    if (currentAudience && selectedAudienceId) {
      await generateConceptsAction(currentAudience, 1, selectedAudienceId);
    }
  }, [currentAudience, selectedAudienceId, generateConceptsAction]);

  const loadMoreConcepts = useCallback(async () => {
    if (selectedAudienceId) {
      await loadMoreConceptsForAudienceAction(selectedAudienceId);
    }
  }, [selectedAudienceId, loadMoreConceptsForAudienceAction]);

  return {
    generateConceptsForAudience,
    loadMoreConcepts,
  };
}
