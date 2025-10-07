'use client';

import { useState, useCallback } from 'react';
import { Concept, ConceptGenerationResult } from '../types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { useConceptRemix as useLLMConceptRemix } from '../../LLM/hooks/useConceptRemix';
import { validateAudienceData, createSuccessResult, createErrorResult } from '../utils/conceptData';

export interface UseConceptRemixOptions {
  addConceptsAction: (audienceId: string, concepts: Concept[]) => void;
}

export interface UseConceptRemixReturn {
  remixConcept: (
    originalConcept: Concept,
    audienceData: DemographicSelectionData,
    targetAudienceId?: string
  ) => Promise<ConceptGenerationResult>;
  isLoading: boolean;
  error: string | null;
  validationErrors: string[];
  isAIConfigured: boolean;
}

/**
 * Custom hook for managing concept remix logic in UI layer
 */
export function useConceptRemix({
  addConceptsAction,
}: UseConceptRemixOptions): UseConceptRemixReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // LLM remix hook
  const {
    remixConcept: remixLLMConcept,
    isLoading: llmLoading,
    error: llmError,
    isConfigured,
  } = useLLMConceptRemix({
    fallbackToMock: true,
  });

  const remixConcept = useCallback(
    async (
      originalConcept: Concept,
      audienceData: DemographicSelectionData,
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
          return createErrorResult('Validation failed');
        }

        // Generate remix concept using LLM hook
        const remixConcept = await remixLLMConcept(originalConcept, audienceData);

        // Store remix concept in the concept store if audienceId is provided
        if (targetAudienceId) {
          addConceptsAction(targetAudienceId, [remixConcept]);
        }

        return createSuccessResult([remixConcept]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to remix concept';
        setError(errorMessage);
        return createErrorResult(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [addConceptsAction, remixLLMConcept]
  );

  return {
    remixConcept,
    isLoading: isLoading || llmLoading,
    error: error || llmError,
    validationErrors,
    isAIConfigured: isConfigured,
  };
}
