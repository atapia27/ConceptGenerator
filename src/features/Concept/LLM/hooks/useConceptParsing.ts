'use client';

import { useCallback } from 'react';
import { parseAIResponse, validateConceptData } from '../utils/conceptParsingUtils';
import { AIConceptResponse } from '../services/conceptGenerationService';

export interface UseConceptParsingReturn {
  parseAIResponse: (response: string) => AIConceptResponse;
  validateConceptData: (data: AIConceptResponse) => boolean;
}

/**
 * Custom hook for concept parsing operations
 */
export function useConceptParsing(): UseConceptParsingReturn {
  const parseResponse = useCallback((response: string): AIConceptResponse => {
    return parseAIResponse(response);
  }, []);

  const validateData = useCallback((data: AIConceptResponse): boolean => {
    return validateConceptData(data);
  }, []);

  return {
    parseAIResponse: parseResponse,
    validateConceptData: validateData,
  };
}
