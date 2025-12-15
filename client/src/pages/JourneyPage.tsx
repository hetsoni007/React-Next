import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ArrowRight, Award, Users, Target, Lightbulb } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { careerMilestones } from "@/lib/data";
import { Link } from "wouter";

export default function JourneyPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background" data-testid="page-journey">
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
                data-testid="text-journey-page-title"
              >
                My Journey
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                From business development to technology leadership — a path built 
                on trust, growth, and a passion for creating exceptional digital products.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

              <div className="space-y-16 lg:space-y-24">
                {careerMilestones.map((milestone, index) => (
                  <MilestoneCard key={`${milestone.year}-${index}`} milestone={milestone} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ValuesSection />

        <section className="py-20 lg:py-32 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Let's write the next chapter together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ready to collaborate on something meaningful? I'd love to hear from you.
            </p>
            <Link href="/contact">
              <Button size="lg" className="mt-8" data-testid="button-journey-cta">
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

interface MilestoneCardProps {
  milestone: typeof careerMilestones[0];
  index: number;
}

function MilestoneCard({ milestone, index }: MilestoneCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const isEven = index % 2 === 0;
  const isCurrent = index === careerMilestones.length - 1;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 lg:gap-0 min-h-[200px] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      data-testid={`milestone-${index}`}
    >
      <div className={`absolute left-4 lg:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 ${
        isCurrent ? "bg-foreground" : "bg-background border-2 border-foreground"
      }`} />

      <div
        className={`pl-16 lg:pl-0 lg:w-1/2 ${
          isEven ? "lg:pr-20 lg:text-right" : "lg:pl-20 lg:ml-auto"
        }`}
      >
        <Card className={`shadow-lg ${isCurrent ? "border-foreground/20" : ""}`}>
          <CardContent className="p-8">
            <div
              className={`flex items-center gap-3 mb-4 ${
                isEven ? "lg:justify-end" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-foreground" />
              </div>
              <span className="text-2xl font-semibold">{milestone.year}</span>
              {isCurrent && (
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  Present
                </span>
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
            
            {milestone.company && (
              <p className="text-sm font-medium text-muted-foreground mb-3">
                {milestone.company}
              </p>
            )}
            
            <p className="text-muted-foreground leading-relaxed">
              {milestone.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every project is measured by the value it creates for users and businesses.",
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "I believe the best products come from close partnership with clients and teams.",
    },
    {
      icon: Lightbulb,
      title: "Innovative",
      description: "Always exploring new technologies and approaches to solve problems better.",
    },
    {
      icon: Award,
      title: "Quality-Focused",
      description: "Never compromising on the craft — from code quality to user experience.",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            What Drives Me
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide my work and relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className={`shadow-lg transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
