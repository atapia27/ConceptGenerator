'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';
import { SelectionField } from './SelectionField';
import { DEMOGRAPHIC_VARIABLES } from '../../utils/demographicData';
import { DemographicSelectionData } from '../../types/types';

interface DemographicSelectionProps {
  selections: DemographicSelectionData;
  isLoading: boolean;
  onSelectionChangeAction: (
    variable: keyof DemographicSelectionData,
    value: string | string[]
  ) => void;
  onRandomizeAction: () => void;
}

export function DemographicSelection({
  selections,
  isLoading,
  onSelectionChangeAction,
  onRandomizeAction,
}: DemographicSelectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {' '}
          New Audience - Demographic Selection
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {' '}
          Select demographic variables to build your audience profile{' '}
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Selection Field List */}
        <div className="space-y-6">
          {/* First row - Age, Profession, Location */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SelectionField
              label="Age Group"
              variable="age"
              options={DEMOGRAPHIC_VARIABLES.age}
              value={selections.age}
              onChangeAction={(value) => onSelectionChangeAction('age', value)}
            />

            <SelectionField
              label="Profession"
              variable="profession"
              options={DEMOGRAPHIC_VARIABLES.profession}
              value={selections.profession}
              onChangeAction={(value) =>
                onSelectionChangeAction('profession', value)
              }
            />

            <SelectionField
              label="Location"
              variable="location"
              options={DEMOGRAPHIC_VARIABLES.location}
              value={selections.location}
              onChangeAction={(value) =>
                onSelectionChangeAction('location', value)
              }
            />
          </div>

          {/* Second row - Income, Education */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SelectionField
              label="Income Level"
              variable="income"
              options={DEMOGRAPHIC_VARIABLES.income}
              value={selections.income}
              onChangeAction={(value) =>
                onSelectionChangeAction('income', value)
              }
            />

            <SelectionField
              label="Education Level"
              variable="education"
              options={DEMOGRAPHIC_VARIABLES.education}
              value={selections.education}
              onChangeAction={(value) =>
                onSelectionChangeAction('education', value)
              }
            />
          </div>

          {/* Third row - Interests (full width) */}
          <div>
            <SelectionField
              label="Interests"
              variable="interests"
              options={DEMOGRAPHIC_VARIABLES.interests}
              value={selections.interests}
              onChangeAction={(value) =>
                onSelectionChangeAction('interests', value)
              }
              multiple
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-end">
          <Button
            variant="secondary"
            size="sm"
            color="gray"
            onClick={onRandomizeAction}
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faShuffle} className="h-4 w-4" />
              <span>Randomize</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
