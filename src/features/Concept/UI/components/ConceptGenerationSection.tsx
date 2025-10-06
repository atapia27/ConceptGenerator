'use client';

import React from 'react';
import Button from '@/components/Button';

interface ConceptGenerationSectionProps {
  hasConcepts: boolean;
  conceptsCount: number;
  isAIConfigured: boolean;
  isLoading: boolean;
  isFormValid: boolean;
  onGenerateConceptsAction: () => void;
}

export function ConceptGenerationSection({
  hasConcepts,
  conceptsCount,
  isAIConfigured,
  isLoading,
  isFormValid,
  onGenerateConceptsAction,
}: ConceptGenerationSectionProps) {

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              Concept Generation
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {isFormValid
                ? hasConcepts
                  ? `This audience has ${conceptsCount} concepts. Generate another to expand your collection.`
                  : 'All requirements met. Click generate to create a concept.'
                : 'Please select an audience to generate concepts.'}
            </p>
            {!isAIConfigured && (
              <div className="mt-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> AI generation is not configured. Set
                  the{' '}
                  <code className="rounded bg-yellow-100 px-1">
                    NEXT_PUBLIC_OPENROUTER_API_KEY
                  </code>{' '}
                  environment variable to enable AI-powered concept
                  generation.
                </p>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            size="lg"
            color="blue"
            onClick={onGenerateConceptsAction}
            disabled={!isFormValid || isLoading}
            className="ml-6"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                <span>Generating...</span>
              </div>
            ) : hasConcepts ? (
              'Generate Another'
            ) : (
              'Generate Concept'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
