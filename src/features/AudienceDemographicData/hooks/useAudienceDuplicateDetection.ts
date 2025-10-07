'use client';

import { useMemo } from 'react';
import { DemographicSelectionData } from '../types/types';
import { SavedAudience } from '@/stores/audienceStore';
import { 
  getCurrentAudienceName, 
  isAudienceDuplicate, 
  findMatchingSavedAudience 
} from '../utils/audienceNameUtils';

export interface UseAudienceDuplicateDetectionOptions {
  selections: DemographicSelectionData;
  audiences: SavedAudience[];
}

export interface UseAudienceDuplicateDetectionReturn {
  currentAudienceName: string | null;
  isDuplicate: boolean;
  matchingAudience: SavedAudience | null;
}

/**
 * Custom hook for audience duplicate detection and name resolution
 */
export function useAudienceDuplicateDetection({
  selections,
  audiences,
}: UseAudienceDuplicateDetectionOptions): UseAudienceDuplicateDetectionReturn {
  const currentAudienceName = useMemo(() => {
    return getCurrentAudienceName(selections, audiences);
  }, [selections, audiences]);

  const isDuplicate = useMemo(() => {
    return isAudienceDuplicate(selections, audiences);
  }, [selections, audiences]);

  const matchingAudience = useMemo(() => {
    return findMatchingSavedAudience(selections, audiences);
  }, [selections, audiences]);

  return {
    currentAudienceName,
    isDuplicate,
    matchingAudience,
  };
}
