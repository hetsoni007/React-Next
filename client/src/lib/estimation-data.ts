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

// Simple website purposes (for WordPress/Webflow projects)
export const simpleWebsitePurposes = [
  { id: 'portfolio', name: 'Portfolio / Personal', description: 'Showcase your work, resume, or personal brand' },
  { id: 'business_landing', name: 'Business Landing Page', description: 'Single-page site to promote your business or service' },
  { id: 'company_website', name: 'Company Website', description: 'Multi-page site with about, services, contact pages' },
  { id: 'blog', name: 'Blog / Content Site', description: 'Regular content publishing with categories and search' },
  { id: 'ecommerce_basic', name: 'Simple Online Store', description: 'Basic e-commerce with product catalog and checkout' },
  { id: 'event', name: 'Event / Campaign Site', description: 'Promotional site for events, launches, or campaigns' },
];

// Simple website features
export const simpleWebsiteFeatures: EstimationFeature[] = [
  { id: 'responsive', name: 'Mobile Responsive', category: 'common', helperText: 'Looks great on all devices - phones, tablets, desktops', complexityWeight: 1 },
  { id: 'contact_form', name: 'Contact Form', category: 'common', helperText: 'Let visitors send you messages directly', complexityWeight: 1 },
  { id: 'gallery', name: 'Image Gallery', category: 'common', helperText: 'Showcase photos with lightbox viewing', complexityWeight: 1 },
  { id: 'blog_section', name: 'Blog Section', category: 'common', helperText: 'Regular content updates with categories', complexityWeight: 1 },
  { id: 'seo_basic', name: 'Basic SEO', category: 'common', helperText: 'Meta tags, sitemap, and Google indexing', complexityWeight: 1 },
  { id: 'social_links', name: 'Social Media Links', category: 'common', helperText: 'Connect your social profiles', complexityWeight: 1 },
  { id: 'newsletter', name: 'Newsletter Signup', category: 'common', helperText: 'Collect email addresses from visitors', complexityWeight: 1 },
  { id: 'testimonials', name: 'Testimonials Section', category: 'common', helperText: 'Display client reviews and feedback', complexityWeight: 1 },
  { id: 'analytics_basic', name: 'Google Analytics', category: 'common', helperText: 'Track visitor behavior and traffic', complexityWeight: 1 },
  { id: 'maps', name: 'Google Maps', category: 'common', helperText: 'Show your business location', complexityWeight: 1 },
  { id: 'scheduling', name: 'Appointment Booking', category: 'advanced', helperText: 'Let clients book appointments online', complexityWeight: 2 },
  { id: 'ecommerce_lite', name: 'Simple Shop', category: 'advanced', helperText: 'Sell products with Stripe/PayPal checkout', complexityWeight: 2 },
  { id: 'membership', name: 'Member Area', category: 'advanced', helperText: 'Gated content for logged-in users', complexityWeight: 2 },
  { id: 'multilingual', name: 'Multiple Languages', category: 'advanced', helperText: 'Site content in more than one language', complexityWeight: 2 },
];

// Common tech stack options for manual selection
export const techStackOptions = [
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend' },
  { id: 'vue', name: 'Vue.js', category: 'frontend' },
  { id: 'angular', name: 'Angular', category: 'frontend' },
  { id: 'wordpress', name: 'WordPress', category: 'cms' },
  { id: 'webflow', name: 'Webflow', category: 'cms' },
  { id: 'shopify', name: 'Shopify', category: 'cms' },
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'python', name: 'Python / Django', category: 'backend' },
  { id: 'php', name: 'PHP / Laravel', category: 'backend' },
  { id: 'dotnet', name: '.NET', category: 'backend' },
  { id: 'react_native', name: 'React Native', category: 'mobile' },
  { id: 'flutter', name: 'Flutter', category: 'mobile' },
  { id: 'swift', name: 'Swift (iOS)', category: 'mobile' },
  { id: 'kotlin', name: 'Kotlin (Android)', category: 'mobile' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database' },
  { id: 'mysql', name: 'MySQL', category: 'database' },
  { id: 'mongodb', name: 'MongoDB', category: 'database' },
  { id: 'firebase', name: 'Firebase', category: 'database' },
  { id: 'aws', name: 'AWS', category: 'hosting' },
  { id: 'gcp', name: 'Google Cloud', category: 'hosting' },
  { id: 'vercel', name: 'Vercel', category: 'hosting' },
  { id: 'stripe', name: 'Stripe', category: 'integration' },
  { id: 'twilio', name: 'Twilio', category: 'integration' },
  { id: 'openai', name: 'OpenAI / AI', category: 'integration' },
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

export const timelinePreferences = [
  { 
    id: 'immediate', 
    name: 'Immediate', 
    description: 'High priority. We will review feasibility and suggest the best approach.',
  },
  { 
    id: '1_3_weeks', 
    name: '1-3 weeks', 
    description: 'Suitable for small scope or MVP projects.',
  },
  { 
    id: '1_month', 
    name: '1 month', 
    description: 'Balanced timeline for planning and execution.',
  },
  { 
    id: '1_3_months', 
    name: '1-3 months', 
    description: 'Ideal for larger or phased projects.',
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
