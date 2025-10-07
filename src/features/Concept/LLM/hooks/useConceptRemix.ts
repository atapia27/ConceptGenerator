'use client';

import { useState, useCallback } from 'react';
import { Concept } from '../../UI/types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { OpenRouterService } from '../services/openRouterService';
import { createRemixConceptWithFallback } from '../utils/remixUtils';
import { isOpenRouterConfigured } from '../config/openRouterConfig';

export interface UseConceptRemixOptions {
  fallbackToMock?: boolean;
}

export interface UseConceptRemixReturn {
  remixConcept: (originalConcept: Concept, audienceData: DemographicSelectionData) => Promise<Concept>;
  isLoading: boolean;
  error: string | null;
  isConfigured: boolean;
}

/**
 * Custom hook for concept remixing functionality
 */
export function useConceptRemix(
  options: UseConceptRemixOptions = {}
): UseConceptRemixReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = isOpenRouterConfigured();

  const remixConcept = useCallback(
    async (originalConcept: Concept, audienceData: DemographicSelectionData): Promise<Concept> => {
      setIsLoading(true);
      setError(null);

      try {
        if (isConfigured) {
          // Try AI remix generation
          try {
            const openRouterService = new OpenRouterService();
            const aiResponse = await openRouterService.remixConcept(originalConcept, audienceData);
            return createRemixConceptWithFallback(originalConcept, audienceData, aiResponse);
          } catch (aiError) {
            console.warn('AI remix failed, falling back to mock:', aiError);
            
            if (options.fallbackToMock) {
              return createRemixConceptWithFallback(originalConcept, audienceData);
            }
            
            throw aiError;
          }
        } else {
          // Use mock remix generation when OpenRouter not configured
          console.log('OpenRouter not configured, using mock concept remix');
          return createRemixConceptWithFallback(originalConcept, audienceData);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to remix concept';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isConfigured, options.fallbackToMock]
  );

  return {
    remixConcept,
    isLoading,
    error,
    isConfigured,
  };
}
