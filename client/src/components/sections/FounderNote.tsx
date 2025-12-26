import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function FounderNote() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30"
      data-testid="section-founder-note"
    >
      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-center mb-12"
            data-testid="text-founder-note-title"
          >
            A note from the founder
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I started Soni Consultancy Services because I saw too many businesses 
              struggle with technology decisions. They'd either overspend on solutions 
              that didn't fit, or underinvest and end up rebuilding later.
            </p>
            
            <p>
              My approach is different. Before we write a single line of code, I make 
              sure we understand exactly what you're trying to achieve. Not what you 
              think you need technically, but what problem you're actually solving.
            </p>
            
            <p>
              Every project I take on is treated as if it were my own. That means 
              honest advice, even when it's not what you expect to hear. Sometimes 
              the right answer is simpler than you thought. Sometimes it's to wait 
              and validate your idea first.
            </p>
            
            <p>
              If you're looking for a partner who prioritizes your success over 
              billable hours, I'd love to hear about what you're building.
            </p>

            <p className="text-foreground font-medium pt-4">
              — Het Soni, Founder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
