// Shared types for Concept UI feature

export interface Concept {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  keyMessage: string;
  visualElements: string[];
  callToAction: string;
  estimatedReach: number;
  estimatedEngagement: number;
  createdAt: Date;
}

export interface ConceptGenerationResult {
  success: boolean;
  concepts: Concept[];
  error?: string;
}

export interface ConceptValidationResult {
  isValid: boolean;
  errors: string[];
}
