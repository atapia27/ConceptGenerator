// Concept generation service using AI
import { OpenRouterService } from './openRouterService';
import { Concept } from '../../UI/types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { isOpenRouterConfigured } from '../config/openRouterConfig';
import { parseAIResponse } from '../utils/conceptParsingUtils';
import { generateMockConcept, generateConceptId, generateTargetAudienceDescription } from '../utils/mockGenerationUtils';
import { createRemixConceptWithFallback } from '../utils/remixUtils';

export interface ConceptGenerationOptions {
  fallbackToMock?: boolean;
}

export interface AIConceptResponse {
  title: string;
  description: string;
  keyMessage: string;
  category: string;
  visualElements: string[];
  callToAction: string;
  estimatedReach: number;
  estimatedEngagement: number;
}

export class ConceptGenerationService {
  private openRouterService: OpenRouterService | null;
  private fallbackToMock: boolean;
  private isConfigured: boolean;

  constructor(options: ConceptGenerationOptions = {}) {
    this.isConfigured = isOpenRouterConfigured();
    this.fallbackToMock = options.fallbackToMock ?? true;

    if (this.isConfigured) {
      this.openRouterService = new OpenRouterService();
    } else {
      this.openRouterService = null;
    }
  }

  async generateConcept(
    audienceData: DemographicSelectionData
  ): Promise<Concept> {
    // Check if OpenRouter is configured and available
    if (this.isConfigured && this.openRouterService) {
      try {
        // Try to generate concept using AI
        const aiResponse =
          await this.openRouterService.generateConcept(audienceData);

        // Parse the AI response
        const conceptData = parseAIResponse(aiResponse);

        // Create concept object
        const concept: Concept = {
          id: generateConceptId(),
          title: conceptData.title,
          description: conceptData.description,
          category: conceptData.category,
          targetAudience: generateTargetAudienceDescription(audienceData),
          keyMessage: conceptData.keyMessage,
          visualElements: conceptData.visualElements,
          callToAction: conceptData.callToAction,
          estimatedReach: conceptData.estimatedReach,
          estimatedEngagement: conceptData.estimatedEngagement,
          createdAt: new Date(),
        };

        return concept;
      } catch (error) {
        console.error('AI concept generation failed:', error);

        if (this.fallbackToMock) {
          console.log('Falling back to mock concept generation');
          return generateMockConcept(audienceData);
        }

        throw error;
      }
    } else {
      // OpenRouter not configured, use mock generation
      console.log('OpenRouter not configured, using mock concept generation');
      return generateMockConcept(audienceData);
    }
  }

  async remixConcept(
    originalConcept: Concept,
    audienceData: DemographicSelectionData
  ): Promise<Concept> {
    // Check if OpenRouter is configured and available
    if (this.isConfigured && this.openRouterService) {
      try {
        // Try to generate remix concept using AI
        const aiResponse =
          await this.openRouterService.remixConcept(originalConcept, audienceData);

        // Use utility function to create remix concept with fallback
        return createRemixConceptWithFallback(originalConcept, audienceData, aiResponse);
      } catch (error) {
        console.error('AI concept remix failed:', error);

        if (this.fallbackToMock) {
          console.log('Falling back to mock concept remix');
          return createRemixConceptWithFallback(originalConcept, audienceData);
        }

        throw error;
      }
    } else {
      // OpenRouter not configured, use mock remix generation
      console.log('OpenRouter not configured, using mock concept remix');
      return createRemixConceptWithFallback(originalConcept, audienceData);
    }
  }

}
