'use client';

import { useCallback } from 'react';
import { Concept } from '../types/types';

export interface UseConceptUpdatesOptions {
  selectedAudienceId: string | null;
  updateConceptAction: (audienceId: string, conceptId: string, concept: Concept) => Promise<void>;
}

export interface UseConceptUpdatesReturn {
  updateConceptData: (updatedConcept: Concept) => Promise<void>;
}

/**
 * Custom hook for managing concept updates
 */
export function useConceptUpdates({
  selectedAudienceId,
  updateConceptAction,
}: UseConceptUpdatesOptions): UseConceptUpdatesReturn {
  const updateConceptData = useCallback(
    async (updatedConcept: Concept) => {
      if (selectedAudienceId) {
        try {
          await updateConceptAction(
            selectedAudienceId,
            updatedConcept.id,
            updatedConcept
          );
        } catch (error) {
          console.error('Failed to update concept:', error);
        }
      }
    },
    [selectedAudienceId, updateConceptAction]
  );

  return {
    updateConceptData,
  };
}
