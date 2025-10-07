'use client';

import { Concept, ConceptGenerationResult } from '../types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { useConceptStore } from './useConceptStore';
import { useConceptGenerationLogic } from './useConceptGenerationLogic';
import { useConceptMetrics } from './useConceptMetrics';

export interface UseConceptDataOptions {
  audienceId?: string;
}

export interface UseConceptDataReturn {
  concepts: Concept[];
  isLoading: boolean;
  error: string | null;
  validationErrors: string[];
  generateConcepts: (
    audienceData: DemographicSelectionData,
    count?: number,
    targetAudienceId?: string
  ) => Promise<ConceptGenerationResult>;
  remixConcept: (
    originalConcept: Concept,
    audienceData: DemographicSelectionData,
    targetAudienceId?: string
  ) => Promise<ConceptGenerationResult>;
  loadConceptsForAudience: (audienceId: string) => Promise<void>;
  loadMoreConceptsForAudience: (audienceId: string) => Promise<void>;
  hasConcepts: boolean;
  hasMoreConcepts: boolean;
  isLoadingMoreConcepts: boolean;
  totalReach: number;
  avgEngagement: number;
  isAIConfigured: boolean;
}

/**
 * Main hook for managing concept data - combines store, generation, and metrics
 */
export function useConceptData(audienceId?: string): UseConceptDataReturn {
  // Store interactions
  const {
    concepts,
    hasConcepts,
    hasMoreConcepts,
    isLoadingMoreConcepts,
    totalReach: storeTotalReach,
    avgEngagement: storeAvgEngagement,
    storeLoading,
    storeError,
    loadConceptsForAudience,
    loadMoreConceptsForAudience,
    addConcepts,
  } = useConceptStore({ audienceId });

  // Generation logic
  const {
    generateConcepts,
    remixConcept,
    isLoading: generationLoading,
    error: generationError,
    validationErrors,
    isAIConfigured,
  } = useConceptGenerationLogic({ addConceptsAction: addConcepts });

  // Metrics calculations
  const { totalReach: calculatedReach, avgEngagement: calculatedEngagement } = useConceptMetrics({ concepts });

  // Combine loading states
  const isLoading = generationLoading || storeLoading;

  // Combine error states
  const error = generationError || storeError;

  // Use calculated metrics if available, otherwise fall back to store metrics
  const totalReach = calculatedReach > 0 ? calculatedReach : storeTotalReach;
  const avgEngagement = calculatedEngagement > 0 ? calculatedEngagement : storeAvgEngagement;

  return {
    concepts,
    isLoading,
    error,
    validationErrors,
    generateConcepts,
    remixConcept,
    loadConceptsForAudience,
    loadMoreConceptsForAudience,
    hasConcepts,
    hasMoreConcepts,
    isLoadingMoreConcepts,
    totalReach,
    avgEngagement,
    isAIConfigured,
  };
}
