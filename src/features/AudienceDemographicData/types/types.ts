// Demographic selection types
export interface DemographicSelectionData {
  age: string;
  profession: string;
  location: string;
  interests: string[];
  income: string;
  education: string;
}

// Audience data types
export interface AudienceData {
  preferences: {
    contentTypes: string[];
    communicationStyle: string[];
    brandValues: string[];
    mediaChannels: string[];
  };
  insights: {
    keyCharacteristics: string[];
    painPoints: string[];
    motivations: string[];
    behaviors: string[];
  };
  statistics: {
    engagementRate: number;
    conversionRate: number;
    averageSpend: number;
    brandLoyalty: number;
  };
}

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Demographic summary type
export interface DemographicSummary {
  age: string;
  profession: string;
  location: string;
  interests: string;
  income: string;
  education: string;
}

// Demographic variables type
export interface DemographicVariables {
  age: string[];
  profession: string[];
  location: string[];
  interests: string[];
  income: string[];
  education: string[];
}
