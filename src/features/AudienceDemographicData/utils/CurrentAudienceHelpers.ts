import { DemographicSelectionData } from '../types/types';

// Function to check if two audience objects are identical
export const areAudiencesEqual = (
  audience1: DemographicSelectionData,
  audience2: DemographicSelectionData
): boolean => {
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

  return (
    audience1.age === audience2.age &&
    audience1.profession === audience2.profession &&
    audience1.location === audience2.location &&
    audience1.income === audience2.income &&
    audience1.education === audience2.education &&
    compareArrays(audience1.interests, audience2.interests)
  );
};
