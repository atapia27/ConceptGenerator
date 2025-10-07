/**
 * Remix utility functions for concept remixing
 */

import { Concept } from '../../UI/types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { generateMockRemixConcept } from './mockGenerationUtils';
import { parseAIResponse } from './conceptParsingUtils';
import { generateConceptId, generateTargetAudienceDescription } from './mockGenerationUtils';

/**
 * Create a remix concept from AI response
 */
export function createRemixConceptFromAIResponse(
  aiResponse: string,
  originalConcept: Concept,
  audienceData: DemographicSelectionData
): Concept {
  // Parse the AI response
  const conceptData = parseAIResponse(aiResponse);

  // Create remix concept object
  const remixConcept: Concept = {
    id: generateConceptId(),
    title: conceptData.title,
    description: conceptData.description,
    category: conceptData.category,
    targetAudience: generateTargetAudienceDescription(audienceData),
    keyMessage: conceptData.keyMessage,
    visualElements: conceptData.visualElements,
    callToAction: conceptData.callToAction,
    estimatedReach: conceptData.estimatedReach,
    estimatedEngagement: conceptData.estimatedEngagement,
    createdAt: new Date(),
  };

  return remixConcept;
}

/**
 * Create a remix concept with fallback to mock generation
 */
export function createRemixConceptWithFallback(
  originalConcept: Concept,
  audienceData: DemographicSelectionData,
  aiResponse?: string
): Concept {
  if (aiResponse) {
    try {
      return createRemixConceptFromAIResponse(aiResponse, originalConcept, audienceData);
    } catch (error) {
      console.warn('Failed to parse AI remix response, falling back to mock:', error);
    }
  }

  // Fallback to mock remix generation
  return generateMockRemixConcept(originalConcept, audienceData);
}

/**
 * Validate remix concept data
 */
export function validateRemixConcept(concept: Concept, originalConcept: Concept): boolean {
  // Basic concept validation
  if (!concept.title || !concept.description || !concept.keyMessage) {
    return false;
  }

  // Ensure it's different from the original
  if (concept.title === originalConcept.title && concept.description === originalConcept.description) {
    return false;
  }

  return true;
}

/**
 * Get remix concept variations for mock generation
 */
export function getRemixVariations(originalTitle: string): Array<{ title: string; description: string }> {
  return [
    { 
      title: `Remix: ${originalTitle}`, 
      description: `A fresh take on ${originalTitle.toLowerCase()}.` 
    },
    { 
      title: `Enhanced ${originalTitle}`, 
      description: `Building on the success of ${originalTitle.toLowerCase()}, this enhanced version offers new perspectives.` 
    },
    { 
      title: `Next Gen ${originalTitle}`, 
      description: `The next evolution of ${originalTitle.toLowerCase()}.` 
    },
    { 
      title: `Reimagined ${originalTitle}`, 
      description: `A creative reimagining of ${originalTitle.toLowerCase()} with innovative approaches.` 
    },
  ];
}
