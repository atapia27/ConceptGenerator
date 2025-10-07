/**
 * AI Service utility functions
 */

import { OpenRouterMessage } from '../services/openRouterService';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';
import { Concept } from '../../UI/types/types';

/**
 * Create system message for concept generation
 */
export function createConceptGenerationSystemMessage(): OpenRouterMessage {
  return {
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
  };
}

/**
 * Create user message for concept generation
 */
export function createConceptGenerationUserMessage(audienceData: DemographicSelectionData): OpenRouterMessage {
  return {
    role: 'user',
    content: `Generate an advertising concept for this audience:

Age: ${audienceData.age || 'Not specified'}
Profession: ${audienceData.profession || 'Not specified'}
Location: ${audienceData.location || 'Not specified'}
Income: ${audienceData.income || 'Not specified'}
Education: ${audienceData.education || 'Not specified'}
Interests: ${audienceData.interests?.join(', ') || 'Not specified'}

Create a concept that would resonate with this specific demographic.`,
  };
}

/**
 * Create concept generation messages array
 */
export function createConceptGenerationMessages(audienceData: DemographicSelectionData): OpenRouterMessage[] {
  return [
    createConceptGenerationSystemMessage(),
    createConceptGenerationUserMessage(audienceData),
  ];
}

/**
 * Create OpenRouter API request headers
 */
export function createOpenRouterHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Concept Generator',
  };
}

/**
 * Create system message for concept remix
 */
export function createConceptRemixSystemMessage(): OpenRouterMessage {
  return {
    role: 'system',
    content: `You are an expert advertising creative director. Your task is to create a remix of an existing advertising concept, taking inspiration from the original while creating something fresh and new.

IMPORTANT: You must return a JSON object with exactly these fields:
- title: A new, engaging title for the remix concept (string)
- description: A detailed description of the remix concept that builds on the original (string) 
- keyMessage: A new core marketing message inspired by the original (string)
- category: One of these categories: Brand Awareness, Product Launch, Seasonal Campaign, Social Media, Email Marketing, Content Marketing, Influencer Partnership, Health & Wellness, Tech Innovation, Educational Content, Interest-Based Marketing, Professional Development
- visualElements: Array of 3-4 visual element descriptions that are inspired by but different from the original (string array)
- callToAction: A compelling call-to-action phrase (string)
- estimatedReach: A realistic number between 5000-100000 (number)
- estimatedEngagement: A percentage between 5-25 (number)

The remix should feel fresh and new while maintaining the core appeal of the original concept. Return ONLY the JSON object, no additional text or formatting.`,
  };
}

/**
 * Create user message for concept remix
 */
export function createConceptRemixUserMessage(originalConcept: Concept, audienceData: DemographicSelectionData): OpenRouterMessage {
  return {
    role: 'user',
    content: `Create a remix of this existing concept for the same audience:

ORIGINAL CONCEPT:
Title: ${originalConcept.title}
Description: ${originalConcept.description}
Category: ${originalConcept.category}
Key Message: ${originalConcept.keyMessage}
Visual Elements: ${originalConcept.visualElements.join(', ')}
Call to Action: ${originalConcept.callToAction}

TARGET AUDIENCE:
Age: ${audienceData.age || 'Not specified'}
Profession: ${audienceData.profession || 'Not specified'}
Location: ${audienceData.location || 'Not specified'}
Income: ${audienceData.income || 'Not specified'}
Education: ${audienceData.education || 'Not specified'}
Interests: ${audienceData.interests?.join(', ') || 'Not specified'}

Create a fresh remix that takes inspiration from the original concept while offering a new perspective and approach.`,
  };
}

/**
 * Create concept remix messages array
 */
export function createConceptRemixMessages(originalConcept: Concept, audienceData: DemographicSelectionData): OpenRouterMessage[] {
  return [
    createConceptRemixSystemMessage(),
    createConceptRemixUserMessage(originalConcept, audienceData),
  ];
}

/**
 * Create OpenRouter API request body
 */
export function createOpenRouterRequestBody(messages: OpenRouterMessage[], model: string) {
  return {
    model,
    messages,
    temperature: 0.8,
    max_tokens: 1000,
  };
}
