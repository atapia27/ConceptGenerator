import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Concept } from '@/features/Concept/UI/types/types';
import { conceptService } from '@/services/supabase';

export interface ConceptCollection {
  audienceId: string;
  concepts: Concept[];
  createdAt: Date;
  updatedAt: Date;
  // Pagination state
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasMore: boolean;
  isLoadingMore: boolean;
}

interface ConceptStore {
  // State
  collections: ConceptCollection[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addConcepts: (audienceId: string, concepts: Concept[]) => Promise<void>;
  addConcept: (audienceId: string, concept: Concept) => Promise<void>;
  removeConcept: (audienceId: string, conceptId: string) => Promise<void>;
  loadConcepts: (
    audienceId: string,
    page?: number,
    pageSize?: number
  ) => Promise<void>;
  loadMoreConcepts: (audienceId: string) => Promise<void>;

  // Getters
  getConcepts: (audienceId: string) => Concept[];
  getCollection: (audienceId: string) => ConceptCollection | undefined;
  getAllCollections: () => ConceptCollection[];
  hasConcepts: (audienceId: string) => boolean;
  hasMoreConcepts: (audienceId: string) => boolean;
  isLoadingMoreConcepts: (audienceId: string) => boolean;
  getTotalReach: (audienceId?: string) => number;
  getAverageEngagement: (audienceId?: string) => number;

  // Utility actions
  updateConcept: (
    audienceId: string,
    conceptId: string,
    updates: Partial<Concept>
  ) => Promise<void>;
}

// Helper function to create a new collection
const createCollection = (
  audienceId: string,
  concepts: Concept[] = [],
  paginationData?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasMore: boolean;
  }
): ConceptCollection => ({
  audienceId,
  concepts,
  createdAt: new Date(),
  updatedAt: new Date(),
  currentPage: paginationData?.currentPage || 1,
  totalPages: paginationData?.totalPages || 1,
  totalCount: paginationData?.totalCount || concepts.length,
  hasMore: paginationData?.hasMore || false,
  isLoadingMore: false,
});


// Helper function to ensure Date objects are properly deserialized
const deserializeConcepts = (concepts: Concept[]): Concept[] => {
  return concepts.map((concept) => ({
    ...concept,
    createdAt: new Date(concept.createdAt),
  }));
};

export const useConceptStore = create<ConceptStore>()(
  persist(
    (set, get) => ({
      // Initial state
      collections: [],
      isLoading: false,
      error: null,

      // Actions
      addConcepts: async (audienceId: string, concepts: Concept[]) => {
        set({ isLoading: true, error: null });

        try {
          // Save to Supabase
          const savedConcepts = await conceptService.createConcepts(
            audienceId,
            concepts
          );

          set((state) => {
            const existingCollectionIndex = state.collections.findIndex(
              (collection) => collection.audienceId === audienceId
            );

            if (existingCollectionIndex >= 0) {
              // Update existing collection
              const updatedCollections = [...state.collections];
              updatedCollections[existingCollectionIndex] = {
                ...updatedCollections[existingCollectionIndex],
                concepts: [
                  ...updatedCollections[existingCollectionIndex].concepts,
                  ...savedConcepts,
                ],
                updatedAt: new Date(),
              };
              return { collections: updatedCollections, isLoading: false };
            } else {
              // Create new collection
              const newCollection = createCollection(audienceId, savedConcepts);
              return {
                collections: [...state.collections, newCollection],
                isLoading: false,
              };
            }
          });
        } catch (error) {
          console.error('Failed to add concepts:', error);
          set({
            error:
              error instanceof Error ? error.message : 'Failed to add concepts',
            isLoading: false,
          });

          // Fallback to local storage only
          set((state) => {
            const existingCollectionIndex = state.collections.findIndex(
              (collection) => collection.audienceId === audienceId
            );

            if (existingCollectionIndex >= 0) {
              // Update existing collection
              const updatedCollections = [...state.collections];
              updatedCollections[existingCollectionIndex] = {
                ...updatedCollections[existingCollectionIndex],
                concepts: [
                  ...updatedCollections[existingCollectionIndex].concepts,
                  ...concepts,
                ],
                updatedAt: new Date(),
              };
              return { collections: updatedCollections };
            } else {
              // Create new collection
              const newCollection = createCollection(audienceId, concepts);
              return { collections: [...state.collections, newCollection] };
            }
          });
        }
      },

      addConcept: async (audienceId: string, concept: Concept) => {
        set({ isLoading: true, error: null });

        try {
          // Save to Supabase
          const savedConcept = await conceptService.createConcept(
            audienceId,
            concept
          );

          set((state) => {
            const existingCollectionIndex = state.collections.findIndex(
              (collection) => collection.audienceId === audienceId
            );

            if (existingCollectionIndex >= 0) {
              // Update existing collection
              const updatedCollections = [...state.collections];
              updatedCollections[existingCollectionIndex] = {
                ...updatedCollections[existingCollectionIndex],
                concepts: [
                  ...updatedCollections[existingCollectionIndex].concepts,
                  savedConcept,
                ],
                updatedAt: new Date(),
              };
              return { collections: updatedCollections, isLoading: false };
            } else {
              // Create new collection
              const newCollection = createCollection(audienceId, [
                savedConcept,
              ]);
              return {
                collections: [...state.collections, newCollection],
                isLoading: false,
              };
            }
          });
        } catch (error) {
          console.error('Failed to add concept:', error);
          set({
            error:
              error instanceof Error ? error.message : 'Failed to add concept',
            isLoading: false,
          });

          // Fallback to local storage only
          set((state) => {
            const existingCollectionIndex = state.collections.findIndex(
              (collection) => collection.audienceId === audienceId
            );

            if (existingCollectionIndex >= 0) {
              // Update existing collection
              const updatedCollections = [...state.collections];
              updatedCollections[existingCollectionIndex] = {
                ...updatedCollections[existingCollectionIndex],
                concepts: [
                  ...updatedCollections[existingCollectionIndex].concepts,
                  concept,
                ],
                updatedAt: new Date(),
              };
              return { collections: updatedCollections };
            } else {
              // Create new collection
              const newCollection = createCollection(audienceId, [concept]);
              return { collections: [...state.collections, newCollection] };
            }
          });
        }
      },

      removeConcept: async (audienceId: string, conceptId: string) => {
        // Store the concept to be removed for potential rollback
        const conceptToRemove = get().getConcepts(audienceId).find(c => c.id === conceptId);
        
        // Optimistic update - remove immediately from UI
        set((state) => {
          const collectionIndex = state.collections.findIndex(
            (collection) => collection.audienceId === audienceId
          );

          if (collectionIndex >= 0) {
            const updatedCollections = [...state.collections];
            updatedCollections[collectionIndex] = {
              ...updatedCollections[collectionIndex],
              concepts: updatedCollections[collectionIndex].concepts.filter(
                (concept) => concept.id !== conceptId
              ),
              updatedAt: new Date(),
            };

            // Remove collection if no concepts left
            if (updatedCollections[collectionIndex].concepts.length === 0) {
              updatedCollections.splice(collectionIndex, 1);
            }

            return { collections: updatedCollections };
          }

          return state;
        });

        try {
          // Delete from Supabase
          await conceptService.deleteConcept(conceptId);
        } catch (error) {
          console.error('Failed to remove concept:', error);
          
          // Rollback optimistic update
          if (conceptToRemove) {
            set((state) => {
              const existingCollectionIndex = state.collections.findIndex(
                (collection) => collection.audienceId === audienceId
              );

              if (existingCollectionIndex >= 0) {
                // Restore the concept to its original position
                const updatedCollections = [...state.collections];
                updatedCollections[existingCollectionIndex] = {
                  ...updatedCollections[existingCollectionIndex],
                  concepts: [
                    ...updatedCollections[existingCollectionIndex].concepts,
                    conceptToRemove,
                  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                  updatedAt: new Date(),
                };
                return { collections: updatedCollections };
              } else {
                // Recreate collection if it was removed
                const newCollection = createCollection(audienceId, [conceptToRemove]);
                return { collections: [...state.collections, newCollection] };
              }
            });
          }
          
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to remove concept',
          });
        }
      },

      loadConcepts: async (
        audienceId: string,
        page: number = 1,
        pageSize: number = 10
      ) => {
        set({ isLoading: true, error: null });

        try {
          const result = await conceptService.getConcepts(
            audienceId,
            page,
            pageSize
          );

          set((state) => {
            const existingCollectionIndex = state.collections.findIndex(
              (collection) => collection.audienceId === audienceId
            );

            if (existingCollectionIndex >= 0) {
              // Update existing collection
              const updatedCollections = [...state.collections];
              updatedCollections[existingCollectionIndex] = {
                ...updatedCollections[existingCollectionIndex],
                concepts:
                  page === 1
                    ? result.concepts
                    : [
                        ...updatedCollections[existingCollectionIndex].concepts,
                        ...result.concepts,
                      ],
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalCount: result.totalCount,
                hasMore: result.hasMore,
                updatedAt: new Date(),
              };
              return { collections: updatedCollections, isLoading: false };
            } else {
              // Create new collection
              const newCollection = createCollection(
                audienceId,
                result.concepts,
                {
                  currentPage: result.currentPage,
                  totalPages: result.totalPages,
                  totalCount: result.totalCount,
                  hasMore: result.hasMore,
                }
              );
              return {
                collections: [...state.collections, newCollection],
                isLoading: false,
              };
            }
          });
        } catch (error) {
          console.error('Failed to load concepts:', error);
          
          // Fallback: try to load from local storage if available
          const existingCollection = get().getCollection(audienceId);
          if (existingCollection && existingCollection.concepts.length > 0) {
            // Keep existing data, just show error
            set({
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to load concepts from server. Showing cached data.',
              isLoading: false,
            });
          } else {
            // No cached data available
            set({
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to load concepts',
              isLoading: false,
            });
          }
        }
      },

      loadMoreConcepts: async (audienceId: string) => {
        // Set loading more state immediately to prevent race conditions
        set((state) => {
          const collectionIndex = state.collections.findIndex(
            (c) => c.audienceId === audienceId
          );
          if (collectionIndex >= 0) {
            const collection = state.collections[collectionIndex];
            // Check conditions after setting loading state
            if (!collection.hasMore || collection.isLoadingMore) {
              return state; // Don't proceed if already loading or no more data
            }
            
            const updatedCollections = [...state.collections];
            updatedCollections[collectionIndex] = {
              ...updatedCollections[collectionIndex],
              isLoadingMore: true,
            };
            return { collections: updatedCollections };
          }
          return state;
        });

        // Double-check conditions after state update
        const collection = get().getCollection(audienceId);
        if (!collection || !collection.hasMore || collection.isLoadingMore) {
          return;
        }

        try {
          const nextPage = collection.currentPage + 1;
          const result = await conceptService.getConcepts(
            audienceId,
            nextPage,
            10
          );

          set((state) => {
            const collectionIndex = state.collections.findIndex(
              (c) => c.audienceId === audienceId
            );
            if (collectionIndex >= 0) {
              const updatedCollections = [...state.collections];
              updatedCollections[collectionIndex] = {
                ...updatedCollections[collectionIndex],
                concepts: [
                  ...updatedCollections[collectionIndex].concepts,
                  ...result.concepts,
                ],
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalCount: result.totalCount,
                hasMore: result.hasMore,
                isLoadingMore: false,
                updatedAt: new Date(),
              };
              return { collections: updatedCollections };
            }
            return state;
          });
        } catch (error) {
          console.error('Failed to load more concepts:', error);
          set((state) => {
            const collectionIndex = state.collections.findIndex(
              (c) => c.audienceId === audienceId
            );
            if (collectionIndex >= 0) {
              const updatedCollections = [...state.collections];
              updatedCollections[collectionIndex] = {
                ...updatedCollections[collectionIndex],
                isLoadingMore: false,
              };
              return { collections: updatedCollections };
            }
            return state;
          });
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to load more concepts',
          });
        }
      },

      // Getters
      getConcepts: (audienceId: string) => {
        const collection = get().collections.find(
          (collection) => collection.audienceId === audienceId
        );
        return collection ? deserializeConcepts(collection.concepts) : [];
      },

      getCollection: (audienceId: string) => {
        const collection = get().collections.find(
          (collection) => collection.audienceId === audienceId
        );
        return collection
          ? {
              ...collection,
              concepts: deserializeConcepts(collection.concepts),
            }
          : undefined;
      },

      getAllCollections: () => {
        return get().collections.map((collection) => ({
          ...collection,
          concepts: deserializeConcepts(collection.concepts),
        }));
      },

      hasConcepts: (audienceId: string) => {
        const collection = get().collections.find(
          (collection) => collection.audienceId === audienceId
        );
        return collection ? collection.concepts.length > 0 : false;
      },

      hasMoreConcepts: (audienceId: string) => {
        const collection = get().collections.find(
          (collection) => collection.audienceId === audienceId
        );
        return collection ? collection.hasMore : false;
      },

      isLoadingMoreConcepts: (audienceId: string) => {
        const collection = get().collections.find(
          (collection) => collection.audienceId === audienceId
        );
        return collection ? collection.isLoadingMore : false;
      },

      getTotalReach: (audienceId?: string) => {
        if (audienceId) {
          const concepts = get().getConcepts(audienceId);
          return concepts.reduce(
            (total, concept) => total + concept.estimatedReach,
            0
          );
        }

        return get().collections.reduce((total, collection) => {
          return (
            total +
            collection.concepts.reduce(
              (collectionTotal, concept) =>
                collectionTotal + concept.estimatedReach,
              0
            )
          );
        }, 0);
      },

      getAverageEngagement: (audienceId?: string) => {
        if (audienceId) {
          const concepts = get().getConcepts(audienceId);
          if (concepts.length === 0) return 0;
          const totalEngagement = concepts.reduce(
            (total, concept) => total + concept.estimatedEngagement,
            0
          );
          return totalEngagement / concepts.length;
        }

        const allConcepts = get().collections.flatMap(
          (collection) => collection.concepts
        );
        if (allConcepts.length === 0) return 0;
        const totalEngagement = allConcepts.reduce(
          (total, concept) => total + concept.estimatedEngagement,
          0
        );
        return totalEngagement / allConcepts.length;
      },

      // Utility actions
      updateConcept: async (
        audienceId: string,
        conceptId: string,
        updates: Partial<Concept>
      ) => {
        // Store original concept for potential rollback
        const originalConcept = get().getConcepts(audienceId).find(c => c.id === conceptId);
        
        // Optimistic update - apply changes immediately to UI
        set((state) => {
          const collectionIndex = state.collections.findIndex(
            (collection) => collection.audienceId === audienceId
          );

          if (collectionIndex >= 0) {
            const updatedCollections = [...state.collections];
            const conceptIndex = updatedCollections[
              collectionIndex
            ].concepts.findIndex((concept) => concept.id === conceptId);

            if (conceptIndex >= 0) {
              updatedCollections[collectionIndex] = {
                ...updatedCollections[collectionIndex],
                concepts: updatedCollections[collectionIndex].concepts.map(
                  (concept, index) =>
                    index === conceptIndex ? { ...concept, ...updates } : concept
                ),
                updatedAt: new Date(),
              };
            }

            return { collections: updatedCollections };
          }

          return state;
        });

        try {
          // Update in Supabase
          const updatedConcept = await conceptService.updateConcept(
            conceptId,
            updates
          );

          // Update with server response (ensures data consistency)
          set((state) => {
            const collectionIndex = state.collections.findIndex(
              (collection) => collection.audienceId === audienceId
            );

            if (collectionIndex >= 0) {
              const updatedCollections = [...state.collections];
              const conceptIndex = updatedCollections[
                collectionIndex
              ].concepts.findIndex((concept) => concept.id === conceptId);

              if (conceptIndex >= 0) {
                updatedCollections[collectionIndex] = {
                  ...updatedCollections[collectionIndex],
                  concepts: updatedCollections[collectionIndex].concepts.map(
                    (concept, index) =>
                      index === conceptIndex ? updatedConcept : concept
                  ),
                  updatedAt: new Date(),
                };
              }

              return { collections: updatedCollections };
            }

            return state;
          });
        } catch (error) {
          console.error('Failed to update concept:', error);
          
          // Rollback optimistic update
          if (originalConcept) {
            set((state) => {
              const collectionIndex = state.collections.findIndex(
                (collection) => collection.audienceId === audienceId
              );

              if (collectionIndex >= 0) {
                const updatedCollections = [...state.collections];
                const conceptIndex = updatedCollections[
                  collectionIndex
                ].concepts.findIndex((concept) => concept.id === conceptId);

                if (conceptIndex >= 0) {
                  updatedCollections[collectionIndex] = {
                    ...updatedCollections[collectionIndex],
                    concepts: updatedCollections[collectionIndex].concepts.map(
                      (concept, index) =>
                        index === conceptIndex ? originalConcept : concept
                    ),
                    updatedAt: new Date(),
                  };
                }

                return { collections: updatedCollections };
              }

              return state;
            });
          }
          
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to update concept',
          });
        }
      },
    }),
    {
      name: 'concept-store', // unique name for localStorage key
      // Optional: you can specify which parts of state to persist
      // partialize: (state) => ({ collections: state.collections }),
    }
  )
);

// Atomic selectors for better performance
export const useConceptCollections = () => useConceptStore((state) => state.collections);
export const useConceptLoading = () => useConceptStore((state) => state.isLoading);
export const useConceptError = () => useConceptStore((state) => state.error);

// Action selectors
export const useAddConcepts = () => useConceptStore((state) => state.addConcepts);
export const useAddConcept = () => useConceptStore((state) => state.addConcept);
export const useRemoveConcept = () => useConceptStore((state) => state.removeConcept);
export const useLoadConcepts = () => useConceptStore((state) => state.loadConcepts);
export const useLoadMoreConcepts = () => useConceptStore((state) => state.loadMoreConcepts);
export const useUpdateConcept = () => useConceptStore((state) => state.updateConcept);

// Getter selectors
export const useGetConcepts = () => useConceptStore((state) => state.getConcepts);
export const useGetCollection = () => useConceptStore((state) => state.getCollection);
export const useGetAllCollections = () => useConceptStore((state) => state.getAllCollections);
export const useHasConcepts = () => useConceptStore((state) => state.hasConcepts);
export const useHasMoreConcepts = () => useConceptStore((state) => state.hasMoreConcepts);
export const useIsLoadingMoreConcepts = () => useConceptStore((state) => state.isLoadingMoreConcepts);
export const useGetTotalReach = () => useConceptStore((state) => state.getTotalReach);
export const useGetAverageEngagement = () => useConceptStore((state) => state.getAverageEngagement);
