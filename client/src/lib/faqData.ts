export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

export const allFaqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        id: "how-to-get-started",
        question: "How do I get started with Soni Consultancy Services?",
        answer:
          "Start by filling out our free consultation form. We'll schedule a 30-minute discovery call to understand your requirements, timeline, and budget. No commitment needed.",
      },
      {
        id: "free-consultation",
        question: "Do you offer a free consultation?",
        answer:
          "Yes. We offer a free 30-minute consultation call for all new project inquiries. Use the form on this page to book yours.",
      },
      {
        id: "what-to-prepare",
        question: "What information should I prepare before contacting you?",
        answer:
          "It helps to have a rough idea of: what problem you're solving, your target users, your expected timeline, and your budget range. Don't worry if these aren't finalised — we help you define them.",
      },
      {
        id: "nda",
        question: "Do you sign an NDA before discussing my project?",
        answer:
          "Absolutely. We sign a mutual NDA before any detailed project discussion. Your idea is safe with us.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Budget",
    items: [
      {
        id: "how-much-does-it-cost",
        question: "How much does custom software development cost?",
        answer:
          "Costs vary by scope. A simple MVP starts from $5,000–$15,000. A full SaaS product typically ranges from $20,000–$80,000. An enterprise system can exceed $100,000. We provide a detailed quote after the discovery call at no charge.",
      },
      {
        id: "hourly-or-fixed",
        question: "Do you charge hourly or by project?",
        answer:
          "We offer both. Fixed-price projects work well for well-defined scopes. Hourly/retainer models suit ongoing development, maintenance, or when requirements are evolving. We'll recommend the best model for your situation.",
      },
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, PayPal, Wise, and Stripe. For international clients (USA, UK, UAE, Australia), we invoice in USD, GBP, AED, or AUD as preferred.",
      },
      {
        id: "minimum-project",
        question: "Is there a minimum project size?",
        answer:
          "Our minimum engagement is $3,000. This ensures we can dedicate the proper time and resources to deliver quality work.",
      },
      {
        id: "instalments",
        question: "Do you offer payment in instalments?",
        answer:
          "Yes. We typically structure payments as: 30% upfront, 40% at mid-project milestone, 30% on delivery. Custom schedules are available for larger projects.",
      },
    ],
  },
  {
    id: "process",
    title: "Process & Timeline",
    items: [
      {
        id: "how-long-saas",
        question: "How long does it take to build a SaaS application?",
        answer:
          "An MVP typically takes 8–16 weeks. A full-featured SaaS product takes 4–9 months depending on complexity. We'll give you a specific estimate after reviewing your requirements.",
      },
      {
        id: "development-process",
        question: "What does your development process look like?",
        answer:
          "We follow a 5-stage process: Discovery → Design → Development → QA & Testing → Launch & Handover. You receive progress updates every week and have access to a staging environment throughout.",
      },
      {
        id: "scope-changes",
        question: "How do you handle changes to requirements mid-project?",
        answer:
          "We use a change request process. Minor changes are absorbed into the current sprint. Significant scope changes are scoped, priced transparently, and approved by you before work begins.",
      },
      {
        id: "source-code-ownership",
        question: "Will I own the source code?",
        answer:
          "Yes. You receive 100% ownership of all source code, assets, and IP upon final payment. We can also transfer repositories directly to your GitHub/GitLab account.",
      },
      {
        id: "time-zones",
        question: "Do you work in different time zones?",
        answer:
          "Yes. Our team is based in India (IST, UTC+5:30) and we routinely collaborate with clients in USA (EST/PST), UK (GMT), UAE (GST), and Australia (AEST). We schedule overlap calls to suit your working hours.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    items: [
      {
        id: "mobile-tech",
        question: "What technologies do you use for mobile app development?",
        answer:
          "We build cross-platform apps with React Native and Flutter, and native apps with Swift (iOS) and Kotlin (Android). We recommend Flutter or React Native for most projects as they cut cost and time by ~40% vs building two separate native apps.",
      },
      {
        id: "backend-tech",
        question: "What backend technologies do you use?",
        answer:
          "Primarily Node.js, Express, and NestJS for APIs. We also work with Python (Django/FastAPI) for data-heavy or AI projects. Databases: PostgreSQL, MongoDB, MySQL, Firebase, Redis.",
      },
      {
        id: "existing-codebase",
        question: "Can you work with our existing codebase?",
        answer:
          "Yes. We regularly take over, audit, and extend existing projects. We'll do a code review first and give you an honest assessment before committing to the work.",
      },
      {
        id: "ios-android",
        question: "Do you build for iOS and Android both?",
        answer:
          "Yes. With React Native or Flutter we deliver a single codebase that runs on both platforms. We also handle App Store and Google Play submission.",
      },
      {
        id: "cloud-devops",
        question: "Do you provide cloud deployment and DevOps?",
        answer:
          "Yes. We deploy on AWS, GCP, or Azure, and set up CI/CD pipelines, Docker containers, and infrastructure-as-code (Terraform). Hosting setup is included in all full-project engagements.",
      },
    ],
  },
  {
    id: "post-launch",
    title: "Post-Launch & Support",
    items: [
      {
        id: "maintenance",
        question: "Do you provide post-launch maintenance and support?",
        answer:
          "Yes. We offer monthly maintenance retainers that include bug fixes, security updates, dependency upgrades, and minor feature additions. Plans start from $500/month.",
      },
      {
        id: "bugs-after-launch",
        question: "What happens if there are bugs after launch?",
        answer:
          "All projects include a 60-day post-launch warranty. Any bugs directly related to our code are fixed at no additional cost during this window.",
      },
      {
        id: "scaling",
        question: "Can you help scale the application as we grow?",
        answer:
          "Absolutely. We design for scalability from day one (horizontal scaling, caching layers, optimised queries). We also offer performance audits and scaling engagements as your user base grows.",
      },
      {
        id: "training",
        question: "Will you train our team to use the software you build?",
        answer:
          "Yes. Every project includes handover documentation and a training session. We also record walkthrough videos for your internal team.",
      },
    ],
  },
  {
    id: "company",
    title: "Company & Trust",
    items: [
      {
        id: "how-long-operating",
        question: "How long has Soni Consultancy Services been operating?",
        answer:
          "We've been building software products since 2020. Our portfolio includes SaaS platforms, booking apps, enterprise systems, and influencer marketing tools for clients across 10+ countries.",
      },
      {
        id: "previous-work",
        question: "Can I see examples of previous work?",
        answer:
          "Yes. Visit our /portfolio page or ask us to share relevant case studies during the discovery call. We keep some work confidential under client NDA but can share anonymised details.",
      },
      {
        id: "registered-company",
        question: "Are you a registered company?",
        answer:
          "Yes. Soni Consultancy Services is a registered business in India. We provide invoices with GST (for Indian clients) and equivalent tax documentation for international clients.",
      },
      {
        id: "startups-or-enterprise",
        question: "Do you work with startups or only enterprises?",
        answer:
          "Both. About 60% of our clients are funded or bootstrapped startups building their first product. 40% are established businesses adding new software capabilities. We adapt our process to fit either.",
      },
      {
        id: "no-outsourcing",
        question: "How do I know my project won't be outsourced or offshored?",
        answer:
          "All work is done in-house by our core team. We do not sub-contract to third parties. You'll meet the actual developers working on your project during the kickoff call.",
      },
    ],
  },
];

export const serviceOptions = [
  "SaaS Development",
  "Mobile App",
  "Enterprise Software",
  "Cab Booking App",
  "Chauffeur App",
  "Influencer Platform",
  "Payroll Software",
  "Retail Management",
  "Hire a Developer",
  "Other",
] as const;

export const sourceOptions = [
  "Google Search",
  "LinkedIn",
  "Twitter/X",
  "Referral",
  "Clutch/GoodFirms",
  "Other",
] as const;
