'use client';

import { useCallback } from 'react';
import { Concept } from '../types/types';
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

export interface UseConceptStoreOptions {
  audienceId?: string;
}

export interface UseConceptStoreReturn {
  concepts: Concept[];
  hasConcepts: boolean;
  hasMoreConcepts: boolean;
  isLoadingMoreConcepts: boolean;
  totalReach: number;
  avgEngagement: number;
  storeLoading: boolean;
  storeError: string | null;
  loadConceptsForAudience: (audienceId: string) => Promise<void>;
  loadMoreConceptsForAudience: (audienceId: string) => Promise<void>;
  addConcepts: (audienceId: string, concepts: Concept[]) => void;
}

/**
 * Custom hook for managing concept store interactions
 */
export function useConceptStore({ audienceId }: UseConceptStoreOptions = {}): UseConceptStoreReturn {
  // Store selectors
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

  // Get concepts for the current audience
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

  // Calculate metrics for the current audience
  const totalReach = audienceId ? getTotalReach(audienceId) : 0;
  const avgEngagement = audienceId ? getAverageEngagement(audienceId) : 0;

  return {
    concepts,
    hasConcepts: audienceId ? hasConcepts(audienceId) : false,
    hasMoreConcepts: audienceId ? hasMoreConcepts(audienceId) : false,
    isLoadingMoreConcepts: audienceId ? isLoadingMoreConcepts(audienceId) : false,
    totalReach,
    avgEngagement,
    storeLoading,
    storeError,
    loadConceptsForAudience,
    loadMoreConceptsForAudience,
    addConcepts,
  };
}
