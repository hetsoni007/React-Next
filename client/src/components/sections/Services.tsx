import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Globe, Palette, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { services } from "@/lib/data";
import Analytics from "@/lib/analytics";

const iconMap: Record<string, typeof Smartphone> = {
  smartphone: Smartphone,
  globe: Globe,
  palette: Palette,
};

export function Services() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            data-testid="text-services-title"
          >
            Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Focused expertise in building digital products that solve real problems 
            and create lasting value for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className={`group transition-all duration-500 shadow-lg ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                data-testid={`card-service-${service.id}`}
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>

                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium text-foreground">Challenge: </span>
                      {service.problem}
                    </p>
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium text-foreground">Solution: </span>
                      {service.solution}
                    </p>
                  </div>

                  <Link href="/contact" onClick={() => Analytics.Services.serviceClick(service.title)}>
                    <Button
                      variant="ghost"
                      className="mt-6 p-0 h-auto font-medium group/btn"
                      data-testid={`button-service-cta-${service.id}`}
                    >
                      Discuss Your Project
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
