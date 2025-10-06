import { createClient } from '@/utils/supabase/client';
import { Concept } from '@/features/Concept/UI/types/types';
import { ConceptCollection } from '@/stores/conceptStore';

export interface SupabaseConcept {
  id: string;
  audience_id: string;
  title: string;
  description: string;
  category: string;
  target_audience: string;
  key_message: string;
  visual_elements: string[];
  call_to_action: string;
  estimated_reach: number;
  estimated_engagement: number;
  created_at: string;
  updated_at: string;
}

export interface SupabaseAudience {
  id: string;
  name: string;
  age: string;
  profession: string;
  location: string;
  interests: string[];
  income: string;
  education: string;
  created_at: string;
}

export interface SupabaseConceptWithAudience extends SupabaseConcept {
  audiences: SupabaseAudience;
}

export interface SupabaseConceptUpdate {
  title?: string;
  description?: string;
  category?: string;
  target_audience?: string;
  key_message?: string;
  visual_elements?: string[];
  call_to_action?: string;
  estimated_reach?: number;
  estimated_engagement?: number;
}

export interface PaginatedConceptsResult {
  concepts: Concept[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasMore: boolean;
}

export class ConceptService {
  private supabase = createClient();

  // Convert Supabase concept to Concept
  private toConcept(supabaseConcept: SupabaseConcept): Concept {
    return {
      id: supabaseConcept.id,
      title: supabaseConcept.title,
      description: supabaseConcept.description,
      category: supabaseConcept.category,
      targetAudience: supabaseConcept.target_audience,
      keyMessage: supabaseConcept.key_message,
      visualElements: supabaseConcept.visual_elements,
      callToAction: supabaseConcept.call_to_action,
      estimatedReach: supabaseConcept.estimated_reach,
      estimatedEngagement: supabaseConcept.estimated_engagement,
      createdAt: new Date(supabaseConcept.created_at),
    };
  }

  // Convert Concept to Supabase format
  private toSupabaseConcept(
    concept: Concept,
    audienceId: string
  ): Omit<SupabaseConcept, 'id' | 'created_at' | 'updated_at'> {
    return {
      audience_id: audienceId,
      title: concept.title,
      description: concept.description,
      category: concept.category,
      target_audience: concept.targetAudience,
      key_message: concept.keyMessage,
      visual_elements: concept.visualElements,
      call_to_action: concept.callToAction,
      estimated_reach: concept.estimatedReach,
      estimated_engagement: concept.estimatedEngagement,
    };
  }

  // Get concepts for an audience with pagination
  async getConcepts(
    audienceId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedConceptsResult> {
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Get total count
      const { count, error: countError } = await this.supabase
        .from('concepts')
        .select('*', { count: 'exact', head: true })
        .eq('audience_id', audienceId);

      if (countError) {
        console.error('Error fetching concept count:', countError);
        throw countError;
      }

      // Get paginated data
      const { data, error } = await this.supabase
        .from('concepts')
        .select('*')
        .eq('audience_id', audienceId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Error fetching concepts:', error);
        throw error;
      }

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasMore = page < totalPages;

      return {
        concepts: data?.map((concept) => this.toConcept(concept)) || [],
        currentPage: page,
        totalPages,
        totalCount,
        hasMore,
      };
    } catch (error) {
      console.error('Failed to fetch concepts:', error);
      throw error;
    }
  }

  // Get all concepts across all audiences
  async getAllConcepts(): Promise<ConceptCollection[]> {
    try {
      const { data, error } = await this.supabase
        .from('concepts')
        .select(
          `
          *,
          audiences!inner(id, name, age, profession, location, interests, income, education, created_at)
        `
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all concepts:', error);
        throw error;
      }

      // Group concepts by audience
      const collectionsMap = new Map<string, ConceptCollection>();

      data?.forEach((item: SupabaseConceptWithAudience) => {
        const audienceId = item.audience_id;
        const concept = this.toConcept(item);

        if (!collectionsMap.has(audienceId)) {
          collectionsMap.set(audienceId, {
            audienceId,
            concepts: [],
            createdAt: new Date(item.audiences.created_at),
            updatedAt: new Date(item.updated_at),
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
            hasMore: false,
            isLoadingMore: false,
          });
        }

        collectionsMap.get(audienceId)!.concepts.push(concept);
      });

      // Update totalCount for each collection
      collectionsMap.forEach((collection) => {
        collection.totalCount = collection.concepts.length;
      });

      return Array.from(collectionsMap.values());
    } catch (error) {
      console.error('Failed to fetch all concepts:', error);
      throw error;
    }
  }

  // Create new concept
  async createConcept(audienceId: string, concept: Concept): Promise<Concept> {
    try {
      const supabaseData = this.toSupabaseConcept(concept, audienceId);

      const { data, error } = await this.supabase
        .from('concepts')
        .insert(supabaseData)
        .select()
        .single();

      if (error) {
        console.error('Error creating concept:', error);
        throw error;
      }

      return this.toConcept(data);
    } catch (error) {
      console.error('Failed to create concept:', error);
      throw error;
    }
  }

  // Create multiple concepts
  async createConcepts(
    audienceId: string,
    concepts: Concept[]
  ): Promise<Concept[]> {
    try {
      const supabaseData = concepts.map((concept) =>
        this.toSupabaseConcept(concept, audienceId)
      );

      const { data, error } = await this.supabase
        .from('concepts')
        .insert(supabaseData)
        .select();

      if (error) {
        console.error('Error creating concepts:', error);
        throw error;
      }

      return data?.map((concept) => this.toConcept(concept)) || [];
    } catch (error) {
      console.error('Failed to create concepts:', error);
      throw error;
    }
  }

  // Update concept
  async updateConcept(id: string, updates: Partial<Concept>): Promise<Concept> {
    try {
      const updateData: SupabaseConceptUpdate = {};

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined)
        updateData.description = updates.description;
      if (updates.category !== undefined)
        updateData.category = updates.category;
      if (updates.targetAudience !== undefined)
        updateData.target_audience = updates.targetAudience;
      if (updates.keyMessage !== undefined)
        updateData.key_message = updates.keyMessage;
      if (updates.visualElements !== undefined)
        updateData.visual_elements = updates.visualElements;
      if (updates.callToAction !== undefined)
        updateData.call_to_action = updates.callToAction;
      if (updates.estimatedReach !== undefined)
        updateData.estimated_reach = updates.estimatedReach;
      if (updates.estimatedEngagement !== undefined)
        updateData.estimated_engagement = updates.estimatedEngagement;

      const { data, error } = await this.supabase
        .from('concepts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating concept:', error);
        throw error;
      }

      return this.toConcept(data);
    } catch (error) {
      console.error('Failed to update concept:', error);
      throw error;
    }
  }

  // Delete concept
  async deleteConcept(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('concepts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting concept:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to delete concept:', error);
      throw error;
    }
  }

  // Delete all concepts for an audience
  async deleteConceptsByAudience(audienceId: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('concepts')
        .delete()
        .eq('audience_id', audienceId);

      if (error) {
        console.error('Error deleting concepts by audience:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to delete concepts by audience:', error);
      throw error;
    }
  }

}

export const conceptService = new ConceptService();
