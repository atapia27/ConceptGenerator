'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Concept } from '../types/types';
import { ConceptEditModal } from './ConceptEditModal';

interface ConceptCardProps {
  concept: Concept;
  className?: string;
  onUpdate?: (updatedConcept: Concept) => void;
}

export const ConceptCard = React.memo(function ConceptCard({
  concept,
  className = '',
  onUpdate,
}: ConceptCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Brand Awareness': 'bg-blue-100 text-blue-800',
      'Product Launch': 'bg-green-100 text-green-800',
      'Seasonal Campaign': 'bg-orange-100 text-orange-800',
      'Social Media': 'bg-purple-100 text-purple-800',
      'Email Marketing': 'bg-indigo-100 text-indigo-800',
      'Content Marketing': 'bg-pink-100 text-pink-800',
      'Influencer Partnership': 'bg-yellow-100 text-yellow-800',
      'Health & Wellness': 'bg-emerald-100 text-emerald-800',
      'Tech Innovation': 'bg-cyan-100 text-cyan-800',
      'Educational Content': 'bg-slate-100 text-slate-800',
      'Interest-Based Marketing': 'bg-rose-100 text-rose-800',
      'Professional Development': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 20) return 'text-green-600';
    if (engagement >= 15) return 'text-blue-600';
    if (engagement >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getReachColor = (reach: number) => {
    if (reach >= 50000) return 'text-green-600';
    if (reach >= 25000) return 'text-blue-600';
    if (reach >= 10000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveConcept = (updatedConcept: Concept) => {
    if (onUpdate) {
      onUpdate(updatedConcept);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
              {concept.title}
            </h3>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(concept.category)}`}
            >
              {concept.category}
            </span>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleEditClick}
              className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-100 transition-colors duration-200 hover:bg-blue-200"
              title="Edit concept"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="h-4 w-4 text-blue-600 group-hover:text-blue-700"
              />
            </button>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {concept.description}
        </p>
      </div>

      {/* Key Message */}
      <div className="border-b border-gray-200 p-6">
        <h4 className="mb-2 text-sm font-medium text-gray-900">Key Message</h4>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-sm text-gray-700 italic">
            &ldquo;{concept.keyMessage}&rdquo;
          </p>
        </div>
      </div>

      {/* Visual Elements */}
      <div className="border-b border-gray-200 p-6">
        <h4 className="mb-3 text-sm font-medium text-gray-900">
          Visual Elements
        </h4>
        <div className="flex flex-wrap gap-2">
          {concept.visualElements.map((element, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
            >
              {element}
            </span>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="border-b border-gray-200 p-6">
        <h4 className="mb-2 text-sm font-medium text-gray-900">
          Call to Action
        </h4>
        <div className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">
          {concept.callToAction}
        </div>
      </div>

      {/* Metrics */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Estimated Reach
              </span>
              <span
                className={`text-sm font-semibold ${getReachColor(concept.estimatedReach)}`}
              >
                {concept.estimatedReach.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${Math.min((concept.estimatedReach / 100000) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Engagement Rate
              </span>
              <span
                className={`text-sm font-semibold ${getEngagementColor(concept.estimatedEngagement)}`}
              >
                {concept.estimatedEngagement}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-green-600 transition-all duration-300"
                style={{
                  width: `${Math.min(concept.estimatedEngagement * 4, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate">{concept.targetAudience}</span>
            <span>{new Date(concept.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <ConceptEditModal
        concept={concept}
        isOpen={isEditModalOpen}
        onCloseAction={() => setIsEditModalOpen(false)}
        onSaveAction={handleSaveConcept}
      />
    </div>
  );
});
