// OpenRouter API service for concept generation
// Using OpenAI gpt-oss-20b (free) model

import {
  getOpenRouterConfig,
  OpenRouterConfig,
} from '../config/openRouterConfig';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenRouterService {
  private config: OpenRouterConfig;

  constructor(config?: Partial<OpenRouterConfig>) {
    const defaultConfig = getOpenRouterConfig();
    this.config = {
      ...defaultConfig,
      ...config,
    };
  }

  async generateConcept(audienceData: DemographicSelectionData): Promise<string> {
    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: `You are an expert advertising creative director. Your task is to generate a single, compelling advertising concept based on audience demographic data.

IMPORTANT: You must return a JSON object with exactly these fields:
- title: A catchy, engaging title for the concept (string)
- description: A detailed description of the concept (string) 
- keyMessage: The core marketing message (string)
- category: One of these categories: Brand Awareness, Product Launch, Seasonal Campaign, Social Media, Email Marketing, Content Marketing, Influencer Partnership, Health & Wellness, Tech Innovation, Educational Content, Interest-Based Marketing, Professional Development
- visualElements: Array of 3-4 visual element descriptions (string array)
- callToAction: A compelling call-to-action phrase (string)
- estimatedReach: A realistic number between 5000-100000 (number)
- estimatedEngagement: A percentage between 5-25 (number)

Return ONLY the JSON object, no additional text or formatting.`,
      },
      {
        role: 'user',
        content: `Generate an advertising concept for this audience:

Age: ${audienceData.age || 'Not specified'}
Profession: ${audienceData.profession || 'Not specified'}
Location: ${audienceData.location || 'Not specified'}
Income: ${audienceData.income || 'Not specified'}
Education: ${audienceData.education || 'Not specified'}
Interests: ${audienceData.interests?.join(', ') || 'Not specified'}

Create a concept that would resonate with this specific demographic.`,
      },
    ];

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Concept Generator',
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: messages,
          temperature: 0.8,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `OpenRouter API error: ${response.status} ${response.statusText}`
        );
      }

      const data: OpenRouterResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from AI model');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error(
        `Failed to generate concept: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
