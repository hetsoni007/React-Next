import { useState } from "react";
import { useParams, Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Search, Palette, Code, TestTube, Rocket, CheckCircle2, Quote, Clock, Users, Smartphone, Calendar } from "lucide-react";
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import { useScrollAnimation, useScrollProgress } from "@/hooks/use-scroll-animation";
import { portfolioProjects } from "@/lib/data";
import { PortfolioPopup } from "@/components/Popups";

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

  const hasShowcaseContent = project.showcaseContent && project.showcaseContent.length > 0;
  const hasRoadmap = project.roadmap && project.roadmap.length > 0;

  return (
    <div className="min-h-screen bg-background" data-testid={`page-portfolio-${id}`}>
      <div 
        className="fixed top-0 left-0 h-[2px] bg-foreground z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Header />
      
      <main className="pt-24 lg:pt-32">
        <HeroSection project={project} />
        {hasShowcaseContent && <ShowcaseSection project={project} />}
        {hasRoadmap && <RoadmapSection project={project} />}
        {!hasShowcaseContent && <TimelineSection project={project} />}
        <OutcomeSection project={project} />
        {project.testimonial && <TestimonialSection project={project} />}
        {project.appLinks && <AppLinksSection project={project} />}
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
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary">
              {project.category}
            </Badge>
            {project.duration && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {project.duration}
              </Badge>
            )}
          </div>
          
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

        {project.targetAudience && project.targetAudience.length > 0 && (
          <div
            className={`mt-12 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Target Audience</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.targetAudience.map((audience, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">{audience.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{audience.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ShowcaseSection({ project }: SectionProps) {
  if (!project.showcaseContent || project.showcaseContent.length === 0) return null;

  return (
    <section className="relative">
      {project.showcaseContent.map((item, index) => (
        <CinematicShowcaseItem
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
          index={index}
          totalItems={project.showcaseContent!.length}
          projectTitle={project.title}
        />
      ))}
    </section>
  );
}

interface CinematicShowcaseItemProps {
  image: string;
  title: string;
  description: string;
  index: number;
  totalItems: number;
  projectTitle: string;
}

function CinematicShowcaseItem({ image, title, description, index, totalItems, projectTitle }: CinematicShowcaseItemProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  const backgroundGradients = [
    { light: "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 98%) 50%, hsl(0 0% 100%) 100%)", dark: "linear-gradient(180deg, hsl(0 0% 3.9%) 0%, hsl(0 0% 6%) 50%, hsl(0 0% 3.9%) 100%)" },
    { light: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 95%) 50%, hsl(0 0% 98%) 100%)", dark: "linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 9%) 50%, hsl(0 0% 6%) 100%)" },
    { light: "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 96%) 50%, hsl(0 0% 100%) 100%)", dark: "linear-gradient(180deg, hsl(0 0% 3.9%) 0%, hsl(0 0% 7%) 50%, hsl(0 0% 3.9%) 100%)" },
    { light: "linear-gradient(180deg, hsl(0 0% 97%) 0%, hsl(0 0% 100%) 50%, hsl(0 0% 97%) 100%)", dark: "linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 3.9%) 50%, hsl(0 0% 5%) 100%)" },
    { light: "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 94%) 50%, hsl(0 0% 100%) 100%)", dark: "linear-gradient(180deg, hsl(0 0% 3.9%) 0%, hsl(0 0% 8%) 50%, hsl(0 0% 3.9%) 100%)" },
    { light: "linear-gradient(180deg, hsl(0 0% 96%) 0%, hsl(0 0% 100%) 50%, hsl(0 0% 96%) 100%)", dark: "linear-gradient(180deg, hsl(0 0% 7%) 0%, hsl(0 0% 3.9%) 50%, hsl(0 0% 7%) 100%)" },
  ];
  
  const gradientIndex = index % backgroundGradients.length;
  const isEven = index % 2 === 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const rotateX = isHovered ? (mousePosition.y - 0.5) * -20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;
  
  const baseRotations = [
    { x: 5, y: -8 },
    { x: -3, y: 10 },
    { x: 6, y: -12 },
    { x: -4, y: 8 },
    { x: 4, y: -6 },
    { x: -5, y: 12 },
    { x: 3, y: -10 },
    { x: -6, y: 6 },
  ];
  const baseRotation = baseRotations[index % baseRotations.length];

  return (
    <div
      ref={ref}
      className="min-h-screen py-20 lg:py-32 px-6 lg:px-8 flex items-center relative overflow-hidden bg-background"
      data-testid={`cinematic-showcase-${index}`}
      data-bg-index={gradientIndex}
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: backgroundGradients[gradientIndex].light,
          opacity: 1,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 dark:opacity-100 opacity-0"
        style={{
          background: backgroundGradients[gradientIndex].dark,
        }}
      />
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--foreground) / 0.03) 0%, transparent 50%)`,
          transition: "background 0.3s ease-out",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        <div
          className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
        >
          <div
            className={`flex-1 flex justify-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
            style={{ perspective: "2000px" }}
          >
            <div
              className="relative cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0.5, y: 0.5 });
              }}
              style={{
                transform: isVisible 
                  ? `rotateX(${isHovered ? rotateX : baseRotation.x}deg) rotateY(${isHovered ? rotateY : baseRotation.y}deg) scale(${isHovered ? 1.02 : 1})`
                  : "rotateX(0deg) rotateY(0deg) scale(0.9)",
                transformStyle: "preserve-3d",
                transition: isHovered 
                  ? "transform 0.1s ease-out" 
                  : "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <div 
                className="absolute -inset-8 rounded-3xl blur-3xl transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--foreground) / ${isHovered ? 0.15 : 0.08}) 0%, transparent 70%)`,
                  transform: "translateZ(-60px)",
                }}
              />
              
              <div
                className="relative rounded-2xl overflow-visible"
                style={{
                  boxShadow: isHovered
                    ? `0 60px 120px -20px rgba(0, 0, 0, 0.5), 
                       0 30px 60px -10px rgba(0, 0, 0, 0.3),
                       0 0 0 1px rgba(255, 255, 255, 0.1) inset`
                    : `0 40px 80px -15px rgba(0, 0, 0, 0.35), 
                       0 20px 40px -8px rgba(0, 0, 0, 0.2),
                       0 0 0 1px rgba(255, 255, 255, 0.05) inset`,
                  transition: "box-shadow 0.3s ease-out",
                }}
              >
                <img
                  src={`/attached_assets/${image}`}
                  alt={`${projectTitle} - ${title}`}
                  className="w-full max-w-2xl rounded-2xl object-contain"
                  data-testid={`img-cinematic-${index}`}
                  style={{
                    filter: isHovered ? "brightness(1.05) contrast(1.02)" : "brightness(1) contrast(1)",
                    transition: "filter 0.3s ease-out",
                  }}
                />
                
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255,255,255,${isHovered ? 0.15 : 0.08}) 0%, 
                      transparent 40%, 
                      transparent 60%, 
                      rgba(0,0,0,${isHovered ? 0.1 : 0.05}) 100%)`,
                  }}
                />
                
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,${isHovered ? 0.2 : 0}) 0%, transparent 50%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.2s ease-out",
                  }}
                />
              </div>

              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full blur-2xl bg-foreground/10"
                style={{
                  transform: `translateX(-50%) translateZ(-80px) scaleX(${isHovered ? 1.1 : 1})`,
                  opacity: isHovered ? 0.6 : 0.4,
                  transition: "all 0.3s ease-out",
                }}
              />
            </div>
          </div>

          <div
            className={`flex-1 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center border border-border/50">
                  <span className="text-2xl font-bold tracking-tight">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-foreground/5 to-transparent blur-sm -z-10" />
              </div>
              <div className="flex-1">
                <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {index + 1} / {totalItems}
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-semibold mb-6 tracking-tight">
              {title}
            </h3>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {index < totalItems - 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      )}
    </div>
  );
}

function RoadmapSection({ project }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  if (!project.roadmap || project.roadmap.length === 0) return null;

  const phaseColors: Record<string, string> = {
    Discovery: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    Research: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    Ideation: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    Design: "bg-pink-500/20 text-pink-600 dark:text-pink-400",
    Prototyping: "bg-violet-500/20 text-violet-600 dark:text-violet-400",
    Iteration: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
    Development: "bg-green-500/20 text-green-600 dark:text-green-400",
    Testing: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    Delivery: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
      data-testid="section-roadmap"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Development Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {project.duration || "Project"} Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From discovery to deployment, here's the complete timeline of how this project came to life.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

          <div className="space-y-12 lg:space-y-16">
            {project.roadmap.map((item, index) => {
              const isEven = index % 2 === 0;
              const colorClass = phaseColors[item.phase] || "bg-muted text-foreground";

              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 lg:gap-0 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  data-testid={`roadmap-item-${index}`}
                >
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center z-10">
                    <span className="text-xs font-bold text-muted-foreground">
                      W{item.week.split("-")[0]}
                    </span>
                  </div>

                  <div
                    className={`pl-20 lg:pl-0 lg:w-1/2 ${
                      isEven ? "lg:pr-20 lg:text-right" : "lg:pl-20 lg:ml-auto"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 mb-2 ${
                        isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <Badge className={colorClass}>
                        {item.phase}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Week {item.week}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
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
      className="py-20 lg:py-32 px-6 lg:px-8 bg-card"
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
      className="py-20 lg:py-32 px-6 lg:px-8"
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

function AppLinksSection({ project }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  if (!project.appLinks) return null;

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-card"
      data-testid="section-app-links"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Smartphone className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Available On</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
            Download the App
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {project.appLinks.android && (
              <a
                href={project.appLinks.android}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-android-app"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <SiGoogleplay className="h-5 w-5" />
                  Google Play
                </Button>
              </a>
            )}
            {project.appLinks.ios && (
              <a
                href={project.appLinks.ios}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-ios-app"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <SiAppstore className="h-5 w-5" />
                  App Store
                </Button>
              </a>
            )}
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
