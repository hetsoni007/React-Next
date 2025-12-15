import type { PortfolioProject, CareerMilestone, Service } from "@shared/schema";

export const services: Service[] = [
  {
    id: "mobile-app",
    title: "Mobile App Development",
    icon: "smartphone",
    problem: "Your business needs to reach users on-the-go, but building a quality mobile app requires specialized expertise and significant investment.",
    solution: "I craft native and cross-platform mobile applications using Flutter and React Native that deliver exceptional user experiences while optimizing development time and cost.",
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: "globe",
    problem: "Your web presence needs to be fast, accessible, and scalable, but achieving all three without compromise is challenging.",
    solution: "I build modern web applications with React, Next.js, and Node.js that load instantly, rank well on search engines, and scale effortlessly with your growth.",
  },
  {
    id: "ui-ux",
    title: "UI/UX & Product Thinking",
    icon: "palette",
    problem: "Great products require more than just code — they need thoughtful design that solves real user problems and creates lasting engagement.",
    solution: "I approach every project with a product mindset, combining user research, intuitive interfaces, and strategic thinking to create experiences users love.",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "retail-supply-chain",
    title: "Retail Supply Chain Industry",
    subtitle: "Comprehensive Chain Management System",
    description: "A 32-week project delivering a comprehensive Retail Chain Management tool designed to address key operational needs. The system includes modules for managing checklists, a Learning Management System (LMS), an issue log, and a customer log. Built to streamline store operations, enhance employee training, improve customer satisfaction, and ensure a structured approach to handling operational challenges across multiple store locations.",
    category: "Mobile App Development",
    duration: "32 weeks",
    timeline: {
      discovery: "Weeks 1-2: Requirement gathering and user research through stakeholder interviews, surveys, and shadowing store employees to understand pain points in daily operations.",
      design: "Weeks 3-6: Wireframing, low-fidelity prototypes, high-fidelity designs using Figma, and comprehensive usability testing with store managers and employees.",
      development: "Weeks 7-24: Built with React.js, Node.js, MongoDB for web and React Native for mobile. Integrated four core modules: Checklists, LMS, Issue Logs, and Customer Logs.",
      testing: "Weeks 25-30: Refined designs based on usability tests. Validated functionality with QA team and iterated based on stakeholder feedback.",
      delivery: "Weeks 31-32: Final design delivery, development hand-off with detailed documentation. Deployed on iOS App Store and Google Play Store.",
    },
    outcome: {
      problem: "Retail chains faced challenges maintaining consistent operational quality. Manual or semi-automated systems led to inefficiencies, unrecorded issues, and inconsistent service delivery.",
      result: "Delivered operational efficiency through standardized checklists, enhanced staff productivity via gamified LMS, improved customer relationship management, and actionable data insights through comprehensive analytics dashboard.",
    },
    images: [
      "1_1765830109261.png",
      "2_1765830109266.png",
      "3_1765830109266.png",
      "4_1765830109266.png",
      "5_1765830109266.png",
      "6_1765830109266.png",
      "7_1765830109267.png",
      "8_1765830109267.png",
      "9_1765830109267.png",
    ],
    showcaseContent: [
      {
        image: "1_1765830109261.png",
        title: "Product Overview",
        description: "A comprehensive Retail Chain Management tool overseeing operations across multiple store locations to ensure consistency, efficiency, and profitability through inventory optimization, supply chain integration, and customer engagement."
      },
      {
        image: "2_1765830109266.png",
        title: "About the Application",
        description: "The system includes modules for managing checklists, a Learning Management System (LMS), an issue log, and a customer log. Built to streamline store operations and enhance employee training."
      },
      {
        image: "3_1765830109266.png",
        title: "Problem Statement & Goals",
        description: "Addressing challenges in maintaining operational quality, managing customer relationships, and ensuring employee readiness. Goals include operational efficiency, employee training, customer engagement, and data insights."
      },
      {
        image: "4_1765830109266.png",
        title: "Design Process",
        description: "A structured 6-phase approach: Discovery Phase, Research Phase, Ideation, Prototyping, Testing and Iteration, and Development Hand-off with detailed design assets."
      },
      {
        image: "5_1765830109266.png",
        title: "Application Features",
        description: "Integrated Modules for seamless connection, Customizable Checklists tailored to store-specific operations, Analytics Dashboard for actionable insights, and Gamified Learning to incentivize employee engagement."
      },
      {
        image: "6_1765830109266.png",
        title: "Technologies & Tools",
        description: "Design: Figma | Development: React.js, Node.js, MongoDB, React Native | Project Management: Jira | User Research: Google Forms, Hotjar"
      },
      {
        image: "7_1765830109267.png",
        title: "Portfolio Showcase",
        description: "Comprehensive notification system, checklist management with progress tracking, and detailed database cleaning workflows for store operations."
      },
      {
        image: "8_1765830109267.png",
        title: "User Interface Modules",
        description: "Profile management, checklist tracking with completion status, training modules with assessment tracking, and PDF report generation capabilities."
      },
      {
        image: "9_1765830109267.png",
        title: "Multi-Device Experience",
        description: "Seamless experience across devices with consistent UI/UX, enabling store managers and employees to access the system from anywhere."
      }
    ],
    roadmap: [
      { week: "1-2", phase: "Discovery", title: "Requirement Gathering", description: "User research through stakeholder interviews, surveys, and shadowing store employees." },
      { week: "3-4", phase: "Ideation", title: "Wireframing", description: "Low-fidelity prototypes and initial wireframe development." },
      { week: "5-6", phase: "Design", title: "High-Fidelity Designs", description: "Detailed UI designs in Figma and comprehensive usability testing." },
      { week: "7-8", phase: "Iteration", title: "Design Refinement", description: "Iterations based on feedback and final design delivery." },
      { week: "9-24", phase: "Development", title: "Core Development", description: "Building all four modules with React.js, Node.js, MongoDB, and React Native." },
      { week: "25-30", phase: "Testing", title: "QA & Validation", description: "Functionality validation, usability tests, and stakeholder feedback incorporation." },
      { week: "31-32", phase: "Delivery", title: "Launch", description: "App Store and Play Store deployment with full documentation." }
    ],
    targetAudience: [
      { role: "Store Managers", description: "For operational checklists and issue tracking" },
      { role: "Employees", description: "For training via the LMS and access to learning materials" },
      { role: "Customers", description: "Indirectly benefitting from improved service quality" },
      { role: "Head Office Teams", description: "For centralized reporting and data analysis" }
    ],
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.app.popprobe",
      ios: "https://apps.apple.com/in/app/popprobe/id1617582763"
    },
    testimonial: {
      quote: "Het delivered a system that transformed how we manage our retail operations. The integrated approach to checklists, training, and customer logs has significantly improved our consistency across all locations.",
      author: "Retail Operations Director",
      role: "Director of Operations",
      company: "Enterprise Retail Client",
    },
  },
  {
    id: "project-2",
    title: "Healthcare Companion",
    subtitle: "Connecting patients with care",
    description: "A telehealth platform enabling seamless virtual consultations, prescription management, and health tracking for patients worldwide.",
    category: "Mobile App Development",
    timeline: {
      discovery: "Identified the need for accessible healthcare during the global shift to remote services.",
      design: "Focused on accessibility and ease of use for users of all ages and technical abilities.",
      development: "Implemented real-time video consultations, secure messaging, and HIPAA-compliant data handling.",
      testing: "Partnered with healthcare providers for clinical validation and compliance verification.",
      delivery: "Successfully deployed across 3 countries with integration into existing healthcare systems.",
    },
    outcome: {
      problem: "Patients faced barriers accessing healthcare due to distance, mobility, or scheduling constraints.",
      result: "Facilitated 10,000+ virtual consultations in the first quarter post-launch.",
    },
    images: [],
    testimonial: {
      quote: "The platform Het built has revolutionized how we deliver care. Patients love the simplicity, and our providers find it intuitive to use.",
      author: "Dr. Michael Torres",
      role: "Medical Director",
      company: "MedConnect Health",
    },
  },
  {
    id: "project-3",
    title: "E-Commerce Marketplace",
    subtitle: "Local businesses, global reach",
    description: "A marketplace platform empowering local artisans and small businesses to showcase and sell their products to a global audience.",
    category: "Mobile App Development",
    timeline: {
      discovery: "Research showed small businesses lacked affordable platforms with professional-grade features.",
      design: "Created a warm, inviting interface that highlights product craftsmanship and seller stories.",
      development: "Built with React Native, featuring real-time inventory, secure payments, and seller analytics.",
      testing: "Onboarded 100+ pilot sellers for extensive marketplace testing and optimization.",
      delivery: "Launched with a curated selection of 500+ products and growing seller community.",
    },
    outcome: {
      problem: "Small businesses struggled to compete with large e-commerce platforms.",
      result: "Sellers reported 150% average increase in online sales within 6 months.",
    },
    images: [],
    testimonial: {
      quote: "Het understood our mission to empower small businesses. The marketplace he created captures the essence of handcrafted quality while being incredibly easy to use.",
      author: "Emily Rodriguez",
      role: "Founder",
      company: "Artisan Collective",
    },
  },
  {
    id: "project-4",
    title: "Fitness & Wellness Tracker",
    subtitle: "Your personal health journey",
    description: "A holistic wellness application combining workout tracking, nutrition planning, and mindfulness features for a balanced approach to health.",
    category: "Mobile App Development",
    timeline: {
      discovery: "Users wanted a single app that addressed physical, nutritional, and mental wellness.",
      design: "Developed a calming visual language with progress visualizations that motivate without overwhelming.",
      development: "Integrated with wearables, built AI-powered meal suggestions, and created guided meditation features.",
      testing: "Ran a 30-day challenge with fitness influencers to validate engagement and effectiveness.",
      delivery: "Achieved 200,000+ downloads in the first year with strong user retention.",
    },
    outcome: {
      problem: "Users juggled multiple apps for different aspects of their wellness routine.",
      result: "85% of users reported improved consistency in their health habits.",
    },
    images: [],
    testimonial: {
      quote: "Working with Het was a game-changer for our wellness platform. He brought both technical excellence and a genuine understanding of what motivates users to stay healthy.",
      author: "James Park",
      role: "CEO",
      company: "Vitality Labs",
    },
  },
];

export const careerMilestones: CareerMilestone[] = [
  {
    year: "2019",
    title: "Business Development Executive",
    description: "Started my journey in the tech industry, learning the foundations of client relationships and understanding market needs.",
  },
  {
    year: "2022",
    title: "Senior Business Development Executive",
    description: "Grew into a leadership role, managing key accounts and developing strategies that drove significant revenue growth.",
  },
  {
    year: "2023",
    title: "Business Development Manager",
    description: "Led a team of professionals, establishing processes and partnerships that expanded our market presence.",
  },
  {
    year: "2023",
    title: "COO, Way To React Technologies",
    company: "Way To React Technologies",
    description: "Took on operational leadership, overseeing project delivery and building a culture of excellence in software development.",
  },
  {
    year: "2024",
    title: "CEO & Founder, Soni Consultancy Services",
    company: "Soni Consultancy Services",
    description: "Founded my own consultancy to help businesses build exceptional digital products with a focus on quality, user experience, and measurable results.",
  },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/hetsoni/",
  twitter: "https://x.com/CodeMak_",
  instagram: "https://www.instagram.com/hetsoni_98/",
  email: "het.soni@soniconsultancyservices.com",
  medium: "https://medium.com/@hetsoni9398",
};

export const projectTypes = [
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "web-app", label: "Web Application" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "consulting", label: "Technical Consulting" },
  { value: "other", label: "Other" },
];
