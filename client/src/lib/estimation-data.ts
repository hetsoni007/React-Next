import type { EstimationFeature } from "@shared/schema";

export const projectTypes = [
  { id: 'simple_website', name: 'Simple Website', description: 'Marketing site, portfolio, or landing page using WordPress or Webflow', icon: 'layout' },
  { id: 'web', name: 'Web Application', description: 'Browser-based application accessible from any device', icon: 'globe' },
  { id: 'mobile', name: 'Mobile Application', description: 'Native or cross-platform app for iOS and Android', icon: 'smartphone' },
  { id: 'web_mobile', name: 'Web + Mobile App', description: 'Complete solution with both web and mobile apps', icon: 'layers' },
];

export const projectPurposes = [
  { id: 'business_tool', name: 'Business / Internal Tool', description: 'Internal operations, workflow automation, or team management' },
  { id: 'saas', name: 'SaaS Product', description: 'Software-as-a-service with subscription model' },
  { id: 'marketplace', name: 'Marketplace', description: 'Platform connecting buyers and sellers or service providers' },
  { id: 'booking', name: 'Booking / Management System', description: 'Appointment scheduling, reservations, or resource management' },
  { id: 'not_sure', name: 'Not Sure Yet', description: 'I have an idea but need help defining the scope' },
];

export const features: EstimationFeature[] = [
  { id: 'auth', name: 'Login / Signup', category: 'common', helperText: 'User authentication with email, social login, or SSO', complexityWeight: 1 },
  { id: 'admin', name: 'Admin Panel', category: 'common', helperText: 'Dashboard to manage users, content, and settings', complexityWeight: 1 },
  { id: 'payments', name: 'Payments', category: 'common', helperText: 'Stripe, PayPal, or other payment gateway integration', complexityWeight: 2 },
  { id: 'notifications', name: 'Notifications', category: 'common', helperText: 'Email, push, or in-app notifications', complexityWeight: 1 },
  { id: 'search', name: 'Search & Filters', category: 'common', helperText: 'Advanced search with filtering and sorting', complexityWeight: 1 },
  { id: 'analytics', name: 'Reports / Analytics', category: 'common', helperText: 'Charts, dashboards, and data visualization', complexityWeight: 2 },
  { id: 'chat', name: 'Chat / Messaging', category: 'advanced', helperText: 'Real-time messaging between users', complexityWeight: 3 },
  { id: 'api_integrations', name: 'Third-party APIs', category: 'advanced', helperText: 'Integration with external services', complexityWeight: 2 },
  { id: 'ai', name: 'AI Feature', category: 'advanced', helperText: 'Machine learning, chatbots, or smart recommendations', complexityWeight: 3 },
  { id: 'multilang', name: 'Multi-language Support', category: 'advanced', helperText: 'Internationalization for global users', complexityWeight: 2 },
];

export const planningDepths = [
  { 
    id: 'quick', 
    name: 'Quick Planning', 
    description: 'Fast ball-park estimation with AI-filled gaps',
    details: ['2-minute completion', 'Beginner-friendly language', 'AI recommends based on similar projects']
  },
  { 
    id: 'detailed', 
    name: 'Detailed Planning', 
    description: 'For complex & long-term projects',
    details: ['Expanded milestones', 'Architecture reasoning', 'Tech stack recommendations']
  },
];

export interface RegionPricing {
  region: string;
  currency: string;
  currencySymbol: string;
  multiplier: number;
}

export const regionPricing: RegionPricing[] = [
  { region: 'US', currency: 'USD', currencySymbol: '$', multiplier: 1.0 },
  { region: 'GB', currency: 'GBP', currencySymbol: '£', multiplier: 0.79 },
  { region: 'AE', currency: 'AED', currencySymbol: 'AED ', multiplier: 3.67 },
  { region: 'EU', currency: 'EUR', currencySymbol: '€', multiplier: 0.92 },
  { region: 'AU', currency: 'AUD', currencySymbol: 'A$', multiplier: 1.53 },
  { region: 'IN', currency: 'INR', currencySymbol: '₹', multiplier: 83 },
  { region: 'DEFAULT', currency: 'USD', currencySymbol: '$', multiplier: 1.0 },
];

export const baseEstimationRates = {
  discovery: { baseWeeks: 1, baseCost: 1500 },
  design: { baseWeeks: 2, baseCost: 3000 },
  development: { baseWeeks: 6, baseCost: 12000 },
  testing: { baseWeeks: 2, baseCost: 2500 },
};

export const hostingTiers = [
  { tier: 'MVP / Small', monthly: { min: 20, max: 50 }, description: 'For early-stage apps with limited traffic' },
  { tier: 'Growth / Medium', monthly: { min: 100, max: 300 }, description: 'For growing apps with moderate traffic' },
  { tier: 'Scale / Large', monthly: { min: 500, max: 2000 }, description: 'For high-traffic production applications' },
];

export function calculateComplexityLevel(selectedFeatures: string[]): 'simple' | 'moderate' | 'complex' {
  const totalWeight = selectedFeatures.reduce((sum, featureId) => {
    const feature = features.find(f => f.id === featureId);
    return sum + (feature?.complexityWeight || 0);
  }, 0);
  
  if (totalWeight <= 4) return 'simple';
  if (totalWeight <= 8) return 'moderate';
  return 'complex';
}

export function getComplexityMultiplier(complexity: string, projectType: string): number {
  let base = 1;
  
  if (complexity === 'moderate') base = 1.5;
  if (complexity === 'complex') base = 2.2;
  
  if (projectType === 'simple_website') base *= 0.5;
  else if (projectType === 'web_mobile') base *= 1.6;
  else if (projectType === 'mobile') base *= 1.2;
  
  return base;
}

export function calculateEstimation(
  projectType: string,
  projectPurpose: string,
  selectedFeatures: string[],
  planningDepth: string,
  regionMultiplier: number
): {
  milestones: { name: string; description: string; durationWeeks: { min: number; max: number }; costRange: { min: number; max: number } }[];
  totalDuration: { min: number; max: number };
  totalCost: { min: number; max: number };
} {
  const complexity = calculateComplexityLevel(selectedFeatures);
  const multiplier = getComplexityMultiplier(complexity, projectType);
  
  const planningMultiplier = planningDepth === 'detailed' ? 1.15 : 1;
  
  const milestones = [
    {
      name: 'Discovery & Planning',
      description: 'Requirements gathering, user research, and project roadmap',
      durationWeeks: {
        min: Math.ceil(baseEstimationRates.discovery.baseWeeks * multiplier * 0.8),
        max: Math.ceil(baseEstimationRates.discovery.baseWeeks * multiplier * 1.2),
      },
      costRange: {
        min: Math.round(baseEstimationRates.discovery.baseCost * multiplier * 0.8 * regionMultiplier * planningMultiplier),
        max: Math.round(baseEstimationRates.discovery.baseCost * multiplier * 1.2 * regionMultiplier * planningMultiplier),
      },
    },
    {
      name: 'UI/UX Design',
      description: 'Wireframes, visual design, and interactive prototypes',
      durationWeeks: {
        min: Math.ceil(baseEstimationRates.design.baseWeeks * multiplier * 0.8),
        max: Math.ceil(baseEstimationRates.design.baseWeeks * multiplier * 1.3),
      },
      costRange: {
        min: Math.round(baseEstimationRates.design.baseCost * multiplier * 0.8 * regionMultiplier * planningMultiplier),
        max: Math.round(baseEstimationRates.design.baseCost * multiplier * 1.3 * regionMultiplier * planningMultiplier),
      },
    },
    {
      name: 'Development',
      description: 'Frontend and backend development with iterative releases',
      durationWeeks: {
        min: Math.ceil(baseEstimationRates.development.baseWeeks * multiplier * 0.85),
        max: Math.ceil(baseEstimationRates.development.baseWeeks * multiplier * 1.4),
      },
      costRange: {
        min: Math.round(baseEstimationRates.development.baseCost * multiplier * 0.85 * regionMultiplier * planningMultiplier),
        max: Math.round(baseEstimationRates.development.baseCost * multiplier * 1.4 * regionMultiplier * planningMultiplier),
      },
    },
    {
      name: 'Testing & Deployment',
      description: 'Quality assurance, bug fixes, and production deployment',
      durationWeeks: {
        min: Math.ceil(baseEstimationRates.testing.baseWeeks * multiplier * 0.8),
        max: Math.ceil(baseEstimationRates.testing.baseWeeks * multiplier * 1.2),
      },
      costRange: {
        min: Math.round(baseEstimationRates.testing.baseCost * multiplier * 0.8 * regionMultiplier * planningMultiplier),
        max: Math.round(baseEstimationRates.testing.baseCost * multiplier * 1.2 * regionMultiplier * planningMultiplier),
      },
    },
  ];
  
  const totalDuration = {
    min: milestones.reduce((sum, m) => sum + m.durationWeeks.min, 0),
    max: milestones.reduce((sum, m) => sum + m.durationWeeks.max, 0),
  };
  
  const totalCost = {
    min: milestones.reduce((sum, m) => sum + m.costRange.min, 0),
    max: milestones.reduce((sum, m) => sum + m.costRange.max, 0),
  };
  
  return { milestones, totalDuration, totalCost };
}

export function getTechStackRecommendation(projectType: string, selectedFeatures: string[]): string[] {
  const stack: string[] = [];
  
  if (projectType === 'web' || projectType === 'web_mobile') {
    stack.push('React / Next.js', 'Node.js', 'PostgreSQL');
  }
  
  if (projectType === 'mobile' || projectType === 'web_mobile') {
    stack.push('React Native or Flutter');
  }
  
  if (selectedFeatures.includes('payments')) {
    stack.push('Stripe Integration');
  }
  
  if (selectedFeatures.includes('chat')) {
    stack.push('WebSocket / Real-time Infrastructure');
  }
  
  if (selectedFeatures.includes('ai')) {
    stack.push('OpenAI / Custom ML Models');
  }
  
  if (selectedFeatures.includes('notifications')) {
    stack.push('Push Notification Service');
  }
  
  stack.push('Cloud Hosting (AWS / GCP / Vercel)');
  
  return stack;
}
