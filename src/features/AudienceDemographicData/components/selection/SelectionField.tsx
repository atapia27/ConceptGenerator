'use client';

import React from 'react';
import { twMerge } from 'tw-merge';

interface SelectionFieldProps {
  label: string;
  variable: string;
  options: string[];
  value: string | string[];
  onChangeAction: (value: string | string[]) => void;
  multiple?: boolean;
}

export function SelectionField({
  label,
  options,
  value,
  onChangeAction,
  multiple = false,
}: SelectionFieldProps) {
  const handleSingleSelect = (selectedValue: string) => {
    onChangeAction(selectedValue);
  };

  const handleMultipleSelect = (selectedValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(selectedValue)
      ? currentValues.filter((v) => v !== selectedValue)
      : [...currentValues, selectedValue];
    onChangeAction(newValues);
  };

  const handleChange = (selectedValue: string) => {
    if (multiple) {
      handleMultipleSelect(selectedValue);
    } else {
      handleSingleSelect(selectedValue);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">{label}</label>

      {multiple ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isSelected = Array.isArray(value) && value.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange(option)}
                  className={twMerge(
                    `inline-flex cursor-pointer items-center rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                        : 'border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <select
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => handleChange(e.target.value)}
          className="focus:ring-opacity-20 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
