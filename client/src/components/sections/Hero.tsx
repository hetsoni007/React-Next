import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation, useScrollProgress } from "@/hooks/use-scroll-animation";
import { useABTest, heroCtaTest } from "@/hooks/use-ab-test";
import Analytics from "@/lib/analytics";

export function Hero() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const scrollProgress = useScrollProgress();
  const { variant, trackConversion, isLoading } = useABTest(heroCtaTest);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center relative px-6 lg:px-8"
      data-testid="section-hero"
    >
      <div 
        className="fixed top-0 left-0 h-[2px] bg-foreground z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        data-testid="scroll-progress-bar"
      />

      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]"
            data-testid="text-hero-headline"
          >
            Custom Software Development for Growing Businesses
          </h1>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            data-testid="text-hero-description"
          >
            We build scalable SaaS applications, mobile apps, and enterprise software 
            solutions for startups and enterprises. Expert development services 
            serving clients in the USA, UK, UAE, Europe, and Australia.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="min-w-[160px] text-base shadow-lg transition-all duration-300"
              data-testid="button-cta-contact"
              onClick={() => {
                trackConversion("hero_cta_click");
                Analytics.CTA.heroButton(variant.name);
              }}
            >
              {isLoading ? "Contact Me" : variant.name}
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[160px] text-base transition-all duration-300"
              data-testid="button-cta-portfolio"
              onClick={() => Analytics.CTA.viewPortfolio('Hero')}
            >
              View Portfolio
            </Button>
          </Link>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground transition-all duration-300 animate-bounce"
        aria-label="Scroll to next section"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
