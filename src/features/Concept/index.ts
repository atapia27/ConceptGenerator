// Main exports for Concept feature

// UI exports
export { ConceptPage } from './UI/ConceptPage';
export { useConceptData } from './UI/hooks/useConceptData';
export { validateAudienceData } from './UI/utils/conceptData';
export type { Concept, ConceptGenerationResult, ConceptValidationResult } from './UI/types/types';
export * from './UI/components';

// LLM exports
export { OpenRouterService, ConceptGenerationService } from './LLM/services';
export { useAIConceptGeneration, useAIConfiguration, useConceptParsing, useConceptRemix } from './LLM/hooks';
export { getOpenRouterConfig, isOpenRouterConfigured } from './LLM/config';
export { generateMockConcepts, generateMockRemixConcept } from './LLM/utils/mockGenerationUtils';
export type { OpenRouterMessage, OpenRouterResponse } from './LLM/services/openRouterService';
export type { ConceptGenerationOptions, AIConceptResponse } from './LLM/services/conceptGenerationService';
export type { UseConceptRemixOptions, UseConceptRemixReturn } from './LLM/hooks/useConceptRemix';
