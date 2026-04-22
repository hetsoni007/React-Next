import { Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialIcons } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { usePageView, useTrackEvent } from "@/hooks/use-analytics";
import { useABTest, contactFormTest } from "@/hooks/use-ab-test";
import { socialLinks } from "@/lib/data";
import { LeadForm } from "@/forms/LeadForm";
import { HireUsBadge } from "@/components/HireUsBadge";

export default function ContactPage() {
  usePageView("/contact");
  const { trackEvent } = useTrackEvent();
  const { variantId, trackConversion, isLoading: variantLoading } = useABTest(contactFormTest);
  const isMinimalForm = variantLoading || variantId === "minimal";
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Header />

      <main className="pt-24 lg:pt-32">
        <section className="py-12 lg:py-16 px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              Not ready to talk yet?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              If you're still figuring things out, that's okay.
              We help people at the idea stage too.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/services">
                <Button variant="outline" data-testid="button-contact-explore-options">
                  Explore options
                </Button>
              </Link>
              <Link href="/estimate">
                <Button data-testid="button-contact-plan-project">
                  Plan a project
                </Button>
              </Link>
              <Link href="#contact-form">
                <Button variant="ghost" data-testid="button-contact-talk-to-someone">
                  Talk to someone
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          ref={heroRef}
          id="contact-form"
          className="py-16 lg:py-24 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div
                className={`transition-all duration-700 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
                  data-testid="text-contact-page-title"
                >
                  Let's Talk
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Have a project in mind? I'd love to hear about it. Fill out the form
                  and I'll get back to you within 24 hours.
                </p>

                <div className="mt-12 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="text-muted-foreground transition-colors break-all"
                      data-testid="link-contact-email"
                    >
                      {socialLinks.email}
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Connect</h3>
                    <div className="flex items-center gap-1">
                      <SocialIcons />
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-card rounded-2xl border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Prefer email?</span>
                    {" "}
                    No problem. Send me a message directly at{" "}
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="underline underline-offset-4"
                    >
                      {socialLinks.email}
                    </a>
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-700 delay-200 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Card className="shadow-xl">
                  <CardContent className="p-6 sm:p-8">
                    <LeadForm
                      key={isMinimalForm ? "minimal" : "standard"}
                      minimal={isMinimalForm}
                      onSuccess={() => {
                        trackEvent("form_submit", "/contact", {
                          form: "contact",
                          variant: variantId,
                        });
                        trackConversion("form_submit");
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <HireUsBadge />
    </div>
  );
}
