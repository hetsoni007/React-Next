import { Lightbulb, Target, TrendingUp, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const principles = [
  {
    id: "clarity",
    icon: Lightbulb,
    title: "Clarity before development",
    description: "We take time to truly understand what you're trying to achieve before writing any code.",
  },
  {
    id: "simplicity",
    icon: Target,
    title: "Simplest viable solution",
    description: "We suggest the straightforward path that gets you to your goal without unnecessary complexity.",
  },
  {
    id: "scalability",
    icon: TrendingUp,
    title: "Long-term thinking",
    description: "Every decision considers how your product will grow and evolve over time.",
  },
  {
    id: "guidance",
    icon: Users,
    title: "Guide first, build second",
    description: "We help you make informed decisions before we start building anything.",
  },
];

export function HowWeThink() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
      data-testid="section-how-we-think"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            data-testid="text-how-we-think-title"
          >
            How we think about your project
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our approach is consultative, not transactional. 
            We're here to help you make the right decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.id}
                className={`flex gap-6 transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                data-testid={`item-principle-${principle.id}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
