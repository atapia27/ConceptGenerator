'use client';

import React, { useCallback } from 'react';
import { Loader } from './components/results/Loader';
import { CurrentAudience } from './components/CurrentAudience';
import { LoadSavedAudience } from './components/selection/LoadSavedAudience';
import { DemographicSelection } from './components/selection';
import { useAudienceDataWithSupabase } from './hooks/useAudienceDataWithSupabase';
import { useAudienceForm } from './hooks/useAudienceForm';
import { DemographicSelectionData } from './types/types';
import { hasAudienceSelections } from './utils/audienceComparison';
import { useAudiences, useUpdateCurrentAudience } from '@/stores';

export default function AudiencePage() {
  const { audienceData, isLoading, generateAudienceData } =
    useAudienceDataWithSupabase();
  const audiences = useAudiences();
  const updateCurrentAudience = useUpdateCurrentAudience();

  // Use the new form hook
  const {
    selections,
    updateSelection,
    updateAllSelections,
    randomizeSelections,
  } = useAudienceForm({
    onSelectionsChange: updateCurrentAudience,
  });

  const handleSelectionChange = (
    variable: keyof DemographicSelectionData,
    value: string | string[]
  ) => {
    updateSelection(variable, value);
  };

  const handleGenerateAudience = useCallback(async () => {
    await generateAudienceData(selections);
  }, [generateAudienceData, selections]);

  const handleRandomizeSelections = () => {
    randomizeSelections();
  };

  const handleLoadAudience = (audienceData: DemographicSelectionData) => {
    // Update all selections at once using the new method
    // This ensures atomic updates and proper duplicate detection
    updateAllSelections(audienceData);
  };

  return (
    <>
      {/* Demographics Selection and Load Saved Audience Section */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* Demographics Selection */}
        <DemographicSelection
          selections={selections}
          isLoading={isLoading}
          onSelectionChangeAction={handleSelectionChange}
          onRandomizeAction={handleRandomizeSelections}
        />

        {/* Load Saved Audience */}
        <LoadSavedAudience
          onLoadAudienceAction={handleLoadAudience}
          audiences={audiences}
          isLoading={isLoading}
        />
      </div>

      {/* Current Audience Section */}
      {hasAudienceSelections(selections) && (
        <CurrentAudience
          selections={selections}
          onGenerateAudienceAction={handleGenerateAudience}
          isLoading={isLoading}
        />
      )}

      {/* Generated Insights Section */}
      <Loader audienceData={audienceData} isLoading={isLoading} />
    </>
  );
}
