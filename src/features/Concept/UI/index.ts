// Main exports for Concept UI feature

// Shared utilities and types
export { useConceptData } from './hooks/useConceptData';
export {
  generateMockConcepts,
  validateAudienceData,
} from './utils/conceptData';
export type {
  Concept,
  ConceptGenerationResult,
  ConceptValidationResult,
} from './types/types';

// Main Concept Page
export { ConceptPage } from './ConceptPage';
export * from './components';
