import { createClient } from '@/utils/supabase/client';
import { SavedAudience } from '@/stores/audienceStore';

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
  updated_at: string;
}

export class AudienceService {
  private supabase = createClient();

  // Convert Supabase audience to SavedAudience
  private toSavedAudience(supabaseAudience: SupabaseAudience): SavedAudience {
    return {
      id: supabaseAudience.id,
      name: supabaseAudience.name,
      data: {
        age: supabaseAudience.age,
        profession: supabaseAudience.profession,
        location: supabaseAudience.location,
        interests: supabaseAudience.interests,
        income: supabaseAudience.income,
        education: supabaseAudience.education,
      },
      createdAt: new Date(supabaseAudience.created_at),
    };
  }

  // Convert SavedAudience to Supabase format
  private toSupabaseAudience(
    audience: SavedAudience
  ): Omit<SupabaseAudience, 'id' | 'created_at' | 'updated_at'> {
    return {
      name: audience.name,
      age: audience.data.age,
      profession: audience.data.profession,
      location: audience.data.location,
      interests: audience.data.interests,
      income: audience.data.income,
      education: audience.data.education,
    };
  }

  // Get all audiences
  async getAudiences(): Promise<SavedAudience[]> {
    try {
      const { data, error } = await this.supabase
        .from('audiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching audiences:', error);
        throw error;
      }

      return data?.map((audience) => this.toSavedAudience(audience)) || [];
    } catch (error) {
      console.error('Failed to fetch audiences:', error);
      throw error;
    }
  }

  // Create new audience
  async createAudience(audience: SavedAudience): Promise<SavedAudience> {
    try {
      const supabaseData = this.toSupabaseAudience(audience);

      const { data, error } = await this.supabase
        .from('audiences')
        .insert(supabaseData)
        .select()
        .single();

      if (error) {
        console.error('Error creating audience:', error);
        throw error;
      }

      return this.toSavedAudience(data);
    } catch (error) {
      console.error('Failed to create audience:', error);
      throw error;
    }
  }

  // Delete audience
  async deleteAudience(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('audiences')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting audience:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to delete audience:', error);
      throw error;
    }
  }
}

export const audienceService = new AudienceService();
