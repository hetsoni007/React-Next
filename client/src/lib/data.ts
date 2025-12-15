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
    id: "popprobe",
    title: "POPProbe - Retail Chain Management",
    subtitle: "Streamlining multi-store operations",
    description: "A comprehensive retail chain management system designed to address key operational needs including modules for managing checklists, a Learning Management System (LMS), an issue log, and a customer log. The focus is to streamline store operations, enhance employee training, improve customer satisfaction, and ensure a structured approach to handling operational challenges.",
    category: "Mobile App Development",
    timeline: {
      discovery: "Understanding client requirements and pain points through stakeholder interviews. Retail chains face challenges in maintaining consistent operational quality, managing customer relationships, and ensuring employee readiness.",
      design: "Conducted user and competitive research to identify best practices. Sketched and wireframed solutions tailored to the identified problems using Figma.",
      development: "Built with React.js, Node.js, MongoDB for web and React Native for mobile. Integrated checklists, LMS, issue logs, and customer logs as seamless modules.",
      testing: "Refined the design based on usability tests and stakeholder inputs. Developed interactive prototypes for user feedback before final implementation.",
      delivery: "Provided detailed design assets and documentation to the development team. Successfully deployed with analytics dashboard providing actionable insights.",
    },
    outcome: {
      problem: "Current manual or semi-automated systems led to inefficiencies, unrecorded issues, and inconsistent service delivery across retail locations.",
      result: "Achieved operational efficiency through standardized store operations, enhanced staff productivity via integrated LMS, and improved customer relationship management.",
    },
    images: [],
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
