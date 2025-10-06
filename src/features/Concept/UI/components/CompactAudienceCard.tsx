'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { SavedAudience } from '@/stores/audienceStore';

interface CompactAudienceCardProps {
  audience: SavedAudience;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CompactAudienceCard = React.memo(function CompactAudienceCard({
  audience,
  isSelected = false,
  onClick,
}: CompactAudienceCardProps) {
  const { data: selections } = audience;
  const hasSelections = Object.values(selections).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  if (!hasSelections) {
    return null;
  }

  const demographicItems = [
    { key: 'age', label: 'Age', value: selections.age, icon: '👥' },
    {
      key: 'profession',
      label: 'Profession',
      value: selections.profession,
      icon: '💼',
    },
    {
      key: 'location',
      label: 'Location',
      value: selections.location,
      icon: '📍',
    },
    { key: 'income', label: 'Income', value: selections.income, icon: '💰' },
    {
      key: 'education',
      label: 'Education',
      value: selections.education,
      icon: '🎓',
    },
  ].filter((item) => item.value);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg border bg-white p-4 transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {/* Header with audience name */}
      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="truncate text-sm font-medium text-gray-900">
            {audience.name}
          </h4>
          {isSelected && (
            <div className="ml-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
              <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Two-column demographic info */}
      <div className="grid grid-cols-2 gap-2">
        {demographicItems.map((item) => (
          <div key={item.key} className="flex items-center text-xs">
            <span className="mr-1.5 flex-shrink-0">{item.icon}</span>
            <span className="mr-1 truncate text-gray-600">{item.label}:</span>
            <span className="truncate font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Interests */}
      {selections.interests.length > 0 && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <div className="flex flex-wrap gap-1">
            {selections.interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
              >
                {interest}
              </span>
            ))}
            {selections.interests.length > 3 && (
              <span className="inline-flex items-center rounded bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
                +{selections.interests.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
