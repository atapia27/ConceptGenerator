import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { audienceService } from '@/services/supabase';

export interface SavedAudience {
  id: string;
  name: string;
  data: DemographicSelectionData;
  createdAt: Date;
}

interface AudienceStore {
  // State
  audiences: SavedAudience[];
  currentAudience: DemographicSelectionData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  addAudience: (
    audience: DemographicSelectionData,
    name?: string
  ) => Promise<void>;
  updateCurrentAudience: (audience: DemographicSelectionData) => void;
  setCurrentAudience: (audience: DemographicSelectionData | null) => void;
  removeAudience: (index: number) => Promise<void>;
  loadAudiences: () => Promise<void>;
  syncWithSupabase: () => Promise<void>;

  // Getters
  getAudiences: () => SavedAudience[];
  generateDefaultName: (audience: DemographicSelectionData) => string;
}

// Atomic selectors for better performance
export const useAudiences = () => useAudienceStore((state) => state.audiences);
export const useCurrentAudience = () =>
  useAudienceStore((state) => state.currentAudience);
export const useAudienceLoading = () =>
  useAudienceStore((state) => state.isLoading);
export const useAudienceError = () => useAudienceStore((state) => state.error);

// Action selectors
export const useAddAudience = () =>
  useAudienceStore((state) => state.addAudience);
export const useUpdateCurrentAudience = () =>
  useAudienceStore((state) => state.updateCurrentAudience);
export const useSetCurrentAudience = () =>
  useAudienceStore((state) => state.setCurrentAudience);
export const useRemoveAudience = () =>
  useAudienceStore((state) => state.removeAudience);
export const useLoadAudiences = () =>
  useAudienceStore((state) => state.loadAudiences);
export const useSyncWithSupabase = () =>
  useAudienceStore((state) => state.syncWithSupabase);
export const useGetAudiences = () =>
  useAudienceStore((state) => state.getAudiences);
export const useGenerateDefaultName = () =>
  useAudienceStore((state) => state.generateDefaultName);

// Helper function to generate default audience name
const generateDefaultName = (audience: DemographicSelectionData): string => {
  if (!audience) return 'Untitled Audience';

  const professionAbbr = audience.profession
    ? audience.profession
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 3)
    : 'UNK';

  const location = audience.location || 'Unknown';
  const interests =
    audience.interests && audience.interests.length > 0
      ? audience.interests.slice(0, 2).join(', ')
      : 'No interests';

  return `${professionAbbr} ${location} - ${interests}`;
};

// Migration function to handle old data structure
const migrateOldData = (persistedState: unknown): Partial<AudienceStore> => {
  if (!persistedState || typeof persistedState !== 'object') {
    return { audiences: [], currentAudience: null };
  }

  const state = persistedState as Record<string, unknown>;

  if (!state.audiences || !Array.isArray(state.audiences)) {
    return { audiences: [], currentAudience: null };
  }

  // Check if audiences is an array of old DemographicSelectionData objects
  if (state.audiences.length > 0) {
    const firstItem = state.audiences[0] as Record<string, unknown>;
    // If the first item doesn't have an 'id' property, it's old data
    if (!firstItem.id) {
      const migratedAudiences = state.audiences.map(
        (audience: unknown, index: number) => ({
          id: `migrated-${Date.now()}-${index}`,
          name: generateDefaultName(audience as DemographicSelectionData),
          data: audience as DemographicSelectionData,
          createdAt: new Date(),
        })
      );

      return {
        audiences: migratedAudiences,
        currentAudience:
          state.currentAudience as DemographicSelectionData | null,
      };
    }
  }

  return {
    audiences: state.audiences as SavedAudience[],
    currentAudience: state.currentAudience as DemographicSelectionData | null,
  };
};

export const useAudienceStore = create<AudienceStore>()(
  persist(
    (set, get) => ({
      // Initial state
      audiences: [],
      currentAudience: null,
      isLoading: false,
      error: null,

      // Actions
      addAudience: async (
        audience: DemographicSelectionData,
        name?: string
      ) => {
        set({ isLoading: true, error: null });

        try {
          const audienceName = name || generateDefaultName(audience);
          const savedAudience: SavedAudience = {
            id: `audience-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: audienceName,
            data: audience,
            createdAt: new Date(),
          };

          // Save to Supabase
          const supabaseAudience =
            await audienceService.createAudience(savedAudience);

          set((state) => ({
            audiences: [...state.audiences, supabaseAudience],
            currentAudience: audience,
            isLoading: false,
          }));
        } catch (error) {
          console.error('Failed to add audience:', error);
          set({
            error:
              error instanceof Error ? error.message : 'Failed to add audience',
            isLoading: false,
          });

          // Fallback to local storage only
          const audienceName = name || generateDefaultName(audience);
          const savedAudience: SavedAudience = {
            id: `audience-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: audienceName,
            data: audience,
            createdAt: new Date(),
          };

          set((state) => ({
            audiences: [...state.audiences, savedAudience],
            currentAudience: audience,
          }));
        }
      },

      updateCurrentAudience: (audience: DemographicSelectionData) => {
        set({ currentAudience: audience });
      },

      setCurrentAudience: (audience: DemographicSelectionData | null) => {
        set({ currentAudience: audience });
      },

      removeAudience: async (index: number) => {
        set({ isLoading: true, error: null });

        try {
          const audienceToRemove = get().audiences[index];
          if (audienceToRemove) {
            // Delete from Supabase
            await audienceService.deleteAudience(audienceToRemove.id);
          }

          set((state) => {
            const newAudiences = state.audiences.filter((_, i) => i !== index);
            const removedAudience = state.audiences[index];
            const newCurrentAudience =
              state.currentAudience &&
              removedAudience &&
              JSON.stringify(state.currentAudience) ===
                JSON.stringify(removedAudience.data)
                ? newAudiences.length > 0
                  ? newAudiences[0].data
                  : null
                : state.currentAudience;

            return {
              audiences: newAudiences,
              currentAudience: newCurrentAudience,
              isLoading: false,
            };
          });
        } catch (error) {
          console.error('Failed to remove audience:', error);
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to remove audience',
            isLoading: false,
          });

          // Fallback to local removal only
          set((state) => {
            const newAudiences = state.audiences.filter((_, i) => i !== index);
            const removedAudience = state.audiences[index];
            const newCurrentAudience =
              state.currentAudience &&
              removedAudience &&
              JSON.stringify(state.currentAudience) ===
                JSON.stringify(removedAudience.data)
                ? newAudiences.length > 0
                  ? newAudiences[0].data
                  : null
                : state.currentAudience;

            return {
              audiences: newAudiences,
              currentAudience: newCurrentAudience,
            };
          });
        }
      },

      loadAudiences: async () => {
        set({ isLoading: true, error: null });

        try {
          const audiences = await audienceService.getAudiences();
          set({ audiences, isLoading: false });
        } catch (error) {
          console.error('Failed to load audiences:', error);
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to load audiences',
            isLoading: false,
          });
        }
      },

      syncWithSupabase: async () => {
        set({ isLoading: true, error: null });

        try {
          // Load audiences from Supabase
          const supabaseAudiences = await audienceService.getAudiences();
          const localAudiences = get().audiences;

          // Merge local and remote data (local takes precedence for conflicts)
          const mergedAudiences = [...supabaseAudiences];

          // Add local audiences that don't exist in Supabase
          localAudiences.forEach((localAudience) => {
            if (!supabaseAudiences.find((sa) => sa.id === localAudience.id)) {
              mergedAudiences.push(localAudience);
            }
          });

          set({ audiences: mergedAudiences, isLoading: false });
        } catch (error) {
          console.error('Failed to sync with Supabase:', error);
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to sync with Supabase',
            isLoading: false,
          });
        }
      },

      // Getters
      getAudiences: () => get().audiences,
      generateDefaultName: (audience: DemographicSelectionData) =>
        generateDefaultName(audience),
    }),
    {
      name: 'audience-store', // unique name for localStorage key
      // Optional: you can specify which parts of state to persist
      // partialize: (state) => ({ audiences: state.audiences, currentAudience: state.currentAudience }),
      migrate: (persistedState: unknown) => {
        return migrateOldData(persistedState);
      },
    }
  )
);
