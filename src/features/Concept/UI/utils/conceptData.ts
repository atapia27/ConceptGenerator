// Shared utilities for Concept feature

import {
  Concept,
  ConceptValidationResult,
} from '../types/types';
import { DemographicSelectionData } from '@/features/AudienceDemographicData/types/types';

// Concept categories
export const CONCEPT_CATEGORIES = [
  'Brand Awareness',
  'Product Launch',
  'Seasonal Campaign',
  'Social Media',
  'Email Marketing',
  'Content Marketing',
  'Influencer Partnership',
  'Health & Wellness',
  'Tech Innovation',
  'Educational Content',
  'Interest-Based Marketing',
  'Professional Development',
] as const;

// Concept tones
export const CONCEPT_TONES = [
  'Professional',
  'Casual',
  'Humorous',
  'Inspirational',
  'Urgent',
  'Educational',
  'Emotional',
  'Playful',
] as const;


// Generate mock concepts based on audience data
export function generateMockConcepts(
  audienceData: DemographicSelectionData,
  count: number = 3
): Concept[] {
  const concepts: Concept[] = [];

  for (let i = 0; i < count; i++) {
    const category =
      CONCEPT_CATEGORIES[Math.floor(Math.random() * CONCEPT_CATEGORIES.length)];
    const tone =
      CONCEPT_TONES[Math.floor(Math.random() * CONCEPT_TONES.length)];

    const concept: Concept = {
      id: `concept-${Date.now()}-${i}`,
      title: generateConceptTitle(category, audienceData),
      description: generateConceptDescription(category, audienceData, tone),
      category,
      targetAudience: generateTargetAudienceDescription(audienceData),
      keyMessage: generateKeyMessage(category, audienceData),
      visualElements: generateVisualElements(category),
      callToAction: generateCallToAction(category, tone),
      estimatedReach: generateEstimatedReach(audienceData),
      estimatedEngagement: generateEstimatedEngagement(audienceData, category),
      createdAt: new Date(),
    };

    concepts.push(concept);
  }

  return concepts;
}

// Validate audience data
export function validateAudienceData(
  audienceData: DemographicSelectionData
): ConceptValidationResult {
  const errors: string[] = [];

  if (!audienceData.age) {
    errors.push('Age group is required');
  }

  if (!audienceData.profession) {
    errors.push('Profession is required');
  }

  if (!audienceData.location) {
    errors.push('Location is required');
  }

  if (!audienceData.income) {
    errors.push('Income level is required');
  }

  if (!audienceData.education) {
    errors.push('Education level is required');
  }

  if (!audienceData.interests || audienceData.interests.length === 0) {
    errors.push('At least one interest is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Helper functions for generating concept content
function generateConceptTitle(
  category: string,
  audienceData: DemographicSelectionData
): string {
  const titles = {
    'Brand Awareness': `Introducing ${audienceData.profession} to Our Brand`,
    'Product Launch': `New Product Launch for ${audienceData.age} ${audienceData.profession}s`,
    'Seasonal Campaign': `Seasonal Campaign for ${audienceData.location} Market`,
    'Social Media': `Social Media Campaign for ${audienceData.profession} Community`,
    'Email Marketing': `Email Campaign for ${audienceData.income} Segment`,
    'Content Marketing': `Educational Content for ${audienceData.education} Audience`,
    'Influencer Partnership': `Influencer Collaboration for ${audienceData.interests[0]} Enthusiasts`,
    'Health & Wellness': `Health & Wellness Campaign for ${audienceData.age} Group`,
    'Tech Innovation': `Tech Innovation Showcase for ${audienceData.profession}s`,
    'Educational Content': `Educational Series for ${audienceData.education} Level`,
    'Interest-Based Marketing': `Campaign for ${audienceData.interests[0]} Enthusiasts`,
    'Professional Development': `Professional Growth for ${audienceData.profession}s`,
  };

  return (
    titles[category as keyof typeof titles] ||
    `Creative Campaign for ${audienceData.profession}`
  );
}

function generateConceptDescription(
  category: string,
  audienceData: DemographicSelectionData,
  tone: string
): string {
  const baseDescription = `A ${tone.toLowerCase()} ${category.toLowerCase()} campaign targeting ${audienceData.age} ${audienceData.profession}s in ${audienceData.location}. This campaign leverages ${audienceData.interests[0]} interests to create engaging content that resonates with our ${audienceData.income} income segment.`;

  return baseDescription;
}

function generateTargetAudienceDescription(
  audienceData: DemographicSelectionData
): string {
  return `${audienceData.age} ${audienceData.profession}s in ${audienceData.location} with ${audienceData.income} income and ${audienceData.education} education, interested in ${audienceData.interests.join(', ')}`;
}

function generateKeyMessage(
  category: string,
  audienceData: DemographicSelectionData
): string {
  const messages = {
    'Brand Awareness': `Discover how our brand can enhance your ${audienceData.profession} journey`,
    'Product Launch': `Introducing the perfect solution for ${audienceData.age} ${audienceData.profession}s`,
    'Seasonal Campaign': `Make this season special with our exclusive ${audienceData.location} offer`,
    'Social Media': `Join the conversation with fellow ${audienceData.profession}s`,
    'Email Marketing': `Exclusive insights for ${audienceData.income} professionals`,
    'Content Marketing': `Learn from industry experts in your field`,
    'Influencer Partnership': `See how ${audienceData.interests[0]} experts use our products`,
    'Health & Wellness': `Transform your ${audienceData.age} lifestyle today`,
    'Tech Innovation': `Stay ahead with cutting-edge ${audienceData.profession} tools`,
    'Educational Content': `Advance your ${audienceData.education} knowledge`,
    'Interest-Based Marketing': `Connect with fellow ${audienceData.interests[0]} enthusiasts`,
    'Professional Development': `Elevate your ${audienceData.profession} career`,
  };

  return (
    messages[category as keyof typeof messages] ||
    `Experience the difference for ${audienceData.profession}s`
  );
}

function generateVisualElements(category: string): string[] {
  const elements = {
    'Brand Awareness': [
      'Brand logo',
      'Product showcase',
      'Lifestyle imagery',
      'Brand colors',
    ],
    'Product Launch': [
      'Product close-ups',
      'Feature highlights',
      'Before/after shots',
      'User testimonials',
    ],
    'Seasonal Campaign': [
      'Seasonal imagery',
      'Holiday themes',
      'Limited-time badges',
      'Festive colors',
    ],
    'Social Media': [
      'User-generated content',
      'Behind-the-scenes',
      'Interactive elements',
      'Social proof',
    ],
    'Email Marketing': [
      'Clean typography',
      'Call-to-action buttons',
      'Personalized content',
      'Mobile-optimized layout',
    ],
    'Content Marketing': [
      'Infographics',
      'Educational diagrams',
      'Expert quotes',
      'Data visualizations',
    ],
    'Influencer Partnership': [
      'Influencer photos',
      'Authentic moments',
      'Product integration',
      'User testimonials',
    ],
    'Health & Wellness': [
      'Active lifestyle',
      'Healthy products',
      'Wellness tips',
      'Motivational quotes',
    ],
    'Tech Innovation': [
      'Modern interfaces',
      'Technology showcase',
      'Innovation highlights',
      'Future concepts',
    ],
    'Educational Content': [
      'Learning materials',
      'Expert insights',
      'Step-by-step guides',
      'Knowledge sharing',
    ],
    'Interest-Based Marketing': [
      'Hobby-related imagery',
      'Community photos',
      'Interest-specific content',
      'Engagement elements',
    ],
    'Professional Development': [
      'Professional settings',
      'Career growth imagery',
      'Success stories',
      'Industry insights',
    ],
  };

  return (
    elements[category as keyof typeof elements] || [
      'Professional imagery',
      'Clear messaging',
      'Brand elements',
      'Call-to-action',
    ]
  );
}

function generateCallToAction(category: string, tone: string): string {
  const ctas = {
    Professional: 'Learn More',
    Casual: 'Check It Out',
    Humorous: 'See What Happens',
    Inspirational: 'Start Your Journey',
    Urgent: 'Act Now',
    Educational: 'Discover More',
    Emotional: 'Join Us',
    Playful: "Let's Go!",
  };

  return ctas[tone as keyof typeof ctas] || 'Learn More';
}

function generateEstimatedReach(
  audienceData: DemographicSelectionData
): number {
  // Base reach calculation based on audience characteristics
  let baseReach = 10000;

  // Adjust based on income level
  if (audienceData.income?.includes('$50,000+')) baseReach *= 1.5;
  if (audienceData.income?.includes('$25,000')) baseReach *= 1.2;

  // Adjust based on education
  if (audienceData.education?.includes('Graduate')) baseReach *= 1.3;
  if (audienceData.education?.includes('Bachelor')) baseReach *= 1.1;

  // Add some randomness
  const variation = 0.8 + Math.random() * 0.4; // 80% to 120% of base

  return Math.round(baseReach * variation);
}

function generateEstimatedEngagement(
  audienceData: DemographicSelectionData,
  category: string
): number {
  // Base engagement calculation
  let baseEngagement = 8;

  // Adjust based on category
  const categoryMultipliers = {
    'Social Media': 1.5,
    'Influencer Partnership': 1.4,
    'Content Marketing': 1.3,
    'Email Marketing': 1.2,
    'Brand Awareness': 1.1,
    'Product Launch': 1.0,
    'Seasonal Campaign': 0.9,
    'Health & Wellness': 1.2,
    'Tech Innovation': 1.1,
    'Educational Content': 1.3,
    'Interest-Based Marketing': 1.4,
    'Professional Development': 1.2,
  };

  baseEngagement *=
    categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;

  // Adjust based on interests (more interests = higher engagement)
  if (audienceData.interests.length > 3) baseEngagement *= 1.2;
  if (audienceData.interests.length > 5) baseEngagement *= 1.1;

  // Add some randomness
  const variation = 0.7 + Math.random() * 0.6; // 70% to 130% of base

  return Math.round(baseEngagement * variation);
}
