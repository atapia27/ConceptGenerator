/**
 * Script to add hardcoded Market audience concepts to Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.error('Please ensure .env.local contains:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Market audience data
const marketAudience = {
  name: 'Market Research Professionals',
  age: '25-34',
  profession: 'Market Research Analyst',
  location: 'Urban',
  interests: ['Data Analysis', 'Consumer Behavior', 'Business Strategy', 'Technology'],
  income: '$50,000 - $75,000',
  education: "Bachelor's Degree"
};

// Hardcoded concepts for Market audience
const marketConcepts = [
  {
    title: 'Data-Driven Market Insights Dashboard',
    description: 'A comprehensive analytics platform that transforms raw market data into actionable insights for research professionals. Features real-time data visualization, predictive analytics, and automated reporting capabilities that help analysts identify trends and make data-driven decisions faster.',
    category: 'Tech Innovation',
    target_audience: '25-34 Market Research Analysts in Urban areas with $50,000 - $75,000 income and Bachelor\'s Degree education, interested in Data Analysis, Consumer Behavior, Business Strategy, Technology',
    key_message: 'Transform complex market data into clear, actionable insights that drive business success',
    visual_elements: [
      'Interactive data visualization charts',
      'Clean, professional dashboard interface',
      'Real-time analytics indicators',
      'Modern typography and color scheme'
    ],
    call_to_action: 'Start Your Free Trial',
    estimated_reach: 25000,
    estimated_engagement: 18
  },
  {
    title: 'Consumer Behavior Intelligence Suite',
    description: 'An advanced research platform that combines survey data, social media analytics, and behavioral tracking to provide deep insights into consumer preferences and purchasing patterns. Designed specifically for market research professionals who need to understand the "why" behind consumer decisions.',
    category: 'Professional Development',
    target_audience: '25-34 Market Research Analysts in Urban areas with $50,000 - $75,000 income and Bachelor\'s Degree education, interested in Data Analysis, Consumer Behavior, Business Strategy, Technology',
    key_message: 'Unlock the psychology behind consumer decisions with advanced behavioral analytics',
    visual_elements: [
      'Consumer journey mapping visuals',
      'Behavioral pattern infographics',
      'Professional research interface',
      'Data correlation displays'
    ],
    call_to_action: 'Request Demo',
    estimated_reach: 18000,
    estimated_engagement: 22
  }
];

async function addMarketConcepts() {
  try {
    console.log('Starting to add Market audience concepts...');

    // First, check if Market audience already exists
    const { data: existingAudience, error: audienceError } = await supabase
      .from('audiences')
      .select('id')
      .eq('name', marketAudience.name)
      .single();

    let audienceId: string;

    if (existingAudience) {
      console.log('Market audience already exists, using existing ID:', existingAudience.id);
      audienceId = existingAudience.id;
    } else {
      // Create the Market audience
      console.log('Creating Market audience...');
      const { data: newAudience, error: createError } = await supabase
        .from('audiences')
        .insert([marketAudience])
        .select('id')
        .single();

      if (createError) {
        throw new Error(`Failed to create audience: ${createError.message}`);
      }

      audienceId = newAudience.id;
      console.log('Market audience created with ID:', audienceId);
    }

    // Add concepts for the Market audience
    console.log('Adding concepts for Market audience...');
    
    const conceptsWithAudienceId = marketConcepts.map(concept => ({
      ...concept,
      audience_id: audienceId
    }));

    const { data: insertedConcepts, error: conceptsError } = await supabase
      .from('concepts')
      .insert(conceptsWithAudienceId)
      .select('id, title');

    if (conceptsError) {
      throw new Error(`Failed to insert concepts: ${conceptsError.message}`);
    }

    console.log('Successfully added concepts:');
    insertedConcepts.forEach(concept => {
      console.log(`- ${concept.title} (ID: ${concept.id})`);
    });

    console.log('Market audience concepts added successfully!');

  } catch (error) {
    console.error('Error adding Market concepts:', error);
    process.exit(1);
  }
}

// Run the script
addMarketConcepts();
