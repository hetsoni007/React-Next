import { Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Globe, Palette, LayoutTemplate, ArrowRight, CheckCircle2, ChevronDown, Building2, Users, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { usePageView } from "@/hooks/use-analytics";
import { services } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HireUsBadge } from "@/components/HireUsBadge";

const iconMap: Record<string, typeof Smartphone> = {
  smartphone: Smartphone,
  globe: Globe,
  palette: Palette,
  layout: LayoutTemplate,
};

const serviceDetails: Record<string, string[]> = {
  "mobile-app": [
    "Native iOS and Android development",
    "Cross-platform with Flutter & React Native",
    "App Store and Play Store deployment",
    "Push notifications and real-time features",
    "Offline-first architecture",
    "Performance optimization",
  ],
  "web-development": [
    "React, Next.js, and Vue.js applications",
    "Server-side rendering and static generation",
    "Progressive Web Apps (PWA)",
    "API development with Node.js",
    "Database design and optimization",
    "Cloud deployment and scaling",
  ],
  "simple-websites": [
    "WordPress and Webflow development",
    "Landing pages and marketing sites",
    "Portfolio and small business websites",
    "SEO optimization and fast loading",
    "Easy content management",
    "Quick turnaround times",
  ],
  "ui-ux": [
    "User research and persona development",
    "Information architecture",
    "Wireframing and prototyping",
    "Visual design systems",
    "Usability testing",
    "Design handoff and documentation",
  ],
};

export default function ServicesPage() {
  usePageView("/services");
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background" data-testid="page-services">
      <Header />
      
      <main className="pt-24 lg:pt-32">
        <section
          ref={heroRef}
          className="py-16 lg:py-24 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
                data-testid="text-services-page-title"
              >
                Custom Software Development Services
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Enterprise-grade software development services for businesses worldwide. 
                From custom SaaS applications to mobile apps and web platforms, we deliver 
                scalable solutions that drive growth and operational efficiency.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>USA, UK, UAE, Europe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Startups to Enterprise</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Agile Development</span>
                </div>
              </div>
            </div>

            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon];
                const details = serviceDetails[service.id] || [];
                const isEven = index % 2 === 1;

                return (
                  <ServiceSection
                    key={service.id}
                    service={service}
                    Icon={Icon}
                    details={details}
                    isEven={isEven}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger data-testid="faq-trigger-1">
                  What custom software development services do you offer?
                </AccordionTrigger>
                <AccordionContent>
                  We offer comprehensive custom software development services including SaaS application 
                  development, mobile app development for iOS and Android, web application development, 
                  enterprise software solutions, and API development. Our expertise spans payroll management 
                  systems, retail chain management software, cab booking apps, and influencer marketing platforms.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger data-testid="faq-trigger-2">
                  Which countries and regions do you serve?
                </AccordionTrigger>
                <AccordionContent>
                  We serve clients globally with a focus on the United States, United Kingdom, United Arab 
                  Emirates, Australia, Canada, Germany, and Singapore. Our team works across time zones to 
                  ensure seamless collaboration with international clients, providing the same level of service 
                  regardless of location.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger data-testid="faq-trigger-3">
                  What technologies do you use for development?
                </AccordionTrigger>
                <AccordionContent>
                  We use modern technology stacks including React, Next.js, and Node.js for web development, 
                  Flutter and React Native for cross-platform mobile apps, PostgreSQL and MongoDB for databases, 
                  and cloud services like AWS and Google Cloud for deployment and scaling. We choose the best 
                  technology stack based on your specific project requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger data-testid="faq-trigger-4">
                  How long does a typical software development project take?
                </AccordionTrigger>
                <AccordionContent>
                  Project timelines vary based on complexity and scope. A typical MVP takes 8-12 weeks, 
                  medium-complexity applications take 12-20 weeks, while comprehensive enterprise solutions 
                  can take 20-32 weeks. We follow agile methodology with regular sprints and continuous 
                  client feedback to ensure timely delivery.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger data-testid="faq-trigger-5">
                  Do you provide post-launch support and maintenance?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we provide comprehensive post-launch support including bug fixes, performance 
                  optimization, security updates, and feature enhancements. We offer flexible maintenance 
                  packages tailored to your needs, ensuring your software remains secure, performant, and 
                  up-to-date with the latest technologies.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="py-20 lg:py-32 px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Planning a similar project? Use our Project Planner to get a personalized estimation, 
              or contact us directly to discuss your software development needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/estimate">
                <Button size="lg" data-testid="button-services-planner-cta">
                  Plan Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-services-contact-cta">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <HireUsBadge />
    </div>
  );
}

interface ServiceSectionProps {
  service: typeof services[0];
  Icon: typeof Smartphone;
  details: string[];
  isEven: boolean;
  index: number;
}

function ServiceSection({ service, Icon, details, isEven, index }: ServiceSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      data-testid={`service-detail-${service.id}`}
    >
      <div className={isEven ? "lg:order-2" : ""}>
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
          <Icon className="h-8 w-8 text-foreground" />
        </div>

        <h2 className="text-3xl font-semibold mb-4">{service.title}</h2>

        <div className="space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            <span className="font-medium text-foreground">The Challenge: </span>
            {service.problem}
          </p>
          <p className="leading-relaxed">
            <span className="font-medium text-foreground">My Approach: </span>
            {service.solution}
          </p>
        </div>

        <Link href="/contact">
          <Button className="mt-8" data-testid={`button-service-detail-cta-${service.id}`}>
            Discuss Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className={isEven ? "lg:order-1" : ""}>
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="font-semibold mb-6">What's Included</h3>
            <ul className="space-y-4">
              {details.map((detail) => (
                <li key={detail} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
