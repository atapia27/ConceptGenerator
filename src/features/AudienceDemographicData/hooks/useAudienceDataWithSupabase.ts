'use client';

import { useState, useCallback } from 'react';
import {
  generateMockAudienceData,
  validateDemographicSelections,
} from '../utils/demographicData';
import { AudienceData, DemographicSelectionData } from '../types/types';
import { useSyncWithSupabase } from '@/stores';

interface UseAudienceDataWithSupabaseReturn {
  audienceData: AudienceData | null;
  isLoading: boolean;
  error: string | null;
  generateAudienceData: (selections: DemographicSelectionData) => Promise<void>;
  clearAudienceData: () => void;
  validationErrors: string[];
}

export function useAudienceDataWithSupabase(): UseAudienceDataWithSupabaseReturn {
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const syncWithSupabase = useSyncWithSupabase();

  const generateAudienceData = useCallback(
    async (selections: DemographicSelectionData) => {
      try {
        setIsLoading(true);
        setError(null);
        setValidationErrors([]);

        // Validate selections
        const validation = validateDemographicSelections(selections);
        if (!validation.isValid) {
          setValidationErrors(validation.errors);
          setIsLoading(false);
          return;
        }

        // Simulate API call delay (in real app, this would call an LLM API)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate mock data (in real app, this would call an LLM API)
        const generatedData = generateMockAudienceData(selections);

        setAudienceData(generatedData);

        // Sync with Supabase after generating data
        try {
          await syncWithSupabase();
        } catch (syncError) {
          console.warn('Failed to sync with Supabase:', syncError);
          // Don't fail the whole operation if sync fails
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to generate audience data'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [syncWithSupabase]
  );

  const clearAudienceData = useCallback(() => {
    setAudienceData(null);
    setError(null);
    setValidationErrors([]);
  }, []);

  return {
    audienceData,
    isLoading,
    error,
    generateAudienceData,
    clearAudienceData,
    validationErrors,
  };
}
