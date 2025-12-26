import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Globe, Rocket, Building2, Smartphone } from "lucide-react";

const useCases = [
  {
    id: "marketing-website",
    icon: Globe,
    title: "Simple Marketing Website",
    goal: "Establish credibility and attract leads",
    features: ["Responsive design", "Contact forms", "SEO optimization", "Analytics"],
    mistakes: "Overcomplicating with unnecessary features",
    tech: "Modern frameworks with fast loading and easy updates",
    timeline: "Often completed in 2-4 weeks",
  },
  {
    id: "startup-mvp",
    icon: Rocket,
    title: "Startup MVP",
    goal: "Validate your idea with real users quickly",
    features: ["Core functionality only", "User authentication", "Basic analytics", "Feedback collection"],
    mistakes: "Building too many features before validating",
    tech: "Scalable architecture that grows with you",
    timeline: "Usually 6-12 weeks for core launch",
  },
  {
    id: "internal-tool",
    icon: Building2,
    title: "Internal Business Tool",
    goal: "Streamline operations and reduce manual work",
    features: ["Custom workflows", "Data management", "Reporting", "Integrations"],
    mistakes: "Not involving actual users in the design process",
    tech: "Secure, reliable systems with role-based access",
    timeline: "Typically 8-16 weeks depending on complexity",
  },
  {
    id: "team-mobile-app",
    icon: Smartphone,
    title: "Mobile App for Teams",
    goal: "Enable productivity and communication on the go",
    features: ["Cross-platform support", "Push notifications", "Offline capability", "Sync"],
    mistakes: "Trying to replicate desktop features exactly",
    tech: "Native or cross-platform based on your needs",
    timeline: "Generally 10-16 weeks for first release",
  },
];

export function UseCaseWalkthroughs() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30"
      data-testid="section-use-case-walkthroughs"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            data-testid="text-use-cases-title"
          >
            How projects like yours are usually built
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Common patterns we see across different types of projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card
                key={useCase.id}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                data-testid={`card-use-case-${useCase.id}`}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Goal: </span>
                      <span className="text-muted-foreground">{useCase.goal}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-foreground">Typical features: </span>
                      <span className="text-muted-foreground">{useCase.features.join(", ")}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-foreground">Common mistake: </span>
                      <span className="text-muted-foreground">{useCase.mistakes}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-foreground">Tech approach: </span>
                      <span className="text-muted-foreground">{useCase.tech}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-foreground">Timeline: </span>
                      <span className="text-muted-foreground">{useCase.timeline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
