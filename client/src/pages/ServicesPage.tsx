import { Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Globe, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { usePageView } from "@/hooks/use-analytics";
import { services } from "@/lib/data";

const iconMap: Record<string, typeof Smartphone> = {
  smartphone: Smartphone,
  globe: Globe,
  palette: Palette,
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
                Services
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                I offer focused expertise in mobile and web development, 
                combining technical excellence with product thinking to deliver 
                solutions that create real value for your business.
              </p>
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

        <section className="py-20 lg:py-32 px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Ready to discuss your project?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let's explore how I can help bring your vision to life.
            </p>
            <Link href="/contact">
              <Button size="lg" className="mt-8" data-testid="button-services-cta">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
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
