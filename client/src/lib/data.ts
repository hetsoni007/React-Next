import type { PortfolioProject, CareerMilestone, Service } from "@shared/schema";

export const services: Service[] = [
  {
    id: "mobile-app",
    title: "Mobile App Development",
    icon: "smartphone",
    problem: "Enterprises and startups need high-performance mobile applications that work seamlessly across iOS and Android, but building quality apps requires specialized expertise in cross-platform development and app store optimization.",
    solution: "We build custom mobile applications using Flutter and React Native, delivering native-quality experiences for iOS and Android. From cab booking apps to retail management solutions, we create apps that scale with your business.",
  },
  {
    id: "web-development",
    title: "Web & SaaS Development",
    icon: "globe",
    problem: "Modern businesses require fast, accessible, and scalable web platforms. Whether it's a custom SaaS application or an enterprise web portal, you need a solution that performs under load and ranks well on search engines.",
    solution: "We develop custom web applications and SaaS platforms using React, Next.js, and Node.js. Our solutions include payroll management systems, retail chain software, and enterprise portals designed for businesses in USA, UK, UAE, and beyond.",
  },
  {
    id: "ui-ux",
    title: "UI/UX & Product Design",
    icon: "palette",
    problem: "Software products need intuitive interfaces that solve real user problems. Poor user experience leads to low adoption, high support costs, and missed business opportunities.",
    solution: "We combine user research, interface design, and product strategy to create digital experiences that users love. From influencer marketing platforms to enterprise dashboards, we design products that drive engagement and conversions.",
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
    id: "attendance-salary-ledger",
    title: "Attendance & Salary Ledger System",
    subtitle: "Streamlining Employee Management",
    description: "A 16-week project delivering a comprehensive platform for organizations to manage employee attendance, payroll, and salary records efficiently. The system includes web and mobile applications supporting three primary user roles: Company, Branch, and Staff with real-time attendance tracking, automated salary calculations, and centralized record management.",
    category: "Mobile App Development",
    duration: "16 weeks",
    timeline: {
      discovery: "Weeks 1-2: Stakeholder interviews to gather system requirements and research on existing attendance and payroll systems.",
      design: "Weeks 3-7: Surveys and interviews with HR managers, branch managers, and staff. Defining user personas, creating wireframes, and designing high-fidelity mockups.",
      development: "Weeks 8-15: Agile sprints for feature implementation using React (web), React Native (mobile), Node.js (backend), and MongoDB.",
      testing: "Weeks 14-16: Rigorous testing for quality assurance with iterative stakeholder feedback.",
      delivery: "Week 16: Final deployment on iOS App Store and Google Play Store with complete documentation.",
    },
    outcome: {
      problem: "Traditional methods of managing attendance and salary ledgers using spreadsheets and manual records are prone to errors, inefficiency, and lack of transparency. This results in delayed payroll processing, staff dissatisfaction, and reduced organizational productivity.",
      result: "New system reduces payroll processing time by 40%. Eliminated 15-20% payroll errors caused by manual tracking. 90% of users now have mobile access to attendance records, and employees receive real-time updates on attendance and salary details.",
    },
    images: [
      "1_1765831086263.png",
      "2_1765831086266.png",
      "3_1765831086267.png",
      "4_1765831086267.png",
      "5_1765831086268.png",
      "6_1765831086268.png",
      "7_1765831086268.png",
      "8_1765831086269.png",
    ],
    showcaseContent: [
      {
        image: "1_1765831086263.png",
        title: "Product Overview",
        description: "The Attendance and Salary Ledger System is a comprehensive platform designed for organizations to manage employee attendance, payroll, and salary records efficiently with web and mobile applications."
      },
      {
        image: "2_1765831086266.png",
        title: "About the Application",
        description: "The system supports three primary user roles: Company, Branch, and Staff. Key features include real-time attendance tracking, automated salary calculations, and centralized record management."
      },
      {
        image: "3_1765831086267.png",
        title: "Problem Statement & Goals",
        description: "Addressing manual errors in attendance tracking, lack of real-time visibility for branch managers, and delayed salary communication. Goals: Accuracy, Efficiency, Transparency, and Scalability."
      },
      {
        image: "4_1765831086267.png",
        title: "Design Process",
        description: "A structured 5-phase approach: Discovery Phase with stakeholder interviews, User Research with surveys, Conceptualization with personas and wireframes, Prototyping with high-fidelity mockups, and Agile Development."
      },
      {
        image: "5_1765831086268.png",
        title: "Unique Features",
        description: "Biometric and GPS-based attendance tracking, Customizable payroll rules for different branches, Real-time notifications for attendance irregularities, and Detailed salary breakdown with tax calculations."
      },
      {
        image: "6_1765831086268.png",
        title: "Technologies & Tools",
        description: "Design: Figma | Development: React (web), React Native (mobile), Node.js (backend), MongoDB | Collaboration: Trello | Analytics: Google Analytics, Firebase"
      },
      {
        image: "7_1765831086268.png",
        title: "Portfolio Section",
        description: "Salary Ledger with detailed reports, employee and branch management dashboard, subscription details, and account management features for comprehensive organizational control."
      },
      {
        image: "8_1765831086269.png",
        title: "Multi-Role Interface",
        description: "Branch office attendance overview, staff list with attendance marking, attendance records with date range selection, salary ledger reports, and profile update capabilities across different user roles."
      }
    ],
    roadmap: [
      { week: "1-2", phase: "Discovery", title: "System Research", description: "Stakeholder interviews and research on existing attendance and payroll systems." },
      { week: "3-5", phase: "Research", title: "User Research", description: "Surveys with 50+ HR professionals and one-on-one interviews with staff across branches." },
      { week: "6-7", phase: "Design", title: "Wireframing", description: "Defining user personas and user journeys. Creating wireframes for core features." },
      { week: "8-11", phase: "Prototyping", title: "High-Fidelity Mockups", description: "Designing high-fidelity mockups for web and mobile applications with iterative stakeholder testing." },
      { week: "12-15", phase: "Development", title: "Agile Sprints", description: "Feature implementation using React, React Native, Node.js, and MongoDB." },
      { week: "14-16", phase: "Testing", title: "QA & Launch", description: "Rigorous testing for quality assurance and final deployment." }
    ],
    targetAudience: [
      { role: "HR Managers", description: "For managing attendance and payroll for 50+ employees" },
      { role: "Payroll Officers", description: "For automated salary calculations and tax breakdowns" },
      { role: "Branch Managers", description: "For real-time branch-level attendance monitoring" },
      { role: "Employees", description: "For viewing attendance records and downloading salary slips" }
    ],
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.app.attled",
      ios: "https://apps.apple.com/cn/app/attled/id6740764400"
    },
    testimonial: {
      quote: "Het delivered a system that transformed our HR operations. The automated attendance tracking and salary calculations have eliminated errors and saved us countless hours every month.",
      author: "HR Director",
      role: "Director of Human Resources",
      company: "Enterprise Client",
    },
  },
  {
    id: "claris-influencer-platform",
    title: "Influencer Collaboration Platform",
    subtitle: "Connecting Brands with Creators",
    description: "A brand collaboration platform for models and influencers. Claris streamlines collaborations between influencers and models with carefully arranged 'pre-planned' partnerships, featuring dynamic slot booking, points systems, and seamless venue-influencer engagement.",
    category: "App Design",
    duration: "Design Project",
    displayType: "3d-mockups",
    timeline: {
      discovery: "Conducted surveys and interviews with influencers and venue managers to identify challenges in the existing collaboration process.",
      design: "Created user personas and empathy maps, developed low-fidelity sketches progressing to high-fidelity interactive prototypes.",
      development: "Brainstormed unique features including dynamic slot availability and in-app milestone tracking.",
      testing: "Conducted usability tests with 10 influencers and 10 venue managers, iterating based on feedback.",
      delivery: "Delivered complete design system with interactive prototypes ready for development.",
    },
    outcome: {
      problem: "Current collaboration between influencers and venues is fragmented, with limited platforms offering a seamless way to book slots for content creation, transparent communication, and a reward system for both influencers and venues.",
      result: "The app partnered with local influencers to showcase unique venues through curated content, driving a 35% increase in downloads and a 20% rise in venue bookings.",
    },
    images: [
      "1_1765831669484.png",
      "2_1765831669503.png",
      "3_1765831669504.png",
      "4_1765831669504.png",
      "5_1765831669504.png",
      "6_1765831669505.png",
      "7_1765831669505.png",
      "8_1765831669505.png",
    ],
    showcaseContent: [
      {
        image: "1_1765831669484.png",
        title: "Product Introduction",
        description: "Brand collaboration platform for models and influencers. Claris streamlines collaborations between influencers and models with carefully arranged 'pre-planned' partnerships."
      },
      {
        image: "2_1765831669503.png",
        title: "About the Application",
        description: "An influencer collaboration with a venues app that boosts engagement and bookings. The app partners with local influencers to showcase unique venues through curated content, such as posts, stories, and live events."
      },
      {
        image: "3_1765831669504.png",
        title: "Problem Statement & Goals",
        description: "Addressing fragmented collaboration between influencers and venues. Goals include simplifying the collaboration process, increasing transparency, providing ROI tracking tools, and enhancing influencer experience."
      },
      {
        image: "4_1765831669504.png",
        title: "Design Process",
        description: "Discovery Phase with user research, Competitive Analysis studying Airbnb Experiences and Gympass, Ideation Phase with unique features, Wireframing & Prototyping, and Usability Testing with real users."
      },
      {
        image: "5_1765831669504.png",
        title: "Application Features",
        description: "Dynamic Slot Booking with real-time availability, Points System for consistent collaboration, Content Upload tools to share content directly with venues, and Chat Integration with automated templates."
      },
      {
        image: "6_1765831669505.png",
        title: "Technologies & Tools",
        description: "Design: Figma, Sketch, Adobe XD | Collaboration: Miro, Slack, Trello | Prototyping & Testing: InVision, Maze, UsabilityHub"
      },
      {
        image: "7_1765831669505.png",
        title: "Portfolio Section",
        description: "Publish Content, Chat-Room for venue communication, Deals booking, Date Selection for scheduling, and Archive for tracking past collaborations."
      },
      {
        image: "8_1765831669505.png",
        title: "Complete App Experience",
        description: "Comprehensive view of the Claris app ecosystem featuring influencer profiles, booking flows, chat system, scheduling, and collaboration management."
      }
    ],
    features: [
      { number: "01", title: "Dynamic Slot Booking", description: "Real-time availability updates for venues" },
      { number: "02", title: "Points System", description: "Rewards for consistent collaboration and engagement" },
      { number: "03", title: "Content Upload", description: "In-app tools to share content directly with venues" },
      { number: "04", title: "Chat Integration", description: "Seamless communication with automated templates" }
    ],
    targetAudience: [
      { role: "Influencers", description: "For booking slots and showcasing content at partner venues" },
      { role: "Models", description: "For pre-planned partnership collaborations with brands" },
      { role: "Venue Managers", description: "For managing influencer bookings and tracking ROI" },
      { role: "Brand Managers", description: "For coordinating influencer campaigns and content" }
    ],
    testimonial: {
      quote: "Het's design for our influencer platform was exceptional. The user flows are intuitive and the visual design perfectly captures the creative energy of our user base.",
      author: "Product Director",
      role: "Director of Product",
      company: "Claris Platform",
    },
  },
  {
    id: "station-driver-chauffeurs",
    title: "Station Driver - Chauffeurs",
    subtitle: "Your Reliable Ride, Every Time",
    description: "Station is a user-friendly cab booking app offering reliable rides with transparent pricing, real-time tracking, and enhanced safety features. The platform revolutionizes transportation by addressing user pain points, enhancing convenience, and enabling cost-effective mobility with user-friendly interfaces and seamless booking processes.",
    category: "Mobile App Development",
    duration: "25 weeks",
    timeline: {
      discovery: "Weeks 1-2: User research and competitor analysis through surveys, interviews, and field observations with 30+ participants from metropolitan cities.",
      design: "Weeks 3-7: Define user personas, map user journeys, develop wireframes and low-fidelity prototypes. Conduct usability testing and finalize high-fidelity designs.",
      development: "Weeks 8-22: Full-stack development using Next.js, React Native, PostgreSQL with AWS cloud services. Building driver and rider apps with real-time features.",
      testing: "Weeks 23-24: Validate design with real users, gather feedback, and iterate on the experience based on user testing results.",
      delivery: "Week 25: Final deployment on iOS App Store and Google Play Store with complete documentation and handover.",
    },
    outcome: {
      problem: "People face challenges in booking reliable and affordable transportation. Existing solutions often fail to address issues such as driver cancellations, lack of transparency in fare estimation, and poor app usability.",
      result: "Created a seamless cab booking experience with minimal cancellations, transparent pricing, AI-based fare prediction, and enhanced safety features. Average booking time reduced to 3 minutes with 70% of users prioritizing safety features.",
    },
    images: [
      "1_1765832048288.png",
      "2_1765832048289.png",
      "3_1765832048290.png",
      "4_1765832048290.png",
      "5_1765832048291.png",
      "6_1765832048291.png",
      "7_1765832048292.png",
      "8_1765832048293.png",
      "9_1765832048294.png",
    ],
    showcaseContent: [
      {
        image: "1_1765832048288.png",
        title: "Product Introduction",
        description: "Station Driver is a premium chauffeur service app connecting you to your destination. A user-friendly cab booking platform offering reliable rides with transparent pricing."
      },
      {
        image: "2_1765832048289.png",
        title: "About the Application",
        description: "Whether commuting to work or catching a flight, Station ensures a seamless travel experience. Book with a few taps, choose from various vehicle options, get estimated arrival times and fare calculations upfront."
      },
      {
        image: "3_1765832048290.png",
        title: "Problem Statement & Goals",
        description: "Addressing driver cancellations, fare transparency issues, and poor app usability. Goals: reliable booking platform, transparent pricing, intuitive interface, enhanced safety, and streamlined processes."
      },
      {
        image: "4_1765832048290.png",
        title: "Design Process",
        description: "6-step process: Empathize through user research, Define problem statement, Ideate solutions, Prototype wireframes, Test with real users, and Implement with developers."
      },
      {
        image: "5_1765832048291.png",
        title: "Application Features",
        description: "Driver Rating Assurance (low-rated drivers excluded), AI-Based Fare Prediction for transparent pricing, Ride Scheduling for pre-booking, and SOS Feature with real-time location sharing."
      },
      {
        image: "6_1765832048291.png",
        title: "Technologies & Tools",
        description: "Frontend: Next.js, React Native | Database: PostgreSQL | Design: Figma | Version Control: GitLab | Cloud Services: AWS | Project Management: Trello | Time Tracking: Hubstaff"
      },
      {
        image: "7_1765832048292.png",
        title: "Driver Dashboard",
        description: "Comprehensive driver interface featuring profile management, earnings analytics, booking history, navigation integration, and real-time trip tracking."
      },
      {
        image: "8_1765832048293.png",
        title: "Portfolio Showcase",
        description: "Multi-screen experience showing chat interface, driver details, earnings tracking, account management, and booking history for complete platform overview."
      },
      {
        image: "9_1765832048294.png",
        title: "Complete App Ecosystem",
        description: "Full view of the Station platform featuring driver profiles, real-time navigation, account settings, help center, and earnings analytics across different user roles."
      }
    ],
    roadmap: [
      { week: "1-2", phase: "Discovery", title: "User Research", description: "Surveys, interviews, and field observations with 30+ participants from metropolitan cities." },
      { week: "3-4", phase: "Design", title: "User Personas", description: "Define user personas and map detailed user journeys for riders and drivers." },
      { week: "5-6", phase: "Prototyping", title: "Wireframes", description: "Develop wireframes and low-fidelity prototypes for core booking flows." },
      { week: "7", phase: "Testing", title: "Usability Testing", description: "Conduct usability testing and iterate on designs based on feedback." },
      { week: "8", phase: "Design", title: "High-Fidelity Designs", description: "Finalize high-fidelity designs and handover to development team." },
      { week: "9-22", phase: "Development", title: "Full-Stack Development", description: "Building driver and rider apps using Next.js, React Native, PostgreSQL, and AWS." },
      { week: "23-24", phase: "Testing", title: "QA & Validation", description: "Validate functionality with real users and iterate based on testing results." },
      { week: "25", phase: "Delivery", title: "Launch", description: "Final deployment on iOS App Store and Google Play Store." }
    ],
    features: [
      { number: "01", title: "Driver Rating Assurance", description: "Drivers with low ratings are excluded from the platform" },
      { number: "02", title: "AI-Based Fare Prediction", description: "Transparent and competitive pricing based on demand and traffic" },
      { number: "03", title: "Ride Scheduling", description: "Pre-book rides for later with guaranteed availability" },
      { number: "04", title: "SOS Feature", description: "Emergency assistance with real-time location sharing" }
    ],
    targetAudience: [
      { role: "Urban Commuters", description: "Daily travelers aged 18-50 seeking reliable transportation" },
      { role: "Professionals", description: "Business travelers needing punctual and comfortable rides" },
      { role: "Students", description: "Young users looking for affordable and safe transit options" },
      { role: "Tourists", description: "Visitors requiring easy navigation and reliable cab services" }
    ],
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.app.station.provider",
      ios: "https://apps.apple.com/bs/app/station-driver-chauffeurs/id6449282173"
    },
    testimonial: {
      quote: "Het's team delivered a transportation platform that exceeds industry standards. The attention to user experience, safety features, and driver management has made Station a trusted choice for urban commuters.",
      author: "Operations Director",
      role: "Director of Operations",
      company: "Station Transport",
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
