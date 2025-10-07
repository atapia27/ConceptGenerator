/**
 * Audience validation utility functions
 */

import { DemographicSelectionData, ValidationResult } from '../types/types';

/**
 * Validate demographic selections for completeness
 */
export function validateDemographicSelections(
  selections: DemographicSelectionData
): ValidationResult {
  const errors: string[] = [];

  if (!selections.age) errors.push('Age group is required');
  if (!selections.profession) errors.push('Profession is required');
  if (!selections.location) errors.push('Location is required');
  if (!selections.interests || selections.interests.length === 0)
    errors.push('At least one interest is required');
  if (!selections.income) errors.push('Income level is required');
  if (!selections.education) errors.push('Education level is required');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if audience data is complete for generation
 */
export function isAudienceDataComplete(selections: DemographicSelectionData): boolean {
  return !!(
    selections.age &&
    selections.profession &&
    selections.location &&
    selections.interests &&
    selections.interests.length > 0 &&
    selections.income &&
    selections.education
  );
}

/**
 * Get validation error messages for specific fields
 */
export function getFieldValidationErrors(
  selections: DemographicSelectionData
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  if (!selections.age) errors.age = ['Age group is required'];
  if (!selections.profession) errors.profession = ['Profession is required'];
  if (!selections.location) errors.location = ['Location is required'];
  if (!selections.interests || selections.interests.length === 0) {
    errors.interests = ['At least one interest is required'];
  }
  if (!selections.income) errors.income = ['Income level is required'];
  if (!selections.education) errors.education = ['Education level is required'];

  return errors;
}

/**
 * Validate a single field
 */
export function validateField(
  field: keyof DemographicSelectionData,
  value: string | string[]
): string[] {
  const errors: string[] = [];

  switch (field) {
    case 'age':
    case 'profession':
    case 'location':
    case 'income':
    case 'education':
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors.push(`${field} is required`);
      }
      break;
    case 'interests':
      if (!Array.isArray(value) || value.length === 0) {
        errors.push('At least one interest is required');
      }
      break;
  }

  return errors;
}
