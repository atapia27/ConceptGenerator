'use client';

import { useState, useCallback } from 'react';
import { Concept, ConceptGenerationResult } from '../types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { 
  validateAudienceData, 
  generateMockConcepts, 
  createSuccessResult, 
  createErrorResult 
} from '../utils/conceptData';
import { useAIConceptGeneration } from '../../LLM/hooks/useAIConceptGeneration';
import { useConceptRemix } from './useConceptRemix';

export interface UseConceptGenerationLogicOptions {
  addConceptsAction: (audienceId: string, concepts: Concept[]) => void;
}

export interface UseConceptGenerationLogicReturn {
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
  isLoading: boolean;
  error: string | null;
  validationErrors: string[];
  isAIConfigured: boolean;
}

/**
 * Custom hook for managing concept generation logic
 */
export function useConceptGenerationLogic({
  addConceptsAction,
}: UseConceptGenerationLogicOptions): UseConceptGenerationLogicReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // AI concept generation hook
  const {
    generateConcept: generateAIConcept,
    isLoading: aiLoading,
    error: aiError,
    isConfigured,
  } = useAIConceptGeneration({
    fallbackToMock: true,
  });

  // Remix hook
  const {
    remixConcept: remixConceptLogic,
    isLoading: remixLoading,
    error: remixError,
    validationErrors: remixValidationErrors,
    isAIConfigured: remixIsConfigured,
  } = useConceptRemix({
    addConceptsAction,
  });

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
          return createErrorResult('Validation failed');
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
          addConceptsAction(targetAudienceId, generatedConcepts);
        }

        return createSuccessResult(generatedConcepts);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate concepts';
        setError(errorMessage);
        return createErrorResult(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [addConceptsAction, isConfigured, generateAIConcept]
  );

  const remixConcept = useCallback(
    async (
      originalConcept: Concept,
      audienceData: DemographicSelectionData,
      targetAudienceId?: string
    ): Promise<ConceptGenerationResult> => {
      // Use the dedicated remix hook
      return remixConceptLogic(originalConcept, audienceData, targetAudienceId);
    },
    [remixConceptLogic]
  );

  return {
    generateConcepts,
    remixConcept,
    isLoading: isLoading || aiLoading || remixLoading,
    error: error || aiError || remixError,
    validationErrors: [...validationErrors, ...remixValidationErrors],
    isAIConfigured: isConfigured || remixIsConfigured,
  };
}
