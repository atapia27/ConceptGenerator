'use client';

import React from 'react';

interface PreferencesProps {
  preferences: {
    contentTypes: string[];
    communicationStyle: string[];
    brandValues: string[];
    mediaChannels: string[];
  };
}

export function Preferences({ preferences }: PreferencesProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Audience Preferences
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Content and communication preferences
        </p>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-900">
            Content Types
          </h4>
          <div className="flex flex-wrap gap-2">
            {preferences.contentTypes.map((type, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-900">
            Communication Style
          </h4>
          <div className="flex flex-wrap gap-2">
            {preferences.communicationStyle.map((style, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-900">
            Brand Values
          </h4>
          <div className="flex flex-wrap gap-2">
            {preferences.brandValues.map((value, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-900">
            Media Channels
          </h4>
          <div className="flex flex-wrap gap-2">
            {preferences.mediaChannels.map((channel, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
