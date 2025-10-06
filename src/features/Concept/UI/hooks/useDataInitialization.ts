'use client';

import { useEffect, useCallback } from 'react';
import { initializeAppData } from '../utils/dataInitialization';

export interface UseDataInitializationOptions {
  loadAudiencesAction: () => Promise<void>;
}

/**
 * Custom hook for initializing application data
 */
export function useDataInitialization({ loadAudiencesAction }: UseDataInitializationOptions): void {
  const initializeData = useCallback(async () => {
    await initializeAppData(loadAudiencesAction);
  }, [loadAudiencesAction]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);
}
