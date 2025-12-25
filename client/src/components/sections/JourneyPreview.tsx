import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { careerMilestones } from "@/lib/data";

export function JourneyPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
      data-testid="section-journey-preview"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            data-testid="text-journey-title"
          >
            My Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From business development to leading technology ventures — 
            a path built on trust, growth, and continuous learning.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

          <div className="space-y-8 lg:space-y-12">
            {careerMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={`${milestone.year}-${index}`}
                  className={`relative flex items-start gap-8 lg:gap-0 transition-all duration-800 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 180}ms` }}
                  data-testid={`timeline-item-${index}`}
                >
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-4 border-background shadow-md z-10" />

                  <div
                    className={`pl-12 lg:pl-0 lg:w-1/2 ${
                      isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:ml-auto"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2 ${
                        isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    {milestone.company && (
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {milestone.company}
                      </p>
                    )}
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`text-center mt-16 transition-all duration-1000 ease-out delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link href="/journey">
            <Button variant="outline" data-testid="button-view-full-journey">
              View Full Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
