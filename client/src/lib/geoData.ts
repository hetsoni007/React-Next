export interface GeoPageData {
  country: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  timezone: string;
  currency: string;
  intro: string;
  painPoints: { title: string; description: string }[];
  testimonial: { quote: string; author: string; company: string };
  localBusinessSchema: {
    addressCountry: string;
    addressRegion: string;
    areaServed: string;
  };
  faqIds: string[];
}

export const geoPages: Record<string, GeoPageData> = {
  usa: {
    country: "United States",
    slug: "usa",
    metaTitle: "Software Development Company USA | Soni Consultancy",
    metaDescription:
      "Custom software development company serving the USA. SaaS, mobile apps, and enterprise software — delivered by an expert team with US timezone overlap.",
    h1: "Custom Software Development Company — USA",
    subtitle:
      "Building software products for US startups and enterprises — with the overlap hours and communication quality you expect.",
    timezone: "EST/PST (UTC−5 to UTC−8) — we schedule calls during your business hours",
    currency: "USD",
    intro:
      "The US market demands software that scales, compliance that holds, and a development partner who communicates clearly and delivers on time. Soni Consultancy Services works with US-based founders, CTOs, and product teams to build SaaS products, mobile applications, and enterprise systems — from early-stage MVP to production-scale platforms.\n\nWe understand the US startup ecosystem, the pace of iteration expected, and the quality bar that matters to your investors and customers. Our team overlaps with EST and PST for stand-ups, reviews, and quick calls — you don't lose days waiting for responses.",
    painPoints: [
      {
        title: "Offshore teams that go dark",
        description:
          "We operate with daily written updates, weekly video calls, and a live staging environment you can access at any time. You always know what's being built.",
      },
      {
        title: "Escalating SaaS licensing costs",
        description:
          "Custom software eliminates per-seat fees. For businesses spending $50k+/year on SaaS tools that don't quite fit, custom often pays for itself within 18 months.",
      },
      {
        title: "Slow time-to-market for MVPs",
        description:
          "We've shipped focused MVPs in 8–12 weeks for US clients who needed to hit fundraising deadlines and product launches. Scope discipline and experience make this possible.",
      },
    ],
    testimonial: {
      quote:
        "The team delivered exactly what they promised, on time and on budget. Communication was excellent across time zones — better than some US-based agencies we've worked with.",
      author: "[CLIENT NAME]",
      company: "[COMPANY, USA]",
    },
    localBusinessSchema: {
      addressCountry: "US",
      addressRegion: "United States",
      areaServed: "United States",
    },
    faqIds: ["time-zones", "how-much-does-it-cost", "how-long-saas", "nda", "no-outsourcing", "source-code-ownership"],
  },

  uk: {
    country: "United Kingdom",
    slug: "uk",
    metaTitle: "Custom Software Development UK | Soni Consultancy",
    metaDescription:
      "Custom software development company serving the UK. SaaS, mobile apps, and enterprise software — GDPR-compliant, IST/GMT overlap guaranteed.",
    h1: "Custom Software Development Company — UK",
    subtitle:
      "Building software for UK businesses — GDPR-compliant, GMT-compatible, and built to the quality standard the UK market expects.",
    timezone: "GMT/BST (UTC+0 to UTC+1) — IST overlaps GMT mornings perfectly for daily communication",
    currency: "GBP",
    intro:
      "The UK has one of the most active software procurement markets in the world — from London fintech startups to enterprise businesses in Manchester, Leeds, and Edinburgh looking to modernise legacy systems. Soni Consultancy Services has built software for UK clients across financial services, professional services, retail, and transport — understanding UK compliance requirements, GDPR obligations, and the quality standard that UK businesses expect.\n\nOur team in India (IST) aligns naturally with UK morning hours for stand-ups and reviews, and we're available throughout the UK business day for questions and quick calls.",
    painPoints: [
      {
        title: "GDPR compliance as an afterthought",
        description:
          "We build GDPR compliance in from the start — data minimisation, consent management, right-to-erasure workflows, and privacy-by-design architecture. No retrofitting required.",
      },
      {
        title: "London agency rates pricing you out",
        description:
          "UK development agencies charge £100–£200/hour. We deliver the same quality at a fraction of the cost, with GBP invoicing and no currency risk for you.",
      },
      {
        title: "Software that doesn't fit UK business processes",
        description:
          "US-built SaaS often assumes US tax rules, US date formats, and US workflows. Custom software is built around UK processes from the ground up.",
      },
    ],
    testimonial: {
      quote:
        "Brilliant to work with. Understood exactly what we needed, delivered clean code, and the communication was excellent throughout. Would absolutely recommend.",
      author: "[CLIENT NAME]",
      company: "[COMPANY, UK]",
    },
    localBusinessSchema: {
      addressCountry: "GB",
      addressRegion: "United Kingdom",
      areaServed: "United Kingdom",
    },
    faqIds: ["time-zones", "how-much-does-it-cost", "cloud-devops", "nda", "payment-methods", "source-code-ownership"],
  },

  uae: {
    country: "UAE",
    slug: "uae",
    metaTitle: "Software Development Company Dubai UAE | Soni Consultancy",
    metaDescription:
      "Custom software development company serving Dubai and UAE. SaaS, mobile apps, and enterprise software — AED invoicing, GST overlap, fast delivery.",
    h1: "Software Development Company — Dubai & UAE",
    subtitle:
      "Serving Dubai, Abu Dhabi, and the wider UAE with custom software that meets the ambition of the region.",
    timezone: "GST (UTC+4) — IST (UTC+5:30) gives us near-identical working hours",
    currency: "AED",
    intro:
      "The UAE is one of the fastest-growing technology markets in the world. Dubai's ambition to become a global tech hub, the rise of e-commerce and fintech in the region, and significant investment in digital transformation across government and enterprise sectors make UAE a priority market for Soni Consultancy Services.\n\nWe invoice in AED, maintain near-real-time communication (IST is just 1.5 hours ahead of GST), and have experience delivering for UAE clients across real estate, transport, retail, and professional services. We understand UAE's regulatory environment and can build for local compliance requirements.",
    painPoints: [
      {
        title: "Software built for Western markets, not the Gulf",
        description:
          "We build with Arabic RTL support, local payment gateway integration (Telr, PayFort, Stripe UAE), and UAE compliance requirements as standard.",
      },
      {
        title: "Slow enterprise procurement cycles blocking digital transformation",
        description:
          "We've worked with UAE enterprises on fast-track discovery and MVP projects that demonstrate value quickly — helping you build internal buy-in for larger investments.",
      },
      {
        title: "Overpriced Dubai-based agencies",
        description:
          "Dubai agency rates rival London. We deliver comparable quality at significantly lower cost, with AED invoicing and local tax documentation.",
      },
    ],
    testimonial: {
      quote:
        "Delivered our platform on time and handled all the local requirements we needed. Communication was seamless — almost no timezone difference makes everything easier.",
      author: "[CLIENT NAME]",
      company: "[COMPANY, Dubai, UAE]",
    },
    localBusinessSchema: {
      addressCountry: "AE",
      addressRegion: "Dubai",
      areaServed: "United Arab Emirates",
    },
    faqIds: ["time-zones", "payment-methods", "how-much-does-it-cost", "nda", "no-outsourcing", "source-code-ownership"],
  },

  australia: {
    country: "Australia",
    slug: "australia",
    metaTitle: "Software Development Company Australia | Soni Consultancy",
    metaDescription:
      "Custom software development company serving Australia. SaaS, mobile apps, and enterprise software — AUD invoicing, AEST overlap, quality code.",
    h1: "Software Development Company — Australia",
    subtitle:
      "Building software for Australian businesses — from Sydney startups to Melbourne enterprises.",
    timezone: "AEST (UTC+10/11) — we offer early morning and evening overlap for Australian clients",
    currency: "AUD",
    intro:
      "Australia's technology sector continues to grow rapidly, with strong demand for custom software in mining, agriculture, logistics, healthcare, and professional services — sectors where generic off-the-shelf software rarely fits the operational complexity. Soni Consultancy Services works with Australian businesses to build software that solves real operational problems.\n\nWe invoice in AUD, have experience working with Australian businesses across multiple sectors, and structure our working hours to maximise overlap with AEST for stand-ups and reviews.",
    painPoints: [
      {
        title: "Australian agency rates are among the highest globally",
        description:
          "Sydney and Melbourne agency rates of AUD $200–$350/hour make many software projects uneconomical. We deliver comparable quality at a fraction of the cost.",
      },
      {
        title: "Software that ignores Australian compliance",
        description:
          "We build with Australian requirements in mind — GST-compliant invoicing, Privacy Act data handling, and Australian date/number formats as standard.",
      },
      {
        title: "Industry-specific software gaps",
        description:
          "Mining, agriculture, logistics, and construction have operational needs that generic SaaS doesn't address. We build purpose-built tools for Australian industry verticals.",
      },
    ],
    testimonial: {
      quote:
        "Great experience working with the Soni Consultancy team. They understood our industry, delivered clean code, and the timezone overlap worked better than we expected.",
      author: "[CLIENT NAME]",
      company: "[COMPANY, Australia]",
    },
    localBusinessSchema: {
      addressCountry: "AU",
      addressRegion: "Australia",
      areaServed: "Australia",
    },
    faqIds: ["time-zones", "payment-methods", "how-much-does-it-cost", "nda", "development-process", "source-code-ownership"],
  },
};
