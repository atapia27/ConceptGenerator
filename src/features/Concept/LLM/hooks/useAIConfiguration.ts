'use client';

import { useMemo } from 'react';
import { getOpenRouterConfig, isOpenRouterConfigured } from '../config/openRouterConfig';

export interface UseAIConfigurationReturn {
  isConfigured: boolean;
  config: ReturnType<typeof getOpenRouterConfig> | null;
  hasApiKey: boolean;
  model: string | null;
  baseUrl: string | null;
}

/**
 * Custom hook for managing AI configuration state
 */
export function useAIConfiguration(): UseAIConfigurationReturn {
  const configuration = useMemo(() => {
    const isConfigured = isOpenRouterConfigured();
    
    if (!isConfigured) {
      return {
        isConfigured: false,
        config: null,
        hasApiKey: false,
        model: null,
        baseUrl: null,
      };
    }

    try {
      const config = getOpenRouterConfig();
      return {
        isConfigured: true,
        config,
        hasApiKey: !!config.apiKey,
        model: config.model,
        baseUrl: config.baseUrl,
      };
    } catch (error) {
      console.error('Failed to get AI configuration:', error);
      return {
        isConfigured: false,
        config: null,
        hasApiKey: false,
        model: null,
        baseUrl: null,
      };
    }
  }, []);

  return configuration;
}
