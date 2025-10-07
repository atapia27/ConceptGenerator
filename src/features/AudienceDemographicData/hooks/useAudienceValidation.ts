'use client';

import { useMemo } from 'react';
import { DemographicSelectionData } from '../types/types';
import {
  validateDemographicSelections,
  isAudienceDataComplete,
  getFieldValidationErrors,
  validateField,
} from '../utils/audienceValidation';

export interface UseAudienceValidationOptions {
  selections: DemographicSelectionData;
}

export interface UseAudienceValidationReturn {
  isValid: boolean;
  errors: string[];
  fieldErrors: Record<string, string[]>;
  isComplete: boolean;
  validateField: (field: keyof DemographicSelectionData, value: string | string[]) => string[];
}

/**
 * Custom hook for audience validation logic
 */
export function useAudienceValidation({
  selections,
}: UseAudienceValidationOptions): UseAudienceValidationReturn {
  const validation = useMemo(() => {
    return validateDemographicSelections(selections);
  }, [selections]);

  const fieldErrors = useMemo(() => {
    return getFieldValidationErrors(selections);
  }, [selections]);

  const isComplete = useMemo(() => {
    return isAudienceDataComplete(selections);
  }, [selections]);

  const validateSingleField = useMemo(() => {
    return (field: keyof DemographicSelectionData, value: string | string[]) => {
      return validateField(field, value);
    };
  }, []);

  return {
    isValid: validation.isValid,
    errors: validation.errors,
    fieldErrors,
    isComplete,
    validateField: validateSingleField,
  };
}
