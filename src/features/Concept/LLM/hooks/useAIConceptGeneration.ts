'use client';

import { useState, useCallback } from 'react';
import { ConceptGenerationService } from '../services/conceptGenerationService';
import { Concept } from '../../UI/types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { useAIConfiguration } from './useAIConfiguration';

export interface UseAIConceptGenerationOptions {
  fallbackToMock?: boolean;
}

export function useAIConceptGeneration(
  options: UseAIConceptGenerationOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConfigured } = useAIConfiguration();

  const generateConcept = useCallback(
    async (audienceData: DemographicSelectionData): Promise<Concept> => {
      setIsLoading(true);
      setError(null);

      try {
        const service = new ConceptGenerationService({
          fallbackToMock: options.fallbackToMock,
        });

        const concept = await service.generateConcept(audienceData);
        return concept;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate concept';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [options.fallbackToMock]
  );

  return {
    generateConcept,
    isLoading,
    error,
    isConfigured,
  };
}
