/**
 * Audience data utility functions
 */

import { DemographicSelectionData, DemographicVariables } from '../types/types';

/**
 * Get random item from an array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get random items from an array
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Generate random default selections
 */
export function generateRandomSelections(
  demographicVariables: DemographicVariables
): DemographicSelectionData {
  return {
    age: getRandomItem(demographicVariables.age),
    profession: getRandomItem(demographicVariables.profession),
    location: getRandomItem(demographicVariables.location),
    interests: getRandomItems(demographicVariables.interests, 3), // Select 3 random interests
    income: getRandomItem(demographicVariables.income),
    education: getRandomItem(demographicVariables.education),
  };
}

/**
 * Create empty audience selections
 */
export function createEmptySelections(): DemographicSelectionData {
  return {
    age: '',
    profession: '',
    location: '',
    interests: [],
    income: '',
    education: '',
  };
}

/**
 * Create audience summary string
 */
export function createAudienceSummary(selections: DemographicSelectionData): string {
  const parts: string[] = [];
  
  if (selections.age) parts.push(selections.age);
  if (selections.profession) parts.push(selections.profession);
  if (selections.location) parts.push(selections.location);
  
  return parts.join(' • ');
}

/**
 * Create detailed audience description
 */
export function createAudienceDescription(selections: DemographicSelectionData): string {
  const parts: string[] = [];
  
  if (selections.age) parts.push(`Age: ${selections.age}`);
  if (selections.profession) parts.push(`Profession: ${selections.profession}`);
  if (selections.location) parts.push(`Location: ${selections.location}`);
  if (selections.income) parts.push(`Income: ${selections.income}`);
  if (selections.education) parts.push(`Education: ${selections.education}`);
  if (selections.interests && selections.interests.length > 0) {
    parts.push(`Interests: ${selections.interests.join(', ')}`);
  }
  
  return parts.join('\n');
}

/**
 * Sanitize audience data (remove empty values)
 */
export function sanitizeAudienceData(selections: DemographicSelectionData): DemographicSelectionData {
  return {
    age: selections.age?.trim() || '',
    profession: selections.profession?.trim() || '',
    location: selections.location?.trim() || '',
    interests: selections.interests?.filter(interest => interest.trim()) || [],
    income: selections.income?.trim() || '',
    education: selections.education?.trim() || '',
  };
}

/**
 * Merge audience data (prefer non-empty values)
 */
export function mergeAudienceData(
  base: DemographicSelectionData,
  override: Partial<DemographicSelectionData>
): DemographicSelectionData {
  return {
    age: override.age || base.age,
    profession: override.profession || base.profession,
    location: override.location || base.location,
    interests: override.interests && override.interests.length > 0 ? override.interests : base.interests,
    income: override.income || base.income,
    education: override.education || base.education,
  };
}
