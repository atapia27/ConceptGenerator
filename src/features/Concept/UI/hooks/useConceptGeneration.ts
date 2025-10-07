'use client';

import { useCallback } from 'react';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { Concept } from '../types/types';

export interface UseConceptGenerationOptions {
  currentAudience: DemographicSelectionData | null;
  selectedAudienceId: string | null;
  generateConceptsAction: (audience: DemographicSelectionData, count?: number, targetAudienceId?: string) => Promise<unknown>;
  remixConceptAction: (originalConcept: Concept, audience: DemographicSelectionData, targetAudienceId?: string) => Promise<unknown>;
  loadMoreConceptsForAudienceAction: (audienceId: string) => Promise<void>;
}

export interface UseConceptGenerationReturn {
  generateConceptsForAudience: () => Promise<void>;
  remixConceptForAudience: (concept: Concept) => Promise<void>;
  loadMoreConcepts: () => Promise<void>;
}

/**
 * Custom hook for managing concept generation
 */
export function useConceptGeneration({
  currentAudience,
  selectedAudienceId,
  generateConceptsAction,
  remixConceptAction,
  loadMoreConceptsForAudienceAction,
}: UseConceptGenerationOptions): UseConceptGenerationReturn {
  const generateConceptsForAudience = useCallback(async () => {
    if (currentAudience && selectedAudienceId) {
      await generateConceptsAction(currentAudience, 1, selectedAudienceId);
    }
  }, [currentAudience, selectedAudienceId, generateConceptsAction]);

  const remixConceptForAudience = useCallback(async (concept: Concept) => {
    if (currentAudience && selectedAudienceId) {
      await remixConceptAction(concept, currentAudience, selectedAudienceId);
    }
  }, [currentAudience, selectedAudienceId, remixConceptAction]);

  const loadMoreConcepts = useCallback(async () => {
    if (selectedAudienceId) {
      await loadMoreConceptsForAudienceAction(selectedAudienceId);
    }
  }, [selectedAudienceId, loadMoreConceptsForAudienceAction]);

  return {
    generateConceptsForAudience,
    remixConceptForAudience,
    loadMoreConcepts,
  };
}
