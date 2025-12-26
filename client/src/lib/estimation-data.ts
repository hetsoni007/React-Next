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

export const simpleWebsitePurposes = [
  { id: 'portfolio', name: 'Portfolio / Personal', description: 'Showcase your work, resume, or personal brand' },
  { id: 'business_landing', name: 'Business Landing Page', description: 'Single-page site to promote your business or service' },
  { id: 'company_website', name: 'Company Website', description: 'Multi-page site with about, services, contact pages' },
  { id: 'blog', name: 'Blog / Content Site', description: 'Regular content publishing with categories and search' },
  { id: 'ecommerce_basic', name: 'Simple Online Store', description: 'Basic e-commerce with product catalog and checkout' },
  { id: 'event', name: 'Event / Campaign Site', description: 'Promotional site for events, launches, or campaigns' },
];

// Feature categories - project-type specific
export type FeatureCategory = 
  | 'website_essentials'
  | 'website_content'
  | 'website_engagement'
  | 'webapp_users'
  | 'webapp_data'
  | 'webapp_workflows'
  | 'mobile_experience'
  | 'mobile_device'
  | 'integrations'
  | 'commerce'
  | 'communication';

// Website-specific categories
export const websiteFeatureCategoryLabels: Record<string, { name: string; description: string }> = {
  website_essentials: { name: 'Website Essentials', description: 'Core elements every website needs' },
  website_content: { name: 'Content & Media', description: 'How you present your content' },
  website_engagement: { name: 'Visitor Engagement', description: 'How visitors interact with your site' },
  integrations: { name: 'Connections', description: 'Link to external services' },
  commerce: { name: 'Selling Online', description: 'Accept payments and sell products' },
};

// Web app-specific categories
export const webappFeatureCategoryLabels: Record<string, { name: string; description: string }> = {
  webapp_users: { name: 'User Management', description: 'How users sign up and access your app' },
  webapp_data: { name: 'Data & Insights', description: 'Managing and analyzing information' },
  webapp_workflows: { name: 'Business Logic', description: 'Automated processes and rules' },
  communication: { name: 'Notifications & Messaging', description: 'Keeping users informed' },
  integrations: { name: 'Integrations', description: 'Connect to other services' },
  commerce: { name: 'Payments & Billing', description: 'Monetize your application' },
};

// Mobile app-specific categories
export const mobileFeatureCategoryLabels: Record<string, { name: string; description: string }> = {
  mobile_experience: { name: 'App Experience', description: 'Core mobile functionality' },
  mobile_device: { name: 'Device Features', description: 'Use phone capabilities' },
  webapp_users: { name: 'User Accounts', description: 'Sign up and authentication' },
  communication: { name: 'Notifications', description: 'Push and in-app messages' },
  commerce: { name: 'In-App Purchases', description: 'Monetization options' },
};

// Helper to get category labels based on project type
export function getFeatureCategoryLabels(projectType: string): Record<string, { name: string; description: string }> {
  if (projectType === 'simple_website') return websiteFeatureCategoryLabels;
  if (projectType === 'mobile') return mobileFeatureCategoryLabels;
  return webappFeatureCategoryLabels; // web, web_mobile
}

// Simple website features with project-specific categorization
export const simpleWebsiteFeatures: EstimationFeature[] = [
  // Website Essentials
  { id: 'responsive', name: 'Mobile Responsive', category: 'website_essentials', helperText: 'Looks great on all devices', complexityWeight: 1 },
  { id: 'custom_design', name: 'Custom Visual Design', category: 'website_essentials', helperText: 'Unique design tailored to your brand', complexityWeight: 2 },
  { id: 'seo_basic', name: 'SEO Optimization', category: 'website_essentials', helperText: 'Rank better in Google search', complexityWeight: 1 },
  { id: 'analytics_basic', name: 'Analytics Setup', category: 'website_essentials', helperText: 'Track visitor behavior', complexityWeight: 1 },
  { id: 'ssl', name: 'SSL Certificate', category: 'website_essentials', helperText: 'Secure HTTPS connection', complexityWeight: 1 },
  
  // Content & Media
  { id: 'gallery', name: 'Image Gallery', category: 'website_content', helperText: 'Showcase photos with lightbox', complexityWeight: 1 },
  { id: 'blog_section', name: 'Blog Section', category: 'website_content', helperText: 'Regular content updates', complexityWeight: 1 },
  { id: 'video_embed', name: 'Video Integration', category: 'website_content', helperText: 'Embed YouTube, Vimeo videos', complexityWeight: 1 },
  { id: 'testimonials', name: 'Testimonials', category: 'website_content', helperText: 'Display client reviews', complexityWeight: 1 },
  { id: 'animations', name: 'Micro-animations', category: 'website_content', helperText: 'Subtle polished animations', complexityWeight: 1 },
  
  // Visitor Engagement
  { id: 'contact_form', name: 'Contact Form', category: 'website_engagement', helperText: 'Let visitors message you', complexityWeight: 1 },
  { id: 'newsletter', name: 'Newsletter Signup', category: 'website_engagement', helperText: 'Collect email addresses', complexityWeight: 1 },
  { id: 'live_chat', name: 'Live Chat Widget', category: 'website_engagement', helperText: 'Real-time chat support', complexityWeight: 2 },
  { id: 'membership', name: 'Member Area', category: 'website_engagement', helperText: 'Gated content for users', complexityWeight: 2 },
  { id: 'multilingual', name: 'Multiple Languages', category: 'website_engagement', helperText: 'Content in multiple languages', complexityWeight: 2 },
  
  // Integrations
  { id: 'social_links', name: 'Social Media Links', category: 'integrations', helperText: 'Connect social profiles', complexityWeight: 1 },
  { id: 'maps', name: 'Location Map', category: 'integrations', helperText: 'Show business location', complexityWeight: 1 },
  { id: 'booking_widget', name: 'Booking Integration', category: 'integrations', helperText: 'Calendly, Acuity booking', complexityWeight: 2 },
  
  // Commerce
  { id: 'ecommerce_lite', name: 'Simple Shop', category: 'commerce', helperText: 'Sell with Stripe/PayPal', complexityWeight: 2 },
];

// Web/Mobile app features with project-specific categorization
export const features: EstimationFeature[] = [
  // User Management
  { id: 'auth', name: 'User Authentication', category: 'webapp_users', helperText: 'Login, signup, password recovery', complexityWeight: 1 },
  { id: 'user_profiles', name: 'User Profiles', category: 'webapp_users', helperText: 'Personal profiles and settings', complexityWeight: 1 },
  { id: 'roles', name: 'Role-Based Access', category: 'webapp_users', helperText: 'Different user permission levels', complexityWeight: 2 },
  { id: 'onboarding', name: 'Onboarding Flow', category: 'webapp_users', helperText: 'Guided experience for new users', complexityWeight: 1 },
  
  // Data & Insights
  { id: 'admin', name: 'Admin Dashboard', category: 'webapp_data', helperText: 'Manage users, content, settings', complexityWeight: 1 },
  { id: 'analytics', name: 'Analytics Dashboard', category: 'webapp_data', helperText: 'Charts, metrics, insights', complexityWeight: 2 },
  { id: 'reports', name: 'Custom Reports', category: 'webapp_data', helperText: 'Generate and export reports', complexityWeight: 2 },
  { id: 'data_import', name: 'Data Import/Export', category: 'webapp_data', helperText: 'CSV, Excel import/export', complexityWeight: 1 },
  { id: 'search', name: 'Search & Filters', category: 'webapp_data', helperText: 'Find content quickly', complexityWeight: 1 },
  
  // Business Logic
  { id: 'workflows', name: 'Custom Workflows', category: 'webapp_workflows', helperText: 'Multi-step processes and approvals', complexityWeight: 2 },
  { id: 'automation', name: 'Task Automation', category: 'webapp_workflows', helperText: 'Scheduled and triggered actions', complexityWeight: 2 },
  { id: 'ai', name: 'AI Features', category: 'webapp_workflows', helperText: 'Chatbots, recommendations', complexityWeight: 3 },
  { id: 'audit_logs', name: 'Audit Logs', category: 'webapp_workflows', helperText: 'Track all user actions', complexityWeight: 2 },
  
  // Communication
  { id: 'notifications', name: 'Notifications', category: 'communication', helperText: 'Email, push, in-app alerts', complexityWeight: 1 },
  { id: 'chat', name: 'Real-time Messaging', category: 'communication', helperText: 'Live chat between users', complexityWeight: 3 },
  { id: 'email_templates', name: 'Email Templates', category: 'communication', helperText: 'Branded emails', complexityWeight: 1 },
  
  // Integrations
  { id: 'api_integrations', name: 'External APIs', category: 'integrations', helperText: 'Connect to third-party services', complexityWeight: 2 },
  { id: 'webhooks', name: 'Webhooks', category: 'integrations', helperText: 'Real-time data sync', complexityWeight: 2 },
  { id: 'calendar_sync', name: 'Calendar Integration', category: 'integrations', helperText: 'Google, Outlook sync', complexityWeight: 2 },
  { id: 'multilang', name: 'Multi-language', category: 'integrations', helperText: 'Support multiple languages', complexityWeight: 2 },
  
  // Commerce
  { id: 'payments', name: 'Payment Processing', category: 'commerce', helperText: 'Stripe, PayPal integration', complexityWeight: 2 },
  { id: 'subscriptions', name: 'Subscriptions', category: 'commerce', helperText: 'Recurring billing and plans', complexityWeight: 2 },
  { id: 'invoicing', name: 'Invoicing', category: 'commerce', helperText: 'Generate and manage invoices', complexityWeight: 2 },
];

// Mobile-specific features
export const mobileFeatures: EstimationFeature[] = [
  // App Experience
  { id: 'auth', name: 'User Authentication', category: 'webapp_users', helperText: 'Login, signup, biometrics', complexityWeight: 1 },
  { id: 'user_profiles', name: 'User Profiles', category: 'webapp_users', helperText: 'Personal profiles and settings', complexityWeight: 1 },
  { id: 'onboarding', name: 'Onboarding Flow', category: 'mobile_experience', helperText: 'Welcome screens and tutorials', complexityWeight: 1 },
  { id: 'offline', name: 'Offline Mode', category: 'mobile_experience', helperText: 'Work without internet', complexityWeight: 2 },
  { id: 'search', name: 'Search & Filters', category: 'mobile_experience', helperText: 'Find content quickly', complexityWeight: 1 },
  
  // Device Features
  { id: 'camera', name: 'Camera Access', category: 'mobile_device', helperText: 'Take photos and videos', complexityWeight: 1 },
  { id: 'location', name: 'GPS Location', category: 'mobile_device', helperText: 'Track or use location', complexityWeight: 1 },
  { id: 'biometrics', name: 'Face/Fingerprint ID', category: 'mobile_device', helperText: 'Biometric authentication', complexityWeight: 1 },
  { id: 'contacts', name: 'Contact Access', category: 'mobile_device', helperText: 'Access phone contacts', complexityWeight: 1 },
  
  // Communication
  { id: 'push_notifications', name: 'Push Notifications', category: 'communication', helperText: 'Send alerts to phones', complexityWeight: 1 },
  { id: 'chat', name: 'In-App Messaging', category: 'communication', helperText: 'Chat between users', complexityWeight: 3 },
  
  // Commerce
  { id: 'iap', name: 'In-App Purchases', category: 'commerce', helperText: 'Sell within the app', complexityWeight: 2 },
  { id: 'subscriptions', name: 'Subscriptions', category: 'commerce', helperText: 'Recurring payments', complexityWeight: 2 },
];

// Tech stack options with descriptions
export const techStackOptions = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', description: 'Modern, flexible UI library' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', description: 'React framework with SSR' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', description: 'Progressive JavaScript framework' },
  { id: 'angular', name: 'Angular', category: 'frontend', description: 'Enterprise-grade framework' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', description: 'Type-safe JavaScript' },
  
  // CMS
  { id: 'wordpress', name: 'WordPress', category: 'cms', description: 'Popular content management' },
  { id: 'webflow', name: 'Webflow', category: 'cms', description: 'Visual website builder' },
  { id: 'shopify', name: 'Shopify', category: 'cms', description: 'E-commerce platform' },
  { id: 'strapi', name: 'Strapi', category: 'cms', description: 'Headless CMS' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', description: 'JavaScript runtime' },
  { id: 'python', name: 'Python / Django', category: 'backend', description: 'Versatile and readable' },
  { id: 'php', name: 'PHP / Laravel', category: 'backend', description: 'Mature web framework' },
  { id: 'dotnet', name: '.NET', category: 'backend', description: 'Microsoft ecosystem' },
  { id: 'go', name: 'Go', category: 'backend', description: 'High-performance services' },
  
  // Mobile
  { id: 'react_native', name: 'React Native', category: 'mobile', description: 'Cross-platform mobile' },
  { id: 'flutter', name: 'Flutter', category: 'mobile', description: 'Beautiful native apps' },
  { id: 'swift', name: 'Swift (iOS)', category: 'mobile', description: 'Native iOS development' },
  { id: 'kotlin', name: 'Kotlin (Android)', category: 'mobile', description: 'Native Android development' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', description: 'Reliable relational DB' },
  { id: 'mysql', name: 'MySQL', category: 'database', description: 'Popular relational DB' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', description: 'Flexible document DB' },
  { id: 'redis', name: 'Redis', category: 'database', description: 'In-memory caching' },
  { id: 'firebase', name: 'Firebase', category: 'database', description: 'Real-time database' },
  
  // Cloud
  { id: 'aws', name: 'AWS', category: 'cloud', description: 'Amazon cloud services' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', description: 'Google cloud platform' },
  { id: 'azure', name: 'Azure', category: 'cloud', description: 'Microsoft cloud' },
  { id: 'vercel', name: 'Vercel', category: 'cloud', description: 'Frontend deployment' },
  { id: 'digitalocean', name: 'DigitalOcean', category: 'cloud', description: 'Simple cloud hosting' },
  
  // Services
  { id: 'stripe', name: 'Stripe', category: 'services', description: 'Payment processing' },
  { id: 'twilio', name: 'Twilio', category: 'services', description: 'SMS and communications' },
  { id: 'sendgrid', name: 'SendGrid', category: 'services', description: 'Email delivery' },
  { id: 'openai', name: 'OpenAI', category: 'services', description: 'AI and LLM integration' },
  { id: 'auth0', name: 'Auth0', category: 'services', description: 'Authentication service' },
];

export const planningDepths = [
  { 
    id: 'quick', 
    name: 'Quick Overview', 
    description: 'High-level roadmap with key milestones',
    details: ['2-minute completion', 'AI-powered recommendations', 'Core phase breakdown']
  },
  { 
    id: 'detailed', 
    name: 'Detailed Roadmap', 
    description: 'Comprehensive technical breakdown',
    details: ['Expanded milestones', 'Architecture reasoning', 'Detailed tech stack analysis']
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

// Helper to get features based on project type
export function getFeaturesByProjectType(projectType: string): EstimationFeature[] {
  if (projectType === 'simple_website') return simpleWebsiteFeatures;
  if (projectType === 'mobile') return mobileFeatures;
  if (projectType === 'web_mobile') return [...features, ...mobileFeatures.filter(f => !features.find(ef => ef.id === f.id))];
  return features; // web
}

// Helper to get tech stack categories by project type
export function getTechStackCategoriesByProjectType(projectType: string): string[] {
  if (projectType === 'simple_website') return ['cms'];
  if (projectType === 'mobile') return ['mobile', 'backend', 'database', 'services'];
  if (projectType === 'web_mobile') return ['frontend', 'mobile', 'backend', 'database', 'cloud', 'services'];
  return ['frontend', 'backend', 'database', 'cloud', 'services']; // web
}

// Helper to get tech stack options filtered by project type
export function getTechStackByProjectType(projectType: string) {
  const categories = getTechStackCategoriesByProjectType(projectType);
  return techStackOptions.filter(t => categories.includes(t.category));
}

export function calculateComplexityLevel(selectedFeatures: string[]): 'simple' | 'moderate' | 'complex' {
  const allFeatures = [...features, ...simpleWebsiteFeatures, ...mobileFeatures];
  const totalWeight = selectedFeatures.reduce((sum, featureId) => {
    const feature = allFeatures.find(f => f.id === featureId);
    return sum + (feature?.complexityWeight || 0);
  }, 0);
  
  if (totalWeight <= 4) return 'simple';
  if (totalWeight <= 10) return 'moderate';
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

// Project phase structure (no timelines - client provides deadline)
export interface ProjectPhase {
  name: string;
  description: string;
  deliverables: string[];
}

// Requirements summary - what we'll build, not when
export interface RequirementsSummary {
  projectType: string;
  projectPurpose: string;
  features: string[];
  complexityLevel: 'simple' | 'moderate' | 'complex';
  clientDeadline: string;
  phases: ProjectPhase[];
  techStackRecommendations: { category: string; technologies: string[]; reasoning: string }[];
  manualRequirements?: string;
  preferredTechStack?: string[];
}

export function generateRequirementsSummary(
  projectType: string,
  projectPurpose: string,
  selectedFeatures: string[],
  clientDeadline: string,
  preferredTechStack: string[] = []
): RequirementsSummary {
  const complexity = calculateComplexityLevel(selectedFeatures);
  const isSimpleWebsite = projectType === 'simple_website';
  
  const allFeatures = [...features, ...simpleWebsiteFeatures, ...mobileFeatures];
  const featureNames = selectedFeatures.map(id => allFeatures.find(f => f.id === id)?.name || id);
  
  // Define project phases (what we'll do, not how long)
  const phases: ProjectPhase[] = [
    {
      name: 'Discovery & Planning',
      description: 'We understand your vision and define clear requirements',
      deliverables: ['Project scope document', 'Feature specifications', 'Technical approach'],
    },
    {
      name: 'Design',
      description: 'Creating the look and feel of your product',
      deliverables: ['Wireframes', 'Visual designs', 'Interactive prototype'],
    },
    {
      name: 'Development',
      description: 'Building your product with the selected technologies',
      deliverables: ['Working application', 'Core features implemented', 'Testing environment'],
    },
    {
      name: 'Launch',
      description: 'Deploying and going live',
      deliverables: ['Production deployment', 'Domain setup', 'Documentation'],
    },
  ];
  
  // Generate tech stack recommendations
  const techStackRecommendations = generateTechStackRecommendations(
    projectType,
    projectPurpose,
    selectedFeatures,
    preferredTechStack
  );
  
  return {
    projectType: projectTypes.find(p => p.id === projectType)?.name || projectType,
    projectPurpose: [...projectPurposes, ...simpleWebsitePurposes].find(p => p.id === projectPurpose)?.name || projectPurpose,
    features: featureNames,
    complexityLevel: complexity,
    clientDeadline,
    phases,
    techStackRecommendations,
    preferredTechStack,
  };
}

function generateTechStackRecommendations(
  projectType: string,
  projectPurpose: string,
  selectedFeatures: string[],
  preferredTechStack: string[]
): { category: string; technologies: string[]; reasoning: string }[] {
  const recommendations: { category: string; technologies: string[]; reasoning: string }[] = [];
  
  // Check if user has preferences and incorporate them
  const userPreferences = preferredTechStack.map(id => techStackOptions.find(t => t.id === id)).filter(Boolean);
  const userPreferencesByCategory: Record<string, typeof techStackOptions[0][]> = {};
  userPreferences.forEach(pref => {
    if (pref) {
      if (!userPreferencesByCategory[pref.category]) {
        userPreferencesByCategory[pref.category] = [];
      }
      userPreferencesByCategory[pref.category].push(pref);
    }
  });
  
  // Frontend recommendations
  if (projectType === 'simple_website') {
    if (userPreferencesByCategory['cms']?.length) {
      recommendations.push({
        category: 'Platform',
        technologies: userPreferencesByCategory['cms'].map(t => t.name),
        reasoning: 'Based on your preference for a website builder platform.',
      });
    } else {
      recommendations.push({
        category: 'Platform',
        technologies: ['Webflow', 'WordPress'],
        reasoning: 'Ideal for marketing sites with easy content management and no-code customization.',
      });
    }
  } else {
    // Web/Mobile apps
    if (userPreferencesByCategory['frontend']?.length) {
      recommendations.push({
        category: 'Frontend',
        technologies: userPreferencesByCategory['frontend'].map(t => t.name),
        reasoning: 'Based on your team\'s expertise and preferences.',
      });
    } else {
      if (selectedFeatures.includes('ai') || projectPurpose === 'saas') {
        recommendations.push({
          category: 'Frontend',
          technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
          reasoning: 'Next.js provides excellent performance and SEO for SaaS products with server-side rendering.',
        });
      } else {
        recommendations.push({
          category: 'Frontend',
          technologies: ['React', 'TypeScript', 'Tailwind CSS'],
          reasoning: 'React offers flexibility and a large ecosystem for building dynamic user interfaces.',
        });
      }
    }
    
    // Backend recommendations
    if (userPreferencesByCategory['backend']?.length) {
      recommendations.push({
        category: 'Backend',
        technologies: userPreferencesByCategory['backend'].map(t => t.name),
        reasoning: 'Based on your team\'s expertise and existing infrastructure.',
      });
    } else {
      if (selectedFeatures.includes('ai')) {
        recommendations.push({
          category: 'Backend',
          technologies: ['Python / FastAPI', 'Node.js'],
          reasoning: 'Python excels for AI/ML integration while Node.js handles real-time features efficiently.',
        });
      } else if (selectedFeatures.includes('chat') || selectedFeatures.includes('notifications')) {
        recommendations.push({
          category: 'Backend',
          technologies: ['Node.js', 'Express', 'Socket.io'],
          reasoning: 'Node.js is ideal for real-time applications with WebSocket support.',
        });
      } else {
        recommendations.push({
          category: 'Backend',
          technologies: ['Node.js', 'Express'],
          reasoning: 'JavaScript across the stack simplifies development and reduces context switching.',
        });
      }
    }
    
    // Database recommendations
    if (userPreferencesByCategory['database']?.length) {
      recommendations.push({
        category: 'Database',
        technologies: userPreferencesByCategory['database'].map(t => t.name),
        reasoning: 'Based on your preference and existing data infrastructure.',
      });
    } else {
      if (selectedFeatures.includes('analytics') || selectedFeatures.includes('reports')) {
        recommendations.push({
          category: 'Database',
          technologies: ['PostgreSQL', 'Redis'],
          reasoning: 'PostgreSQL handles complex queries for analytics, Redis provides fast caching.',
        });
      } else if (selectedFeatures.includes('chat')) {
        recommendations.push({
          category: 'Database',
          technologies: ['PostgreSQL', 'Redis', 'MongoDB'],
          reasoning: 'Combination of relational and document databases for chat history and user data.',
        });
      } else {
        recommendations.push({
          category: 'Database',
          technologies: ['PostgreSQL'],
          reasoning: 'Reliable, scalable, and well-supported relational database for most applications.',
        });
      }
    }
  }
  
  // Mobile recommendations
  if (projectType === 'mobile' || projectType === 'web_mobile') {
    if (userPreferencesByCategory['mobile']?.length) {
      recommendations.push({
        category: 'Mobile',
        technologies: userPreferencesByCategory['mobile'].map(t => t.name),
        reasoning: 'Based on your platform preferences and team expertise.',
      });
    } else {
      recommendations.push({
        category: 'Mobile',
        technologies: ['React Native', 'Expo'],
        reasoning: 'Share code between iOS and Android while maintaining native performance.',
      });
    }
  }
  
  // Cloud/Hosting recommendations
  if (userPreferencesByCategory['cloud']?.length) {
    recommendations.push({
      category: 'Infrastructure',
      technologies: userPreferencesByCategory['cloud'].map(t => t.name),
      reasoning: 'Based on your cloud platform preference.',
    });
  } else if (projectType !== 'simple_website') {
    if (selectedFeatures.includes('ai')) {
      recommendations.push({
        category: 'Infrastructure',
        technologies: ['AWS', 'Vercel'],
        reasoning: 'AWS provides AI/ML services, Vercel handles frontend deployment efficiently.',
      });
    } else {
      recommendations.push({
        category: 'Infrastructure',
        technologies: ['Vercel', 'Railway', 'AWS'],
        reasoning: 'Modern deployment platforms with automatic scaling and easy CI/CD.',
      });
    }
  }
  
  // Services based on features
  const services: string[] = [];
  const serviceReasons: string[] = [];
  
  if (selectedFeatures.includes('payments') || selectedFeatures.includes('ecommerce_lite') || selectedFeatures.includes('subscriptions')) {
    services.push('Stripe');
    serviceReasons.push('payment processing');
  }
  if (selectedFeatures.includes('notifications') || selectedFeatures.includes('email_templates')) {
    services.push('SendGrid', 'Resend');
    serviceReasons.push('email delivery');
  }
  if (selectedFeatures.includes('auth') || selectedFeatures.includes('membership')) {
    services.push('Auth0 or Clerk');
    serviceReasons.push('authentication');
  }
  if (selectedFeatures.includes('ai')) {
    services.push('OpenAI');
    serviceReasons.push('AI capabilities');
  }
  if (selectedFeatures.includes('analytics') || selectedFeatures.includes('analytics_basic')) {
    services.push('PostHog', 'Google Analytics');
    serviceReasons.push('product analytics');
  }
  
  if (services.length > 0) {
    recommendations.push({
      category: 'Services',
      technologies: services,
      reasoning: `Recommended integrations for ${serviceReasons.join(', ')}.`,
    });
  }
  
  return recommendations;
}

export function getTechStackRecommendation(projectType: string, selectedFeatures: string[]): string[] {
  const result = generateTechStackRecommendations(projectType, '', selectedFeatures, []);
  return result.flatMap(r => r.technologies);
}
