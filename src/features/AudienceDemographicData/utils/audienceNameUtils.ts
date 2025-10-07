/**
 * Audience name utility functions
 */

import { DemographicSelectionData } from '../types/types';
import { SavedAudience } from '@/stores/audienceStore';
import { areAudiencesEqual } from './audienceComparison';

/**
 * Find the name of a saved audience that matches the current selections
 */
export function getCurrentAudienceName(
  selections: DemographicSelectionData,
  audiences: SavedAudience[]
): string | null {
  const savedAudience = audiences.find(
    (savedAudience) =>
      savedAudience &&
      savedAudience.data &&
      areAudiencesEqual(selections, savedAudience.data)
  );
  return savedAudience ? savedAudience.name : null;
}

/**
 * Check if current selections already exist in saved audiences
 */
export function isAudienceDuplicate(
  selections: DemographicSelectionData,
  audiences: SavedAudience[]
): boolean {
  return audiences.some(
    (savedAudience) =>
      savedAudience &&
      savedAudience.data &&
      areAudiencesEqual(selections, savedAudience.data)
  );
}

/**
 * Find the saved audience that matches the current selections
 */
export function findMatchingSavedAudience(
  selections: DemographicSelectionData,
  audiences: SavedAudience[]
): SavedAudience | null {
  return audiences.find(
    (savedAudience) =>
      savedAudience &&
      savedAudience.data &&
      areAudiencesEqual(selections, savedAudience.data)
  ) || null;
}
