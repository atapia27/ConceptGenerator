'use client';

import { useMemo } from 'react';
import { DemographicSelectionData } from '../types/types';
import {
  areAudiencesEqual,
  getAudienceDifferences,
  hasAudienceSelections,
  getCompletedFieldsCount,
  getAudienceCompletionPercentage,
} from '../utils/audienceComparison';

export interface UseAudienceComparisonOptions {
  currentSelections: DemographicSelectionData;
  compareSelections?: DemographicSelectionData;
}

export interface UseAudienceComparisonReturn {
  hasSelections: boolean;
  completedFieldsCount: number;
  completionPercentage: number;
  isEqual: boolean;
  differences: Record<string, { from: string | string[]; to: string | string[] }>;
}

/**
 * Custom hook for audience comparison logic
 */
export function useAudienceComparison({
  currentSelections,
  compareSelections,
}: UseAudienceComparisonOptions): UseAudienceComparisonReturn {
  const hasSelections = useMemo(() => {
    return hasAudienceSelections(currentSelections);
  }, [currentSelections]);

  const completedFieldsCount = useMemo(() => {
    return getCompletedFieldsCount(currentSelections);
  }, [currentSelections]);

  const completionPercentage = useMemo(() => {
    return getAudienceCompletionPercentage(currentSelections);
  }, [currentSelections]);

  const isEqual = useMemo(() => {
    if (!compareSelections) return false;
    return areAudiencesEqual(currentSelections, compareSelections);
  }, [currentSelections, compareSelections]);

  const differences = useMemo(() => {
    if (!compareSelections) return {};
    return getAudienceDifferences(currentSelections, compareSelections);
  }, [currentSelections, compareSelections]);

  return {
    hasSelections,
    completedFieldsCount,
    completionPercentage,
    isEqual,
    differences,
  };
}
