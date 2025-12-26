import { useState } from "react";
import { Link } from "wouter";
import { SocialIcons } from "./Header";
import { socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import Analytics from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      setIsSubscribed(true);
      setEmail("");
      Analytics.Forms.newsletterSubscribe();
    },
    onError: (error) => {
      Analytics.Forms.newsletterError(error instanceof Error ? error.message : 'Unknown error');
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/">
              <span className="text-xl font-semibold tracking-tight cursor-pointer">
                Het Soni
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              Designing and building thoughtful mobile & web applications. 
              Helping founders and businesses create exceptional digital products 
              that users love.
            </p>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">Stay Updated</h4>
              {isSubscribed ? (
                <div className="space-y-3" data-testid="newsletter-confirmation">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-foreground" />
                    <span className="font-medium">You're subscribed!</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Here's what to expect in your welcome sequence:</p>
                    <ul className="list-disc list-inside pl-1 space-y-0.5">
                      <li>Day 1: Welcome & introduction to my services</li>
                      <li>Day 3: Featured portfolio case studies</li>
                      <li>Day 7: Exclusive insights on app development</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    data-testid="input-newsletter-email"
                    required
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={newsletterMutation.isPending}
                    data-testid="button-newsletter-subscribe"
                  >
                    {newsletterMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              )}
              {newsletterMutation.isError && (
                <p className="text-sm text-destructive mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

            <div className="flex items-center gap-1 mt-6">
              <SocialIcons />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Portfolio", "Journey", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} onClick={() => Analytics.Navigation.footerLink(item)}>
                    <span 
                      className="text-muted-foreground transition-colors cursor-pointer"
                      data-testid={`link-footer-${item.toLowerCase()}`}
                    >
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/estimate" onClick={() => Analytics.Navigation.footerLink("Project Planner")}>
                  <span 
                    className="text-muted-foreground transition-colors cursor-pointer"
                    data-testid="link-footer-project-planner"
                  >
                    Project Planner
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a 
                  href={`mailto:${socialLinks.email}`}
                  className="transition-colors break-all"
                  data-testid="link-footer-email"
                  onClick={() => Analytics.Social.linkClick('Footer Email')}
                >
                  {socialLinks.email}
                </a>
              </li>
              <li>
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  data-testid="link-footer-linkedin"
                  onClick={() => Analytics.Social.linkClick('Footer LinkedIn')}
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a 
                  href={socialLinks.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  data-testid="link-footer-medium"
                  onClick={() => Analytics.Social.linkClick('Footer Medium')}
                >
                  Read on Medium
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Het Soni. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            CEO & Founder, Soni Consultancy Services
          </p>
        </div>
      </div>
    </footer>
  );
}
