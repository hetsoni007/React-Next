import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-SV93KB4BWL';

export const initializeGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

export const Analytics = {
  Navigation: {
    menuClick: (item: string) => trackEvent('Navigation', 'Menu Click', item),
    logoClick: () => trackEvent('Navigation', 'Logo Click', 'Header Logo'),
    footerLink: (link: string) => trackEvent('Navigation', 'Footer Link', link),
    breadcrumbClick: (page: string) => trackEvent('Navigation', 'Breadcrumb Click', page),
  },

  CTA: {
    heroButton: (button: string) => trackEvent('CTA', 'Hero Button Click', button),
    getConsultation: (location: string) => trackEvent('CTA', 'Get Consultation Click', location),
    viewPortfolio: (location: string) => trackEvent('CTA', 'View Portfolio Click', location),
    viewServices: (location: string) => trackEvent('CTA', 'View Services Click', location),
    contactUs: (location: string) => trackEvent('CTA', 'Contact Us Click', location),
    plannerButton: (location: string) => trackEvent('CTA', 'Project Planner Click', location),
  },

  Forms: {
    contactFormStart: () => trackEvent('Forms', 'Contact Form Started'),
    contactFormSubmit: () => trackEvent('Forms', 'Contact Form Submitted'),
    contactFormError: (error: string) => trackEvent('Forms', 'Contact Form Error', error),
    newsletterSubscribe: () => trackEvent('Forms', 'Newsletter Subscribed'),
    newsletterError: (error: string) => trackEvent('Forms', 'Newsletter Error', error),
  },

  Portfolio: {
    projectView: (projectName: string) => trackEvent('Portfolio', 'Project View', projectName),
    projectClick: (projectName: string) => trackEvent('Portfolio', 'Project Click', projectName),
    categoryFilter: (category: string) => trackEvent('Portfolio', 'Category Filter', category),
    viewAllProjects: () => trackEvent('Portfolio', 'View All Projects'),
  },

  Services: {
    serviceView: (serviceName: string) => trackEvent('Services', 'Service View', serviceName),
    serviceClick: (serviceName: string) => trackEvent('Services', 'Service Click', serviceName),
    technologyClick: (tech: string) => trackEvent('Services', 'Technology Click', tech),
  },

  Blog: {
    articleClick: (articleTitle: string) => trackEvent('Blog', 'Article Click', articleTitle),
    readMore: (articleTitle: string) => trackEvent('Blog', 'Read More Click', articleTitle),
    viewAllArticles: () => trackEvent('Blog', 'View All Articles'),
  },

  Social: {
    linkClick: (platform: string) => trackEvent('Social', 'Social Link Click', platform),
    share: (platform: string, content: string) => trackEvent('Social', 'Share', `${platform}: ${content}`),
  },

  HireBadge: {
    open: () => trackEvent('Hire Badge', 'Badge Opened'),
    close: () => trackEvent('Hire Badge', 'Badge Closed'),
    platformClick: (platform: string) => trackEvent('Hire Badge', 'Platform Click', platform),
    emailClick: () => trackEvent('Hire Badge', 'Email Click'),
  },

  Popups: {
    entrance: {
      show: () => trackEvent('Popups', 'Entrance Popup Shown'),
      dismiss: () => trackEvent('Popups', 'Entrance Popup Dismissed'),
      ctaClick: () => trackEvent('Popups', 'Entrance Popup CTA Click'),
    },
    exit: {
      show: () => trackEvent('Popups', 'Exit Popup Shown'),
      dismiss: () => trackEvent('Popups', 'Exit Popup Dismissed'),
      ctaClick: () => trackEvent('Popups', 'Exit Popup CTA Click'),
    },
    scroll: {
      show: () => trackEvent('Popups', 'Scroll Popup Shown'),
      dismiss: () => trackEvent('Popups', 'Scroll Popup Dismissed'),
      ctaClick: () => trackEvent('Popups', 'Scroll Popup CTA Click'),
    },
    floatingAssistant: {
      open: () => trackEvent('Popups', 'Floating Assistant Opened'),
      close: () => trackEvent('Popups', 'Floating Assistant Closed'),
      tipView: (tip: string) => trackEvent('Popups', 'Tip Viewed', tip),
      actionClick: (action: string) => trackEvent('Popups', 'Assistant Action Click', action),
    },
  },

  Engagement: {
    scrollDepth: (percentage: number) => trackEvent('Engagement', 'Scroll Depth', `${percentage}%`, percentage),
    timeOnPage: (seconds: number) => trackEvent('Engagement', 'Time on Page', `${seconds}s`, seconds),
    videoPlay: (videoName: string) => trackEvent('Engagement', 'Video Play', videoName),
    downloadClick: (fileName: string) => trackEvent('Engagement', 'Download Click', fileName),
  },

  Ecommerce: {
    consultationRequest: (serviceType: string) => trackEvent('Lead Generation', 'Consultation Request', serviceType),
    quoteRequest: (projectType: string) => trackEvent('Lead Generation', 'Quote Request', projectType),
  },
};

export default Analytics;
