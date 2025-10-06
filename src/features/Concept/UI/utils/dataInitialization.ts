/**
 * Data initialization utility functions
 */

/**
 * Initialize application data by loading audiences
 */
export async function initializeAppData(loadAudiences: () => Promise<void>): Promise<void> {
  try {
    await loadAudiences();
  } catch (error) {
    console.error('Failed to initialize data:', error);
    throw error;
  }
}

