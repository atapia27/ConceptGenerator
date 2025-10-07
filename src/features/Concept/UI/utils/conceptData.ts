/**
 * Concept data utility functions
 */

import { Concept, ConceptGenerationResult } from '../types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate audience data for concept generation
 */
export function validateAudienceData(audienceData: DemographicSelectionData): ValidationResult {
  const errors: string[] = [];

  if (!audienceData.age) errors.push('Age is required');
  if (!audienceData.profession) errors.push('Profession is required');
  if (!audienceData.location) errors.push('Location is required');
  if (!audienceData.interests || audienceData.interests.length === 0) {
    errors.push('At least one interest is required');
  }
  if (!audienceData.income) errors.push('Income level is required');
  if (!audienceData.education) errors.push('Education level is required');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate mock concepts for testing/demo purposes
 */
export function generateMockConcepts(
  audienceData: DemographicSelectionData,
  count: number = 1
): Concept[] {
  const concepts: Concept[] = [];
  
  for (let i = 0; i < count; i++) {
    const concept: Concept = {
      id: `mock-concept-${Date.now()}-${i}`,
      title: `Concept for ${audienceData.profession} in ${audienceData.location}`,
      description: `A targeted concept designed for ${audienceData.age} ${audienceData.profession}s living in ${audienceData.location}. This concept leverages their interests in ${audienceData.interests.slice(0, 2).join(' and ')} to create engaging content.`,
      category: 'Marketing Campaign',
      targetAudience: `${audienceData.age} ${audienceData.profession}s in ${audienceData.location}`,
      keyMessage: `Connect with ${audienceData.interests[0]} enthusiasts`,
      visualElements: ['Modern Design', 'Bold Typography', 'Vibrant Colors'],
      callToAction: 'Learn More',
      estimatedReach: Math.floor(Math.random() * 10000) + 1000,
      estimatedEngagement: Math.floor(Math.random() * 20) + 5,
      createdAt: new Date(),
    };
    concepts.push(concept);
  }
  
  return concepts;
}

/**
 * Create a successful concept generation result
 */
export function createSuccessResult(concepts: Concept[]): ConceptGenerationResult {
  return {
    success: true,
    concepts,
  };
}

/**
 * Create a failed concept generation result
 */
export function createErrorResult(error: string): ConceptGenerationResult {
  return {
    success: false,
    concepts: [],
    error,
  };
}