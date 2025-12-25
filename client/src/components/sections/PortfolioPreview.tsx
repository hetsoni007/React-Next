import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { portfolioProjects } from "@/lib/data";
import Analytics from "@/lib/analytics";

export function PortfolioPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-card"
      data-testid="section-portfolio-preview"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
              data-testid="text-portfolio-title"
            >
              Selected Work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              A collection of mobile applications I've designed and built.
            </p>
          </div>
          <Link href="/portfolio" onClick={() => Analytics.Portfolio.viewAllProjects()}>
            <Button variant="outline" data-testid="button-view-all-portfolio">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {portfolioProjects.slice(0, 4).map((project, index) => (
            <Link key={project.id} href={`/portfolio/${project.id}`} onClick={() => Analytics.Portfolio.projectClick(project.title)}>
              <Card
                className={`group cursor-pointer transition-all duration-700 ease-out shadow-lg overflow-visible ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                data-testid={`card-portfolio-${project.id}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm font-medium text-foreground">
                      Result: <span className="text-muted-foreground font-normal">{project.outcome.result}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
