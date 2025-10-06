'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DemographicSelectionData } from '../types/types';

interface SaveAudienceModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onSaveAction: (name: string) => Promise<void>;
  audienceData: DemographicSelectionData;
  defaultName?: string;
}

export function SaveAudienceModal({
  isOpen,
  onCloseAction,
  onSaveAction,
  audienceData,
  defaultName,
}: SaveAudienceModalProps) {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(defaultName || '');
    }
  }, [isOpen, defaultName]);

  const handleSave = async () => {
    if (name.trim() && !isSaving) {
      setIsSaving(true);
      try {
        await onSaveAction(name.trim());
        onCloseAction();
      } catch (error) {
        console.error('Failed to save audience:', error);
        // Error handling could be improved with toast notifications
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Save Audience
            </h3>
            <button
              onClick={onCloseAction}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor="audience-name"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Audience Name
            </label>
            <input
              id="audience-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a name for this audience..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium text-gray-900">Preview:</h4>
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-sm text-gray-800">
                <div className="mb-1 flex items-center">
                  <span className="font-medium">
                    {audienceData.age} {audienceData.profession}
                  </span>
                </div>
                <div className="text-xs text-gray-700">
                  {audienceData.location} •{' '}
                  {audienceData.interests.slice(0, 2).join(', ')}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onCloseAction}
              className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!name.trim() || isSaving}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Audience'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
