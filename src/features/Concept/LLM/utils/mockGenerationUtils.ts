/**
 * Mock concept generation utility functions
 */

import { Concept } from '../../UI/types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';

/**
 * Available concept categories for mock generation
 */
export const CONCEPT_CATEGORIES = [
  'Brand Awareness',
  'Product Launch',
  'Seasonal Campaign',
  'Social Media',
  'Email Marketing',
  'Content Marketing',
  'Influencer Partnership',
  'Health & Wellness',
  'Tech Innovation',
  'Educational Content',
  'Interest-Based Marketing',
  'Professional Development',
] as const;

/**
 * Generate a unique concept ID
 */
export function generateConceptId(): string {
  return `concept-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate target audience description from demographic data
 */
export function generateTargetAudienceDescription(
  audienceData: DemographicSelectionData
): string {
  return `${audienceData.age} ${audienceData.profession}s in ${audienceData.location} with ${audienceData.income} income and ${audienceData.education} education, interested in ${audienceData.interests.join(', ')}`;
}

/**
 * Generate mock concept based on audience data
 */
export function generateMockConcept(audienceData: DemographicSelectionData): Concept {
  const category = CONCEPT_CATEGORIES[Math.floor(Math.random() * CONCEPT_CATEGORIES.length)];

  return {
    id: generateConceptId(),
    title: `AI-Generated ${category} Campaign for ${audienceData.profession}s`,
    description: `A targeted ${category.toLowerCase()} campaign designed specifically for ${audienceData.age} ${audienceData.profession}s in ${audienceData.location}. This concept leverages insights from your audience's ${audienceData.interests[0]} interests to create engaging content that resonates with your ${audienceData.income} income segment.`,
    category,
    targetAudience: generateTargetAudienceDescription(audienceData),
    keyMessage: `Discover how our solution can enhance your ${audienceData.profession} journey and connect with your interests in ${audienceData.interests[0]}.`,
    visualElements: [
      'Professional lifestyle imagery',
      'Clear value proposition',
      'Audience-specific messaging',
      'Compelling call-to-action',
    ],
    callToAction: 'Learn More',
    estimatedReach: Math.floor(Math.random() * 50000) + 10000,
    estimatedEngagement: Math.floor(Math.random() * 15) + 8,
    createdAt: new Date(),
  };
}

/**
 * Generate multiple mock concepts
 */
export function generateMockConcepts(
  audienceData: DemographicSelectionData,
  count: number = 1
): Concept[] {
  const concepts: Concept[] = [];
  
  for (let i = 0; i < count; i++) {
    concepts.push(generateMockConcept(audienceData));
  }
  
  return concepts;
}

/**
 * Generate mock remix concept based on original concept and audience data
 */
export function generateMockRemixConcept(
  originalConcept: Concept,
  audienceData: DemographicSelectionData
): Concept {
  // Create a remix by modifying elements of the original concept
  const remixVariations = [
    { title: `Remix: ${originalConcept.title}`, description: `A fresh take on ${originalConcept.title.toLowerCase()}. ${originalConcept.description}` },
    { title: `Enhanced ${originalConcept.title}`, description: `Building on the success of ${originalConcept.title.toLowerCase()}, this enhanced version offers new perspectives. ${originalConcept.description}` },
    { title: `Next Gen ${originalConcept.title}`, description: `The next evolution of ${originalConcept.title.toLowerCase()}. ${originalConcept.description}` },
    { title: `Reimagined ${originalConcept.title}`, description: `A creative reimagining of ${originalConcept.title.toLowerCase()} with innovative approaches. ${originalConcept.description}` },
  ];

  const variation = remixVariations[Math.floor(Math.random() * remixVariations.length)];

  return {
    id: generateConceptId(),
    title: variation.title,
    description: variation.description,
    category: originalConcept.category,
    targetAudience: generateTargetAudienceDescription(audienceData),
    keyMessage: originalConcept.keyMessage,
    visualElements: [...originalConcept.visualElements, 'Updated Design Elements'],
    callToAction: originalConcept.callToAction,
    estimatedReach: Math.floor(originalConcept.estimatedReach * (0.8 + Math.random() * 0.4)), // ±20% variation
    estimatedEngagement: Math.floor(originalConcept.estimatedEngagement * (0.9 + Math.random() * 0.2)), // ±10% variation
    createdAt: new Date(),
  };
}
