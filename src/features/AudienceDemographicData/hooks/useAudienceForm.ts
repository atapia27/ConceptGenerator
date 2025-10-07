'use client';

import { useState, useCallback } from 'react';
import { DemographicSelectionData } from '../types/types';
import { createEmptySelections, sanitizeAudienceData, generateRandomSelections } from '../utils/audienceDataUtils';
import { DEMOGRAPHIC_VARIABLES } from '../utils/demographicData';

export interface UseAudienceFormOptions {
  initialSelections?: DemographicSelectionData;
  onSelectionsChange?: (selections: DemographicSelectionData) => void;
}

export interface UseAudienceFormReturn {
  selections: DemographicSelectionData;
  updateSelection: (field: keyof DemographicSelectionData, value: string | string[]) => void;
  updateAllSelections: (newSelections: DemographicSelectionData) => void;
  resetSelections: () => void;
  randomizeSelections: () => void;
  clearSelections: () => void;
  sanitizeSelections: () => DemographicSelectionData;
}

/**
 * Custom hook for managing audience form state
 */
export function useAudienceForm({
  initialSelections,
  onSelectionsChange,
}: UseAudienceFormOptions = {}): UseAudienceFormReturn {
  const [selections, setSelections] = useState<DemographicSelectionData>(
    initialSelections || createEmptySelections()
  );

  const updateSelection = useCallback(
    (field: keyof DemographicSelectionData, value: string | string[]) => {
      const updatedSelections = {
        ...selections,
        [field]: value,
      };
      
      setSelections(updatedSelections);
      onSelectionsChange?.(updatedSelections);
    },
    [selections, onSelectionsChange]
  );

  const resetSelections = useCallback(() => {
    const emptySelections = createEmptySelections();
    setSelections(emptySelections);
    onSelectionsChange?.(emptySelections);
  }, [onSelectionsChange]);

  const randomizeSelections = useCallback(() => {
    const randomSelections = generateRandomSelections(DEMOGRAPHIC_VARIABLES);
    setSelections(randomSelections);
    onSelectionsChange?.(randomSelections);
  }, [onSelectionsChange]);

  const updateAllSelections = useCallback(
    (newSelections: DemographicSelectionData) => {
      setSelections(newSelections);
      onSelectionsChange?.(newSelections);
    },
    [onSelectionsChange]
  );

  const clearSelections = useCallback(() => {
    resetSelections();
  }, [resetSelections]);

  const sanitizeSelections = useCallback(() => {
    return sanitizeAudienceData(selections);
  }, [selections]);

  return {
    selections,
    updateSelection,
    updateAllSelections,
    resetSelections,
    randomizeSelections,
    clearSelections,
    sanitizeSelections,
  };
}
