'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faUsers,
  faChartLine,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Concept } from '../types/types';

interface MetricsPanelProps {
  concepts: Concept[];
  totalReach: number;
  avgEngagement: number;
  isLoading: boolean;
}

export function MetricsPanel({
  concepts,
  totalReach,
  avgEngagement,
  isLoading,
}: MetricsPanelProps) {
  const metrics = [
    {
      label: 'Total Concepts',
      value: concepts.length,
      icon: <FontAwesomeIcon icon={faLightbulb} className="h-5 w-5" />,
      color: 'blue',
      change: '+12%',
      changeType: 'positive',
    },
    {
      label: 'Total Reach',
      value: totalReach.toLocaleString(),
      icon: <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />,
      color: 'green',
      change: '+8%',
      changeType: 'positive',
    },
    {
      label: 'Avg Engagement',
      value: `${avgEngagement.toFixed(1)}%`,
      icon: <FontAwesomeIcon icon={faChartLine} className="h-5 w-5" />,
      color: 'purple',
      change: '+3%',
      changeType: 'positive',
    },
    {
      label: 'Success Rate',
      value: concepts.length > 0 ? '95%' : '0%',
      icon: <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5" />,
      color: 'yellow',
      change: '+2%',
      changeType: 'positive',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: {
      [key: string]: { bg: string; text: string; icon: string };
    } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        icon: 'text-green-600',
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        icon: 'text-purple-600',
      },
      yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        icon: 'text-yellow-600',
      },
    };
    return colors[color] || colors.blue;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="animate-pulse">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-gray-200"></div>
                <div className="h-4 w-12 rounded bg-gray-200"></div>
              </div>
              <div className="space-y-2">
                <div className="h-6 w-20 rounded bg-gray-200"></div>
                <div className="h-4 w-16 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const colorClasses = getColorClasses(metric.color);
        return (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className={`h-10 w-10 ${colorClasses.bg} flex items-center justify-center rounded-lg`}
              >
                <div className={colorClasses.icon}>{metric.icon}</div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  metric.changeType === 'positive'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {metric.change}
              </span>
            </div>

            <div>
              <p className="mb-1 text-2xl font-bold text-gray-900">
                {metric.value}
              </p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
