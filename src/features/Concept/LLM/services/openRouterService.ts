// OpenRouter API service for concept generation
// Using OpenAI gpt-oss-20b (free) model

import {
  getOpenRouterConfig,
  OpenRouterConfig,
} from '../config/openRouterConfig';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { Concept } from '../../UI/types/types';
import {
  createConceptGenerationMessages,
  createConceptRemixMessages,
  createOpenRouterHeaders,
  createOpenRouterRequestBody,
} from '../utils/aiServiceUtils';

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
    const messages = createConceptGenerationMessages(audienceData);

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: createOpenRouterHeaders(this.config.apiKey),
        body: JSON.stringify(createOpenRouterRequestBody(messages, this.config.model)),
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

  async remixConcept(originalConcept: Concept, audienceData: DemographicSelectionData): Promise<string> {
    const messages = createConceptRemixMessages(originalConcept, audienceData);

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: createOpenRouterHeaders(this.config.apiKey),
        body: JSON.stringify(createOpenRouterRequestBody(messages, this.config.model)),
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
        `Failed to remix concept: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
