'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faCheckCircle,
  faDollarSign,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

interface MetricsCardProps {
  statistics: {
    engagementRate: number;
    conversionRate: number;
    averageSpend: number;
    brandLoyalty: number;
  };
}

export function MetricsCard({ statistics }: MetricsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Performance Metrics
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Expected performance indicators for this audience
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="h-4 w-4 text-blue-600"
                />
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                +12%
              </span>
            </div>
            <div>
              <p className="mb-1 text-2xl font-bold text-gray-900">
                {statistics.engagementRate}%
              </p>
              <p className="text-sm text-gray-600">Engagement Rate</p>
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="h-4 w-4 text-green-600"
                />
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                +8%
              </span>
            </div>
            <div>
              <p className="mb-1 text-2xl font-bold text-gray-900">
                {statistics.conversionRate}%
              </p>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="h-4 w-4 text-purple-600"
                />
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                +5%
              </span>
            </div>
            <div>
              <p className="mb-1 text-2xl font-bold text-gray-900">
                ${statistics.averageSpend}
              </p>
              <p className="text-sm text-gray-600">Average Spend</p>
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="h-4 w-4 text-yellow-600"
                />
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                +3%
              </span>
            </div>
            <div>
              <p className="mb-1 text-2xl font-bold text-gray-900">
                {statistics.brandLoyalty}%
              </p>
              <p className="text-sm text-gray-600">Brand Loyalty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
