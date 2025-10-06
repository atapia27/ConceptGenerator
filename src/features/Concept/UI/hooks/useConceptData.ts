'use client';

import { useState, useCallback } from 'react';
import {
  Concept,
  ConceptGenerationResult,
} from '../types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import {
  generateMockConcepts,
  validateAudienceData,
} from '../utils/conceptData';
import { 
  useGetConcepts,
  useAddConcepts,
  useHasConcepts,
  useHasMoreConcepts,
  useIsLoadingMoreConcepts,
  useLoadConcepts,
  useLoadMoreConcepts,
  useGetTotalReach,
  useGetAverageEngagement,
  useConceptLoading,
  useConceptError,
} from '@/stores';
import { useAIConceptGeneration } from '../../LLM/hooks/useAIConceptGeneration';

export function useConceptData(audienceId?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Get concepts from store using atomic selectors
  const getConcepts = useGetConcepts();
  const addConcepts = useAddConcepts();
  const hasConcepts = useHasConcepts();
  const hasMoreConcepts = useHasMoreConcepts();
  const isLoadingMoreConcepts = useIsLoadingMoreConcepts();
  const loadConcepts = useLoadConcepts();
  const loadMoreConcepts = useLoadMoreConcepts();
  const getTotalReach = useGetTotalReach();
  const getAverageEngagement = useGetAverageEngagement();
  const storeLoading = useConceptLoading();
  const storeError = useConceptError();

  // AI concept generation hook
  const {
    generateConcept: generateAIConcept,
    isLoading: aiLoading,
    error: aiError,
    isConfigured,
  } = useAIConceptGeneration({
    fallbackToMock: true,
  });

  const concepts = audienceId ? getConcepts(audienceId) : [];

  // Load concepts for an audience (lazy loading)
  const loadConceptsForAudience = useCallback(
    async (targetAudienceId: string) => {
      try {
        await loadConcepts(targetAudienceId, 1, 10);
      } catch (error) {
        console.error('Failed to load concepts for audience:', error);
      }
    },
    [loadConcepts]
  );

  // Load more concepts for pagination
  const loadMoreConceptsForAudience = useCallback(
    async (targetAudienceId: string) => {
      try {
        await loadMoreConcepts(targetAudienceId);
      } catch (error) {
        console.error('Failed to load more concepts:', error);
      }
    },
    [loadMoreConcepts]
  );

  const generateConcepts = useCallback(
    async (
      audienceData: DemographicSelectionData,
      count: number = 1,
      targetAudienceId?: string
    ): Promise<ConceptGenerationResult> => {
      setIsLoading(true);
      setError(null);
      setValidationErrors([]);

      try {
        // Validate audience data
        const validation = validateAudienceData(audienceData);
        if (!validation.isValid) {
          setValidationErrors(validation.errors);
          return { success: false, concepts: [], error: 'Validation failed' };
        }

        let generatedConcepts: Concept[] = [];

        if (isConfigured) {
          // Use AI generation for single concept
          try {
            const aiConcept = await generateAIConcept(audienceData);
            generatedConcepts = [aiConcept];
          } catch (aiErr) {
            console.warn('AI generation failed, falling back to mock:', aiErr);
            // Fallback to mock generation
            const mockConcepts = generateMockConcepts(audienceData, 1);
            generatedConcepts = mockConcepts;
          }
        } else {
          // Use mock generation when OpenRouter not configured
          const mockConcepts = generateMockConcepts(audienceData, count);
          generatedConcepts = mockConcepts;
        }

        // Store concepts in the concept store if audienceId is provided
        if (targetAudienceId) {
          addConcepts(targetAudienceId, generatedConcepts);
        }

        return { success: true, concepts: generatedConcepts };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate concepts';
        setError(errorMessage);
        return { success: false, concepts: [], error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [addConcepts, isConfigured, generateAIConcept]
  );


  // Calculate metrics for the current audience
  const totalReach = audienceId ? getTotalReach(audienceId) : 0;
  const avgEngagement = audienceId ? getAverageEngagement(audienceId) : 0;

  return {
    concepts,
    isLoading: isLoading || aiLoading || storeLoading,
    error: error || aiError || storeError,
    validationErrors,
    generateConcepts,
    loadConceptsForAudience,
    loadMoreConceptsForAudience,
    hasConcepts: audienceId ? hasConcepts(audienceId) : false,
    hasMoreConcepts: audienceId ? hasMoreConcepts(audienceId) : false,
    isLoadingMoreConcepts: audienceId
      ? isLoadingMoreConcepts(audienceId)
      : false,
    totalReach,
    avgEngagement,
    isAIConfigured: isConfigured,
  };
}
