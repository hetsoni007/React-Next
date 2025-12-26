import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Smartphone, Monitor, HelpCircle, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Analytics from "@/lib/analytics";

const options = [
  {
    id: "website",
    title: "Website",
    description: "A professional online presence to showcase your business",
    icon: Globe,
    href: "/estimate",
  },
  {
    id: "web-app",
    title: "Web Application",
    description: "A custom tool or platform that users interact with",
    icon: Monitor,
    href: "/estimate",
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "An iOS or Android app for your customers or team",
    icon: Smartphone,
    href: "/estimate",
  },
  {
    id: "not-sure",
    title: "I'm not sure",
    description: "Help me figure out what I need",
    icon: HelpCircle,
    href: "/contact",
  },
];

export function HelpMeDecide() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30"
      data-testid="section-help-me-decide"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            data-testid="text-help-decide-title"
          >
            Not sure what you actually need?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Most people aren't. Let's help you figure it out.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                href={option.href}
                onClick={() => Analytics.Navigation.menuClick(`help-decide-${option.id}`)}
              >
                <Card
                  className={`group cursor-pointer h-full transition-all duration-700 ease-out hover-elevate ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  data-testid={`card-help-decide-${option.id}`}
                >
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <ArrowRight className="h-4 w-4 mt-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
