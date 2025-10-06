'use client';

import React from 'react';

interface InsightsProps {
  insights: {
    keyCharacteristics: string[];
    painPoints: string[];
    motivations: string[];
    behaviors: string[];
  };
}

export function Insights({ insights }: InsightsProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
        <p className="mt-1 text-sm text-gray-600">
          Behavioral patterns and motivations
        </p>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-900">
            Key Characteristics
          </h4>
          <div className="rounded-lg bg-gray-50 p-3">
            <ul className="space-y-2 text-sm text-gray-700">
              {insights.keyCharacteristics.map((characteristic, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600"></span>
                  {characteristic}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-900">
            Pain Points
          </h4>
          <div className="rounded-lg bg-gray-50 p-3">
            <ul className="space-y-2 text-sm text-gray-700">
              {insights.painPoints.map((painPoint, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600"></span>
                  {painPoint}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-900">
            Motivations
          </h4>
          <div className="rounded-lg bg-gray-50 p-3">
            <ul className="space-y-2 text-sm text-gray-700">
              {insights.motivations.map((motivation, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600"></span>
                  {motivation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
