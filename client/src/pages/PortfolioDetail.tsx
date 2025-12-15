import { useParams, Link } from "wouter";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Search, Palette, Code, TestTube, Rocket, CheckCircle2, Quote, FileText, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation, useScrollProgress } from "@/hooks/use-scroll-animation";
import { portfolioProjects } from "@/lib/data";
import { PortfolioPopup } from "@/components/Popups";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const timelineIcons = {
  discovery: Search,
  design: Palette,
  development: Code,
  testing: TestTube,
  delivery: Rocket,
};

const timelineLabels = {
  discovery: "Discovery",
  design: "Design",
  development: "Development",
  testing: "Testing",
  delivery: "Delivery",
};

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const project = portfolioProjects.find((p) => p.id === id);
  const scrollProgress = useScrollProgress();

  if (!project) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-portfolio-not-found">
        <Header />
        <main className="pt-24 lg:pt-32 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-3xl font-semibold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link href="/portfolio">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid={`page-portfolio-${id}`}>
      <div 
        className="fixed top-0 left-0 h-[2px] bg-foreground z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Header />
      
      <main className="pt-24 lg:pt-32">
        <HeroSection project={project} />
        <TimelineSection project={project} />
        <OutcomeSection project={project} />
        {project.testimonial && <TestimonialSection project={project} />}
        <CTASection />
      </main>
      
      <Footer />
      <PortfolioPopup projectTitle={project.title} />
    </div>
  );
}

interface SectionProps {
  project: typeof portfolioProjects[0];
}

function HeroSection({ project }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-16 lg:py-24 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <Link href="/portfolio">
          <Button variant="ghost" className="mb-8" data-testid="button-back-portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="secondary" className="mb-4">
            {project.category}
          </Badge>
          
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            data-testid="text-project-title"
          >
            {project.title}
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-6">
            {project.subtitle}
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        <div
          className={`mt-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {project.images && project.images.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Palette className="h-5 w-5" />
                  <span className="text-sm font-medium">Project Showcase</span>
                </div>
                {project.pdfAsset && (
                  <a
                    href={`/attached_assets/${project.pdfAsset}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-pdf-fullscreen"
                  >
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Case Study PDF
                    </Button>
                  </a>
                )}
              </div>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full"
                data-testid="carousel-project-images"
              >
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video bg-muted rounded-3xl overflow-hidden">
                        <img
                          src={`/attached_assets/${image}`}
                          alt={`${project.title} - Slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          data-testid={`img-slide-${index}`}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" data-testid="button-carousel-prev" />
                <CarouselNext className="right-4" data-testid="button-carousel-next" />
              </Carousel>
              <div className="flex justify-center gap-2 pt-4">
                <span className="text-sm text-muted-foreground">
                  {project.images.length} slides - Use arrows to navigate
                </span>
              </div>
            </div>
          ) : project.pdfAsset ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">Project Case Study</span>
                </div>
                <a
                  href={`/attached_assets/${project.pdfAsset}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-pdf-fullscreen"
                >
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Full Screen
                  </Button>
                </a>
              </div>
              <div className="aspect-[4/3] bg-muted rounded-3xl overflow-hidden">
                <iframe
                  src={`/attached_assets/${project.pdfAsset}`}
                  className="w-full h-full border-0"
                  title={`${project.title} Case Study`}
                  data-testid="iframe-pdf-viewer"
                />
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-10 w-10 text-foreground" />
                </div>
                <p className="text-muted-foreground">Project Preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ project }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const timelineItems = Object.entries(project.timeline) as [
    keyof typeof timelineIcons,
    string
  ][];

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
            Project Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From initial discovery to successful delivery, here's how we brought this project to life.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

          <div className="space-y-12 lg:space-y-16">
            {timelineItems.map(([key, description], index) => {
              const Icon = timelineIcons[key];
              const label = timelineLabels[key];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={key}
                  className={`relative flex items-start gap-8 lg:gap-0 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                  data-testid={`timeline-${key}`}
                >
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center z-10">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>

                  <div
                    className={`pl-16 lg:pl-0 lg:w-1/2 ${
                      isEven ? "lg:pr-20 lg:text-right" : "lg:pl-20 lg:ml-auto"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 text-sm font-semibold text-foreground mb-2 ${
                        isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeSection({ project }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            The Outcome
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            className={`shadow-lg transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">The Problem</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.outcome.problem}
              </p>
            </CardContent>
          </Card>

          <Card
            className={`shadow-lg transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">The Result</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.outcome.result}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({ project }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  if (!project.testimonial) return null;

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-card"
      data-testid="section-testimonial"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-8">
            <Quote className="h-8 w-8 text-foreground" />
          </div>
          
          <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed mb-8" data-testid="text-testimonial-quote">
            "{project.testimonial.quote}"
          </blockquote>
          
          <div className="space-y-1">
            <p className="text-lg font-semibold" data-testid="text-testimonial-author">
              {project.testimonial.author}
            </p>
            <p className="text-muted-foreground" data-testid="text-testimonial-role">
              {project.testimonial.role}, {project.testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
    >
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Let's build something similar
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Inspired by this project? I'd love to discuss how we can create 
          something exceptional for your business.
        </p>
        <Link href="/contact">
          <Button size="lg" className="mt-8" data-testid="button-project-cta">
            Start a Conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
