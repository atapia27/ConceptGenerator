'use client';

import React from 'react';
import { MetricsCard } from './MetricsCard';
import { Preferences } from './Preferences';
import { Insights } from './Insights';

interface AudienceData {
  preferences: {
    contentTypes: string[];
    communicationStyle: string[];
    brandValues: string[];
    mediaChannels: string[];
  };
  insights: {
    keyCharacteristics: string[];
    painPoints: string[];
    motivations: string[];
    behaviors: string[];
  };
  statistics: {
    engagementRate: number;
    conversionRate: number;
    averageSpend: number;
    brandLoyalty: number;
  };
}

interface LoaderProps {
  audienceData: AudienceData | null;
  isLoading: boolean;
}

export function Loader({ audienceData, isLoading }: LoaderProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Generating Insights
          </h2>
        </div>
        <div className="p-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <p className="text-gray-600">
                Analyzing demographics and generating insights...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!audienceData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <MetricsCard statistics={audienceData.statistics} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Preferences */}
        <Preferences preferences={audienceData.preferences} />

        {/* Insights */}
        <Insights insights={audienceData.insights} />
      </div>
    </div>
  );
}
