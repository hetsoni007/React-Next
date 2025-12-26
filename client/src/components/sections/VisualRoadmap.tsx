import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { MessageSquare, FileText, Cpu, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    id: "understand",
    icon: MessageSquare,
    title: "Understand the idea",
    description: "We listen to your vision and goals",
  },
  {
    id: "scope",
    icon: FileText,
    title: "Define scope",
    description: "Together we clarify what to build first",
  },
  {
    id: "tech",
    icon: Cpu,
    title: "Choose the right tech",
    description: "We recommend tools that fit your needs",
  },
  {
    id: "build",
    icon: Hammer,
    title: "Build and test",
    description: "Iterative development with your feedback",
  },
  {
    id: "launch",
    icon: Rocket,
    title: "Launch and support",
    description: "We help you go live and stay running",
  },
];

export function VisualRoadmap() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
      data-testid="section-visual-roadmap"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            data-testid="text-roadmap-title"
          >
            From idea to launch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A clear path forward, one step at a time.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                  data-testid={`step-roadmap-${step.id}`}
                >
                  <div className="relative z-10 w-14 h-14 rounded-full bg-background border-2 border-border flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
