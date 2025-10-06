'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faSearch,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { SavedAudience } from '@/stores/audienceStore';
import { CompactAudienceCard } from '@/features/Concept/UI/components/CompactAudienceCard';
import { DemographicSelectionData } from '../../types/types';
import Button from '@/components/Button';

interface LoadSavedAudienceProps {
  onLoadAudienceAction: (audience: DemographicSelectionData) => void;
  audiences: SavedAudience[];
  isLoading?: boolean;
}

export function LoadSavedAudience({
  onLoadAudienceAction,
  audiences,
  isLoading = false,
}: LoadSavedAudienceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] =
    useState<SavedAudience | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredAudiences = audiences.filter(
    (audience) =>
      audience.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audience.data.profession
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      audience.data.location
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      audience.data.interests.some((interest) =>
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleLoadAudience = () => {
    if (selectedAudience) {
      onLoadAudienceAction(selectedAudience.data);
      setSelectedAudience(null);
      setSearchTerm('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Load Saved Audience
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Select from your previously saved audience profiles
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <FontAwesomeIcon icon={faFolderOpen} className="mr-2 h-4 w-4" />
            {isExpanded ? 'Collapse' : 'Browse'}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="h-4 w-4 text-gray-400"
                />
              </div>
              <input
                type="text"
                placeholder="Search audiences by name, profession, location, or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Audience List */}
          <div className="mb-4 max-h-72 overflow-y-auto rounded-lg border border-gray-200 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Loading audiences...</span>
                </div>
              </div>
            ) : filteredAudiences.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  className="mb-3 h-8 w-8 text-gray-300"
                />
                <h3 className="mb-1 text-sm font-medium text-gray-900">
                  {searchTerm ? 'No audiences found' : 'No saved audiences'}
                </h3>
                <p className="text-center text-xs text-gray-600">
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : 'Create and save an audience to see it here'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredAudiences.map((audience) => (
                  <CompactAudienceCard
                    key={audience.id}
                    audience={audience}
                    isSelected={selectedAudience?.id === audience.id}
                    onClick={() => setSelectedAudience(audience)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Load Button */}
          <div className="mt-8 flex items-center justify-end">
            <Button
              variant="primary"
              size="sm"
              color="blue"
              onClick={handleLoadAudience}
              disabled={!selectedAudience}
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                <span>Load Audience</span>
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
