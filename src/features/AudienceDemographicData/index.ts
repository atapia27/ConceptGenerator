// Main exports for AudienceDemographicData feature
export { AudienceDemographicDataPage } from './components';
export type { DemographicSelection } from './components';

// Hooks exports
export {
  useAudienceDataWithSupabase,
  useAudienceValidation,
  useAudienceComparison,
  useAudienceForm,
  useAudienceSaving,
  useAudienceDuplicateDetection,
} from './hooks';

// Utils exports
export {
  DEMOGRAPHIC_VARIABLES,
  generateMockAudienceData,
} from './utils/demographicData';
export {
  validateDemographicSelections,
  isAudienceDataComplete,
  getFieldValidationErrors,
  validateField,
} from './utils/audienceValidation';
export {
  areAudiencesEqual,
  getAudienceDifferences,
  hasAudienceSelections,
  getCompletedFieldsCount,
  getAudienceCompletionPercentage,
} from './utils/audienceComparison';
export {
  getRandomItem,
  getRandomItems,
  generateRandomSelections,
  createEmptySelections,
  createAudienceSummary,
  createAudienceDescription,
  sanitizeAudienceData,
  mergeAudienceData,
} from './utils/audienceDataUtils';
export {
  getCurrentAudienceName,
  isAudienceDuplicate,
  findMatchingSavedAudience,
} from './utils/audienceNameUtils';