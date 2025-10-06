import {
  DemographicSelectionData,
  AudienceData,
  ValidationResult,
  DemographicVariables,
} from '../types/types';

// Static demographic data for demonstration purposes
export const DEMOGRAPHIC_VARIABLES: DemographicVariables = {
  age: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  profession: [
    'Software Engineer',
    'Marketing Manager',
    'Healthcare Professional',
    'Teacher/Educator',
    'Sales Representative',
    'Financial Advisor',
    'Designer',
    'Consultant',
    'Entrepreneur',
    'Student',
    'Retired',
    'Other',
  ],
  location: [
    'Urban',
    'Suburban',
    'Rural',
    'Major City',
    'Small Town',
    'International',
  ],
  interests: [
    'Technology',
    'Sports',
    'Music',
    'Travel',
    'Fitness',
    'Cooking',
    'Reading',
    'Gaming',
    'Art',
    'Photography',
    'Fashion',
    'Movies',
    'Outdoor Activities',
    'Business',
    'Health & Wellness',
  ],
  income: [
    'Under $30,000',
    '$30,000 - $50,000',
    '$50,000 - $75,000',
    '$75,000 - $100,000',
    '$100,000 - $150,000',
    '$150,000+',
  ],
  education: [
    'High School',
    'Some College',
    'Associate Degree',
    "Bachelor's Degree",
    "Master's Degree",
    'Doctorate',
    'Professional Degree',
  ],
};

// Mock audience data generator based on demographic selections
export const generateMockAudienceData = (
  selections: DemographicSelectionData
): AudienceData => {
  // This would typically call an LLM API, but for demo purposes we'll use static data
  const professionPreferences = {
    'Software Engineer': {
      contentTypes: ['Technical tutorials', 'Product demos', 'Industry news'],
      communicationStyle: ['Direct', 'Data-driven', 'Solution-focused'],
      brandValues: ['Innovation', 'Efficiency', 'Quality'],
      mediaChannels: ['LinkedIn', 'YouTube', 'Tech blogs', 'Podcasts'],
    },
    'Marketing Manager': {
      contentTypes: ['Case studies', 'Trend reports', 'Campaign examples'],
      communicationStyle: ['Creative', 'Persuasive', 'Results-oriented'],
      brandValues: ['Creativity', 'ROI', 'Brand awareness'],
      mediaChannels: ['Instagram', 'LinkedIn', 'Marketing blogs', 'Webinars'],
    },
    'Healthcare Professional': {
      contentTypes: [
        'Educational content',
        'Research findings',
        'Patient stories',
      ],
      communicationStyle: ['Professional', 'Empathetic', 'Evidence-based'],
      brandValues: ['Trust', 'Safety', 'Care'],
      mediaChannels: [
        'Medical journals',
        'Professional networks',
        'Email newsletters',
      ],
    },
    'Teacher/Educator': {
      contentTypes: [
        'Educational resources',
        'Teaching tips',
        'Student success stories',
      ],
      communicationStyle: ['Encouraging', 'Clear', 'Supportive'],
      brandValues: ['Education', 'Growth', 'Community'],
      mediaChannels: [
        'Educational platforms',
        'Social media',
        'Professional development sites',
      ],
    },
  };

  const agePreferences = {
    '18-24': {
      keyCharacteristics: [
        'Digital natives',
        'Social media active',
        'Value experiences',
      ],
      painPoints: ['Student debt', 'Job market competition', 'Housing costs'],
      motivations: [
        'Personal growth',
        'Social connection',
        'Career advancement',
      ],
    },
    '25-34': {
      keyCharacteristics: [
        'Career-focused',
        'Tech-savvy',
        'Work-life balance seekers',
      ],
      painPoints: [
        'Career advancement',
        'Financial planning',
        'Time management',
      ],
      motivations: [
        'Professional success',
        'Financial stability',
        'Personal fulfillment',
      ],
    },
    '35-44': {
      keyCharacteristics: [
        'Established professionals',
        'Family-oriented',
        'Quality-focused',
      ],
      painPoints: [
        'Family responsibilities',
        'Career plateau',
        'Health concerns',
      ],
      motivations: ['Family security', 'Career growth', 'Work-life balance'],
    },
    '45-54': {
      keyCharacteristics: ['Experienced', 'Stability-focused', 'Value quality'],
      painPoints: [
        'Age discrimination',
        'Health issues',
        'Retirement planning',
      ],
      motivations: [
        'Financial security',
        'Legacy building',
        'Personal satisfaction',
      ],
    },
  };

  const profession = selections.profession || 'Software Engineer';

  const age = selections.age || '25-34';

  const professionData =
    professionPreferences[profession as keyof typeof professionPreferences] ||
    professionPreferences['Software Engineer'];
  const ageData =
    agePreferences[age as keyof typeof agePreferences] ||
    agePreferences['25-34'];

  return {
    preferences: {
      contentTypes: professionData.contentTypes,
      communicationStyle: professionData.communicationStyle,
      brandValues: professionData.brandValues,
      mediaChannels: professionData.mediaChannels,
    },
    insights: {
      keyCharacteristics: ageData.keyCharacteristics,
      painPoints: ageData.painPoints,
      motivations: ageData.motivations,
      behaviors: [
        'Prefers mobile-first experiences',
        'Values authentic brand communication',
        'Seeks social proof before purchasing',
        'Engages with interactive content',
      ],
    },
    statistics: {
      engagementRate: Math.floor(Math.random() * 20) + 15, // 15-35%
      conversionRate: Math.floor(Math.random() * 5) + 2, // 2-7%
      averageSpend: Math.floor(Math.random() * 200) + 100, // $100-300
      brandLoyalty: Math.floor(Math.random() * 30) + 40, // 40-70%
    },
  };
};

// Utility function to validate demographic selections
export const validateDemographicSelections = (
  selections: DemographicSelectionData
): ValidationResult => {
  const errors: string[] = [];

  if (!selections.age) errors.push('Age group is required');
  if (!selections.profession) errors.push('Profession is required');
  if (!selections.location) errors.push('Location is required');
  if (!selections.interests || selections.interests.length === 0)
    errors.push('At least one interest is required');
  if (!selections.income) errors.push('Income level is required');
  if (!selections.education) errors.push('Education level is required');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Function to generate random default selections
export const getRandomDefaultSelections = (): DemographicSelectionData => {
  const getRandomItem = (array: string[]) =>
    array[Math.floor(Math.random() * array.length)];
  const getRandomItems = (array: string[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return {
    age: getRandomItem(DEMOGRAPHIC_VARIABLES.age),
    profession: getRandomItem(DEMOGRAPHIC_VARIABLES.profession),
    location: getRandomItem(DEMOGRAPHIC_VARIABLES.location),
    interests: getRandomItems(DEMOGRAPHIC_VARIABLES.interests, 3), // Select 3 random interests
    income: getRandomItem(DEMOGRAPHIC_VARIABLES.income),
    education: getRandomItem(DEMOGRAPHIC_VARIABLES.education),
  };
};
