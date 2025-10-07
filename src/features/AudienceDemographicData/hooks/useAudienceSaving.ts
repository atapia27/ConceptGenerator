'use client';

import { useState, useCallback } from 'react';
import { DemographicSelectionData } from '../types/types';
import { useAddAudience } from '@/stores';

export interface UseAudienceSavingOptions {
  selections: DemographicSelectionData;
}

export interface UseAudienceSavingReturn {
  isSaved: boolean;
  showModal: boolean;
  handleSaveAudience: () => void;
  handleSaveWithName: (name: string) => Promise<void>;
  closeModal: () => void;
}

/**
 * Custom hook for managing audience saving functionality
 */
export function useAudienceSaving({
  selections,
}: UseAudienceSavingOptions): UseAudienceSavingReturn {
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const addAudience = useAddAudience();

  const handleSaveAudience = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleSaveWithName = useCallback(
    async (name: string) => {
      try {
        await addAudience(selections, name);
        setIsSaved(true);
        setShowModal(false);
        // Reset the saved state after 2 seconds
        setTimeout(() => setIsSaved(false), 2000);
      } catch (error) {
        console.error('Failed to save audience:', error);
        // Handle error - could show a toast notification
        throw error; // Re-throw so the calling component can handle it
      }
    },
    [addAudience, selections]
  );

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    isSaved,
    showModal,
    handleSaveAudience,
    handleSaveWithName,
    closeModal,
  };
}
