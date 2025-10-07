'use client';

import { useMemo } from 'react';
import { Concept } from '../types/types';

export interface UseConceptMetricsOptions {
  concepts: Concept[];
}

export interface UseConceptMetricsReturn {
  totalReach: number;
  avgEngagement: number;
  totalConcepts: number;
  avgConversion: number;
}

/**
 * Custom hook for calculating concept metrics
 */
export function useConceptMetrics({ concepts }: UseConceptMetricsOptions): UseConceptMetricsReturn {
  const metrics = useMemo(() => {
    if (!concepts || concepts.length === 0) {
      return {
        totalReach: 0,
        avgEngagement: 0,
        totalConcepts: 0,
        avgConversion: 0,
      };
    }

    const totalReach = concepts.reduce((sum, concept) => sum + (concept.estimatedReach || 0), 0);
    const totalEngagement = concepts.reduce((sum, concept) => sum + (concept.estimatedEngagement || 0), 0);
    const totalConversion = concepts.reduce((sum, concept) => sum + (concept.estimatedEngagement || 0), 0); // Using engagement as conversion proxy
    
    const avgEngagement = totalEngagement / concepts.length;
    const avgConversion = totalConversion / concepts.length;

    return {
      totalReach,
      avgEngagement: Math.round(avgEngagement * 100) / 100, // Round to 2 decimal places
      totalConcepts: concepts.length,
      avgConversion: Math.round(avgConversion * 100) / 100, // Round to 2 decimal places
    };
  }, [concepts]);

  return metrics;
}
