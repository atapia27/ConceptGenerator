// Main exports for AudienceDemographicData feature
export { AudienceDemographicDataPage } from './components';
export type { DemographicSelection } from './components';
export { useAudienceDataWithSupabase } from './hooks/useAudienceDataWithSupabase';
export {
  DEMOGRAPHIC_VARIABLES,
  generateMockAudienceData,
  validateDemographicSelections,
} from './utils/demographicData';
