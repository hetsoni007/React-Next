import { Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { portfolioProjects } from "@/lib/data";

export default function PortfolioPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background" data-testid="page-portfolio">
      <Header />
      
      <main className="pt-24 lg:pt-32">
        <section
          ref={heroRef}
          className="py-16 lg:py-24 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
                data-testid="text-portfolio-page-title"
              >
                Portfolio
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                A collection of mobile applications I've designed and built, 
                each solving real problems and delivering measurable results.
              </p>
            </div>

            <div className="space-y-8 lg:space-y-16">
              {portfolioProjects.map((project, index) => (
                <PortfolioCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Let's build something similar
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a project in mind? I'd love to hear about it.
            </p>
            <Link href="/contact">
              <Button size="lg" className="mt-8" data-testid="button-portfolio-cta">
                Start a Conversation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

interface PortfolioCardProps {
  project: typeof portfolioProjects[0];
  index: number;
}

function PortfolioCard({ project, index }: PortfolioCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <Link href={`/portfolio/${project.id}`}>
      <div
        ref={ref}
        className={`scroll-snap-item min-h-[60vh] flex items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        data-testid={`portfolio-card-${project.id}`}
      >
        <Card className="w-full group cursor-pointer shadow-xl overflow-visible transition-all duration-500">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-semibold mb-3">
                  {project.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-4">
                  {project.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Problem</p>
                      <p className="text-sm text-muted-foreground">{project.outcome.problem}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Result</p>
                      <p className="text-sm text-muted-foreground">{project.outcome.result}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <div className="w-full max-w-sm aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">View Project Details</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
