/**
 * Audience comparison utility functions
 */

import { DemographicSelectionData } from '../types/types';

/**
 * Check if two audience objects are identical
 */
export function areAudiencesEqual(
  audience1: DemographicSelectionData,
  audience2: DemographicSelectionData
): boolean {
  // Add null/undefined checks
  if (!audience1 || !audience2) return false;

  // Helper function to safely compare arrays
  const compareArrays = (
    arr1: string[] | undefined,
    arr2: string[] | undefined
  ): boolean => {
    if (!arr1 && !arr2) return true;
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;

    // Sort and compare
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.every((item, index) => item === sorted2[index]);
  };

  const isEqual = (
    audience1.age === audience2.age &&
    audience1.profession === audience2.profession &&
    audience1.location === audience2.location &&
    audience1.income === audience2.income &&
    audience1.education === audience2.education &&
    compareArrays(audience1.interests, audience2.interests)
  );


  return isEqual;
}

/**
 * Find differences between two audience objects
 */
export function getAudienceDifferences(
  audience1: DemographicSelectionData,
  audience2: DemographicSelectionData
): Record<string, { from: string | string[]; to: string | string[] }> {
  const differences: Record<string, { from: string | string[]; to: string | string[] }> = {};

  const fields: (keyof DemographicSelectionData)[] = [
    'age',
    'profession',
    'location',
    'income',
    'education',
    'interests',
  ];

  fields.forEach((field) => {
    if (field === 'interests') {
      // Special handling for interests array
      const arr1 = audience1.interests || [];
      const arr2 = audience2.interests || [];
      const sorted1 = [...arr1].sort();
      const sorted2 = [...arr2].sort();
      
      if (JSON.stringify(sorted1) !== JSON.stringify(sorted2)) {
        differences[field] = { from: arr1, to: arr2 };
      }
    } else {
      const val1 = audience1[field];
      const val2 = audience2[field];
      
      if (val1 !== val2) {
        differences[field] = { from: val1, to: val2 };
      }
    }
  });

  return differences;
}

/**
 * Check if an audience has any selections
 */
export function hasAudienceSelections(selections: DemographicSelectionData): boolean {
  return Object.values(selections).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== ''
  );
}

/**
 * Get the number of completed fields in an audience
 */
export function getCompletedFieldsCount(selections: DemographicSelectionData): number {
  let count = 0;
  
  if (selections.age) count++;
  if (selections.profession) count++;
  if (selections.location) count++;
  if (selections.interests && selections.interests.length > 0) count++;
  if (selections.income) count++;
  if (selections.education) count++;
  
  return count;
}

/**
 * Get completion percentage for an audience
 */
export function getAudienceCompletionPercentage(selections: DemographicSelectionData): number {
  const totalFields = 6; // age, profession, location, interests, income, education
  const completedFields = getCompletedFieldsCount(selections);
  return Math.round((completedFields / totalFields) * 100);
}
