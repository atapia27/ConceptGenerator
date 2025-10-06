'use client';

import React, { useState } from 'react';
import { Loader } from './components/results/Loader';
import { CurrentAudience } from './components/CurrentAudience';
import { LoadSavedAudience } from './components/selection/LoadSavedAudience';
import { DemographicSelection } from './components/selection';
import { useAudienceDataWithSupabase } from './hooks/useAudienceDataWithSupabase';
import { getRandomDefaultSelections } from './utils/demographicData';
import { DemographicSelectionData } from './types/types';
import { useAudiences, useUpdateCurrentAudience } from '@/stores';

export default function AudiencePage() {
  const [selections, setSelections] = useState<DemographicSelectionData>({
    age: '',
    profession: '',
    location: '',
    interests: [],
    income: '',
    education: '',
  });

  const { audienceData, isLoading, generateAudienceData } =
    useAudienceDataWithSupabase();
  const audiences = useAudiences();
  const updateCurrentAudience = useUpdateCurrentAudience();

  const handleSelectionChange = (
    variable: keyof DemographicSelectionData,
    value: string | string[]
  ) => {
    const updatedSelections = {
      ...selections,
      [variable]: value,
    };
    setSelections(updatedSelections);
    updateCurrentAudience(updatedSelections);
  };

  const handleGenerateAudience = async () => {
    await generateAudienceData(selections);
  };

  const handleRandomizeSelections = () => {
    const randomSelections = getRandomDefaultSelections();
    setSelections(randomSelections);
    updateCurrentAudience(randomSelections);
  };

  const handleLoadAudience = (audienceData: DemographicSelectionData) => {
    setSelections(audienceData);
    updateCurrentAudience(audienceData);
  };

  const hasSelections = () => {
    return Object.values(selections).some((value) =>
      Array.isArray(value) ? value.length > 0 : value !== ''
    );
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
      {hasSelections() && (
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
