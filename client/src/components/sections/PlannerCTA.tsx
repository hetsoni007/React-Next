import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Clock, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Analytics from "@/lib/analytics";

export function PlannerCTA() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-card"
      data-testid="section-planner-cta"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-6">
            <FileText className="h-7 w-7 text-foreground" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
            data-testid="text-planner-title"
          >
            Plan Your Project
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a personalized timeline and cost estimate for your project. 
            Our interactive planner helps you understand what's involved 
            before you commit.
          </p>
        </div>

        <Card
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <CardContent className="p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted mb-3">
                  <Clock className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Quick & Easy</h3>
                <p className="text-sm text-muted-foreground">
                  Complete in just a few minutes
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted mb-3">
                  <Sparkles className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Personalized</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored to your specific needs
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted mb-3">
                  <FileText className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Detailed Report</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a comprehensive overview
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/estimate" onClick={() => Analytics.CTA.plannerButton('Home Mid-Section')}>
                <Button size="lg" data-testid="button-planner-cta">
                  Start Planning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
