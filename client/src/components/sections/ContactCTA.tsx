import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Analytics from "@/lib/analytics";

export function ContactCTA() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8"
      data-testid="section-contact-cta"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            data-testid="text-cta-title"
          >
            Ready to build something exceptional?
          </h2>
        </div>

        <div
          className={`transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're a startup with a bold idea or an enterprise looking to 
            innovate, I'd love to hear about your project and explore how we can 
            work together.
          </p>
        </div>

        <div
          className={`mt-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/contact" onClick={() => Analytics.CTA.contactUs('Homepage CTA Section')}>
            <Button
              size="lg"
              className="text-base shadow-lg transition-all duration-300"
              data-testid="button-cta-start-conversation"
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
