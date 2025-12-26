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

// Feature categories for better organization
export type FeatureCategory = 
  | 'user_experience' 
  | 'core_functionality' 
  | 'data_management' 
  | 'communication' 
  | 'integrations' 
  | 'intelligence'
  | 'design_branding'
  | 'content_media'
  | 'commerce'
  | 'security_compliance';

export const featureCategoryLabels: Record<FeatureCategory, { name: string; description: string }> = {
  user_experience: { name: 'User Experience', description: 'How users interact with your product' },
  core_functionality: { name: 'Core Functionality', description: 'Essential features for your application' },
  data_management: { name: 'Data & Analytics', description: 'Managing and understanding your data' },
  communication: { name: 'Communication', description: 'Connecting with your users' },
  integrations: { name: 'Third-Party Integrations', description: 'Connecting to external services' },
  intelligence: { name: 'Smart Features', description: 'AI and automation capabilities' },
  design_branding: { name: 'Design & Branding', description: 'Visual identity and customization' },
  content_media: { name: 'Content & Media', description: 'Managing content and media files' },
  commerce: { name: 'Commerce & Payments', description: 'Monetization and transactions' },
  security_compliance: { name: 'Security & Compliance', description: 'Protecting data and meeting regulations' },
};

// Simple website features with better categorization
export const simpleWebsiteFeatures: EstimationFeature[] = [
  // Design & Branding
  { id: 'responsive', name: 'Mobile Responsive', category: 'design_branding', helperText: 'Looks great on all devices - phones, tablets, desktops', complexityWeight: 1 },
  { id: 'custom_design', name: 'Custom Visual Design', category: 'design_branding', helperText: 'Unique design tailored to your brand identity', complexityWeight: 2 },
  { id: 'animations', name: 'Micro-animations', category: 'design_branding', helperText: 'Subtle animations for a polished feel', complexityWeight: 1 },
  
  // Communication
  { id: 'contact_form', name: 'Contact Form', category: 'communication', helperText: 'Let visitors send you messages directly', complexityWeight: 1 },
  { id: 'newsletter', name: 'Newsletter Signup', category: 'communication', helperText: 'Collect email addresses from visitors', complexityWeight: 1 },
  { id: 'live_chat', name: 'Live Chat Widget', category: 'communication', helperText: 'Real-time chat with visitors', complexityWeight: 2 },
  
  // Content & Media
  { id: 'gallery', name: 'Image Gallery', category: 'content_media', helperText: 'Showcase photos with lightbox viewing', complexityWeight: 1 },
  { id: 'blog_section', name: 'Blog Section', category: 'content_media', helperText: 'Regular content updates with categories', complexityWeight: 1 },
  { id: 'video_embed', name: 'Video Integration', category: 'content_media', helperText: 'Embed videos from YouTube, Vimeo', complexityWeight: 1 },
  { id: 'testimonials', name: 'Testimonials Section', category: 'content_media', helperText: 'Display client reviews and feedback', complexityWeight: 1 },
  
  // Data & Analytics
  { id: 'seo_basic', name: 'SEO Optimization', category: 'data_management', helperText: 'Meta tags, sitemap, and Google indexing', complexityWeight: 1 },
  { id: 'analytics_basic', name: 'Analytics Setup', category: 'data_management', helperText: 'Track visitor behavior and traffic', complexityWeight: 1 },
  
  // Integrations
  { id: 'social_links', name: 'Social Media Links', category: 'integrations', helperText: 'Connect your social profiles', complexityWeight: 1 },
  { id: 'maps', name: 'Location Map', category: 'integrations', helperText: 'Show your business location', complexityWeight: 1 },
  { id: 'booking_widget', name: 'Booking Integration', category: 'integrations', helperText: 'Calendly, Acuity, or custom booking', complexityWeight: 2 },
  
  // Commerce
  { id: 'ecommerce_lite', name: 'Simple Shop', category: 'commerce', helperText: 'Sell products with Stripe/PayPal checkout', complexityWeight: 2 },
  
  // Security
  { id: 'membership', name: 'Member Area', category: 'security_compliance', helperText: 'Gated content for logged-in users', complexityWeight: 2 },
  { id: 'ssl', name: 'SSL Certificate', category: 'security_compliance', helperText: 'Secure HTTPS connection', complexityWeight: 1 },
  
  // Smart Features
  { id: 'multilingual', name: 'Multiple Languages', category: 'intelligence', helperText: 'Site content in more than one language', complexityWeight: 2 },
];

// Web/Mobile app features with better categorization
export const features: EstimationFeature[] = [
  // User Experience
  { id: 'auth', name: 'User Authentication', category: 'user_experience', helperText: 'Login, signup, password recovery, social login', complexityWeight: 1 },
  { id: 'user_profiles', name: 'User Profiles', category: 'user_experience', helperText: 'Personal profiles with settings and preferences', complexityWeight: 1 },
  { id: 'onboarding', name: 'Onboarding Flow', category: 'user_experience', helperText: 'Guided experience for new users', complexityWeight: 1 },
  { id: 'search', name: 'Search & Filters', category: 'user_experience', helperText: 'Find content quickly with filtering and sorting', complexityWeight: 1 },
  
  // Core Functionality
  { id: 'admin', name: 'Admin Dashboard', category: 'core_functionality', helperText: 'Manage users, content, and settings', complexityWeight: 1 },
  { id: 'roles', name: 'Role-Based Access', category: 'core_functionality', helperText: 'Different permissions for different user types', complexityWeight: 2 },
  { id: 'workflows', name: 'Custom Workflows', category: 'core_functionality', helperText: 'Multi-step processes and approvals', complexityWeight: 2 },
  
  // Data & Analytics
  { id: 'analytics', name: 'Analytics Dashboard', category: 'data_management', helperText: 'Charts, metrics, and business insights', complexityWeight: 2 },
  { id: 'reports', name: 'Custom Reports', category: 'data_management', helperText: 'Generate and export data reports', complexityWeight: 2 },
  { id: 'data_import', name: 'Data Import/Export', category: 'data_management', helperText: 'CSV, Excel import and export capabilities', complexityWeight: 1 },
  
  // Communication
  { id: 'notifications', name: 'Notifications', category: 'communication', helperText: 'Email, push, or in-app notifications', complexityWeight: 1 },
  { id: 'chat', name: 'Real-time Messaging', category: 'communication', helperText: 'Live chat between users', complexityWeight: 3 },
  { id: 'email_templates', name: 'Email Templates', category: 'communication', helperText: 'Branded transactional emails', complexityWeight: 1 },
  
  // Integrations
  { id: 'api_integrations', name: 'External APIs', category: 'integrations', helperText: 'Connect to third-party services', complexityWeight: 2 },
  { id: 'webhooks', name: 'Webhooks', category: 'integrations', helperText: 'Real-time data sync with other systems', complexityWeight: 2 },
  { id: 'calendar_sync', name: 'Calendar Integration', category: 'integrations', helperText: 'Google Calendar, Outlook sync', complexityWeight: 2 },
  
  // Smart Features
  { id: 'ai', name: 'AI Features', category: 'intelligence', helperText: 'Chatbots, recommendations, automation', complexityWeight: 3 },
  { id: 'automation', name: 'Task Automation', category: 'intelligence', helperText: 'Scheduled tasks and triggered actions', complexityWeight: 2 },
  { id: 'multilang', name: 'Multi-language', category: 'intelligence', helperText: 'Internationalization for global users', complexityWeight: 2 },
  
  // Commerce
  { id: 'payments', name: 'Payment Processing', category: 'commerce', helperText: 'Stripe, PayPal integration', complexityWeight: 2 },
  { id: 'subscriptions', name: 'Subscriptions', category: 'commerce', helperText: 'Recurring billing and plans', complexityWeight: 2 },
  { id: 'invoicing', name: 'Invoicing', category: 'commerce', helperText: 'Generate and manage invoices', complexityWeight: 2 },
  
  // Security
  { id: 'audit_logs', name: 'Audit Logs', category: 'security_compliance', helperText: 'Track all user actions', complexityWeight: 2 },
  { id: 'data_encryption', name: 'Data Encryption', category: 'security_compliance', helperText: 'End-to-end encryption', complexityWeight: 2 },
  { id: 'compliance', name: 'Compliance Features', category: 'security_compliance', helperText: 'GDPR, HIPAA requirements', complexityWeight: 3 },
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

export function calculateComplexityLevel(selectedFeatures: string[]): 'simple' | 'moderate' | 'complex' {
  const allFeatures = [...features, ...simpleWebsiteFeatures];
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

// Generate roadmap milestones based on project configuration
export interface RoadmapMilestone {
  name: string;
  description: string;
  durationWeeks: { min: number; max: number };
  deliverables: string[];
  activities: string[];
}

export function generateRoadmap(
  projectType: string,
  projectPurpose: string,
  selectedFeatures: string[],
  planningDepth: string,
  preferredTechStack: string[] = []
): {
  milestones: RoadmapMilestone[];
  totalDuration: { min: number; max: number };
  recommendedTechStack: { category: string; technologies: string[]; reasoning: string }[];
} {
  const complexity = calculateComplexityLevel(selectedFeatures);
  const multiplier = getComplexityMultiplier(complexity, projectType);
  const isSimpleWebsite = projectType === 'simple_website';
  const isDetailed = planningDepth === 'detailed';
  
  const allFeatures = [...features, ...simpleWebsiteFeatures];
  const selectedFeatureObjects = selectedFeatures.map(id => allFeatures.find(f => f.id === id)).filter(Boolean);
  
  // Generate milestones based on project type
  const milestones: RoadmapMilestone[] = [];
  
  // Discovery Phase
  milestones.push({
    name: 'Discovery & Strategy',
    description: 'Understanding your business goals, target users, and defining the project scope',
    durationWeeks: {
      min: Math.ceil(0.5 * multiplier),
      max: Math.ceil(1 * multiplier),
    },
    deliverables: [
      'Project scope document',
      'User persona definitions',
      'Feature prioritization matrix',
      ...(isDetailed ? ['Competitive analysis', 'Technical feasibility assessment'] : []),
    ],
    activities: [
      'Stakeholder interviews',
      'Requirements gathering',
      'Use case definition',
      ...(isDetailed ? ['Market research', 'Risk assessment'] : []),
    ],
  });
  
  // Design Phase
  milestones.push({
    name: 'UX/UI Design',
    description: 'Creating the visual identity and user experience for your product',
    durationWeeks: {
      min: Math.ceil(1 * multiplier),
      max: Math.ceil(2 * multiplier),
    },
    deliverables: [
      'Wireframes and user flows',
      'High-fidelity mockups',
      'Interactive prototype',
      ...(isDetailed ? ['Design system documentation', 'Accessibility guidelines'] : []),
    ],
    activities: [
      'Information architecture',
      'Visual design creation',
      'Prototype testing',
      ...(isDetailed ? ['Design review sessions', 'Usability testing'] : []),
    ],
  });
  
  // Development Phase
  const devActivities = ['Frontend development', 'Backend API development', 'Database setup'];
  const devDeliverables = ['Working application', 'API documentation', 'Code repository'];
  
  if (selectedFeatures.includes('auth') || selectedFeatures.includes('membership')) {
    devActivities.push('Authentication system');
    devDeliverables.push('User authentication module');
  }
  if (selectedFeatures.includes('payments') || selectedFeatures.includes('ecommerce_lite') || selectedFeatures.includes('subscriptions')) {
    devActivities.push('Payment integration');
    devDeliverables.push('Payment processing system');
  }
  if (selectedFeatures.includes('ai') || selectedFeatures.includes('automation')) {
    devActivities.push('AI/ML integration');
    devDeliverables.push('Smart features module');
  }
  
  milestones.push({
    name: 'Development',
    description: 'Building the core functionality and features of your product',
    durationWeeks: {
      min: Math.ceil(3 * multiplier),
      max: Math.ceil(6 * multiplier),
    },
    deliverables: devDeliverables,
    activities: devActivities,
  });
  
  // Testing Phase
  milestones.push({
    name: 'Testing & QA',
    description: 'Ensuring quality, performance, and reliability before launch',
    durationWeeks: {
      min: Math.ceil(1 * multiplier),
      max: Math.ceil(2 * multiplier),
    },
    deliverables: [
      'Test documentation',
      'Bug fix reports',
      'Performance optimization',
      ...(isDetailed ? ['Security audit results', 'Load testing report'] : []),
    ],
    activities: [
      'Functional testing',
      'Cross-browser/device testing',
      'Bug fixing',
      ...(isDetailed ? ['Security testing', 'Performance testing'] : []),
    ],
  });
  
  // Launch Phase
  milestones.push({
    name: 'Deployment & Launch',
    description: 'Preparing and executing a successful product launch',
    durationWeeks: {
      min: 1,
      max: 1,
    },
    deliverables: [
      'Production deployment',
      'Domain & SSL setup',
      'Monitoring configuration',
      ...(isDetailed ? ['Launch checklist', 'Rollback procedures'] : []),
    ],
    activities: [
      'Environment setup',
      'Data migration',
      'Go-live support',
      ...(isDetailed ? ['Team training', 'Documentation handoff'] : []),
    ],
  });
  
  // Calculate total duration
  const totalDuration = {
    min: milestones.reduce((sum, m) => sum + m.durationWeeks.min, 0),
    max: milestones.reduce((sum, m) => sum + m.durationWeeks.max, 0),
  };
  
  // Generate tech stack recommendations
  const recommendedTechStack = generateTechStackRecommendations(
    projectType,
    projectPurpose,
    selectedFeatures,
    preferredTechStack
  );
  
  return { milestones, totalDuration, recommendedTechStack };
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
