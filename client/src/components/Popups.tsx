import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  X,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Briefcase,
  ChevronRight,
  Lightbulb,
  Rocket,
  Eye,
  Code,
  Smartphone,
  Globe,
  HelpCircle,
  Send,
  Calculator,
  FileText,
} from "lucide-react";
import { portfolioProjects } from "@/lib/data";
import Analytics from "@/lib/analytics";

interface PopupState {
  hasSeenEntrance: boolean;
  hasSeenExit: boolean;
  hasSeenPortfolioHelper: boolean;
  hasSeenScrollEngagement: boolean;
  interactionCount: number;
  lastInteractionTime: number;
}

function getPopupState(): PopupState {
  try {
    const stored = sessionStorage.getItem("popup-state");
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    hasSeenEntrance: false,
    hasSeenExit: false,
    hasSeenPortfolioHelper: false,
    hasSeenScrollEngagement: false,
    interactionCount: 0,
    lastInteractionTime: 0,
  };
}

function setPopupState(state: Partial<PopupState>) {
  try {
    const current = getPopupState();
    sessionStorage.setItem(
      "popup-state",
      JSON.stringify({ ...current, ...state })
    );
  } catch {}
}

export function EntrancePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const state = getPopupState();
    if (state.hasSeenEntrance) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    function cleanup() {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    }

    function triggerPopup() {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
      setPopupState({ hasSeenEntrance: true });
      Analytics.Popups.entrance.show();
      cleanup();
    }

    function handleScroll() {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercentage >= 40) {
        triggerPopup();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    timeoutId = setTimeout(triggerPopup, 28000);

    return cleanup;
  }, []);

  const handleEstimate = () => {
    setIsOpen(false);
    Analytics.Popups.entrance.ctaClick();
    navigate("/estimate");
  };

  const handlePortfolio = () => {
    setIsOpen(false);
    Analytics.Popups.entrance.ctaClick();
    navigate("/portfolio");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-lg bg-background border-border shadow-2xl"
        data-testid="popup-entrance"
      >
        <DialogHeader>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <Calculator className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-semibold">
            Get a Free Project Estimate
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-3 text-base">
            Use our interactive tool to get a ball-park cost and timeline
            estimate for your web or mobile app project in minutes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleEstimate}
            className="group p-4 rounded-xl border border-border bg-foreground text-background text-left transition-all duration-300"
            data-testid="button-popup-estimate"
          >
            <FileText className="h-5 w-5 text-background mb-2" />
            <p className="font-medium text-sm">Get Free Estimate</p>
            <p className="text-xs text-background/70 mt-1">
              Interactive planning tool
            </p>
          </button>

          <button
            onClick={handlePortfolio}
            className="group p-4 rounded-xl border border-border bg-muted/50 text-left transition-all duration-300 hover-elevate"
            data-testid="button-popup-see-work"
          >
            <Eye className="h-5 w-5 text-foreground mb-2" />
            <p className="font-medium text-sm">See Our Work</p>
            <p className="text-xs text-muted-foreground mt-1">
              View portfolio projects
            </p>
          </button>
        </div>

        <Button
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="w-full mt-4 text-muted-foreground"
          data-testid="button-popup-dismiss"
        >
          I'll explore on my own
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const state = getPopupState();
    if (state.hasSeenExit) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
        setPopupState({ hasSeenExit: true });
        Analytics.Popups.exit.show();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-md bg-background border-border shadow-2xl"
        data-testid="popup-exit-intent"
      >
        <DialogHeader>
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4 mx-auto">
            <HelpCircle className="h-7 w-7 text-foreground" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">
            Before you go...
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            Still exploring your options? Let us send you a quick overview of
            how we can help with your project.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={() => {
              setIsOpen(false);
              Analytics.Popups.exit.ctaClick();
              navigate("/estimate");
            }}
            className="w-full"
            data-testid="button-exit-cta"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Get Free Project Estimate
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              Analytics.Popups.exit.ctaClick();
              navigate("/portfolio");
            }}
            className="w-full"
            data-testid="button-exit-portfolio"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            View Success Stories
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              Analytics.Popups.exit.dismiss();
            }}
            className="w-full text-muted-foreground text-sm"
            data-testid="button-exit-dismiss"
          >
            No thanks, I'll come back later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FloatingPortfolioAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [location] = useLocation();

  const tips = [
    { icon: Calculator, text: "Get a free estimate", link: "/estimate" },
    { icon: Briefcase, text: "Explore our portfolio", link: "/portfolio" },
    { icon: Code, text: "See our services", link: "/services" },
    { icon: MessageCircle, text: "Start a conversation", link: "/contact" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isExpanded, tips.length]);

  // Do NOT show floating assistant on planner, contact, privacy, or terms pages
  const noAssistantPaths = ["/estimate", "/contact", "/privacy", "/terms"];
  if (noAssistantPaths.some((path) => location.startsWith(path))) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      data-testid="floating-assistant"
    >
      {isExpanded ? (
        <Card className="w-72 shadow-2xl border-border bg-background overflow-visible">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-foreground" />
                  </div>
                  <span className="font-medium text-sm">How can I help?</span>
                </div>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    Analytics.Popups.floatingAssistant.close();
                  }}
                  className="text-muted-foreground p-1"
                  data-testid="button-assistant-close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Link
                href={tips[currentTip].link}
                onClick={() => {
                  setIsExpanded(false);
                  Analytics.Popups.floatingAssistant.actionClick(
                    tips[currentTip].text
                  );
                }}
                className="flex items-center gap-2 text-xs text-muted-foreground transition-all duration-500 hover:text-foreground"
              >
                {(() => {
                  const TipIcon = tips[currentTip].icon;
                  return <TipIcon className="h-3 w-3" />;
                })()}
                <span className="animate-pulse">{tips[currentTip].text}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="p-3 space-y-2">
              {portfolioProjects.slice(0, 3).map((project, index) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-all duration-200 hover-elevate group"
                  onClick={() => setIsExpanded(false)}
                  data-testid={`assistant-project-${index}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    {project.category.includes("Mobile") ? (
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Globe className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.category}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>

            <div className="p-3 pt-0">
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => setIsExpanded(false)}
                  data-testid="button-assistant-view-all"
                >
                  View All Projects
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <button
          onClick={() => {
            setIsExpanded(true);
            Analytics.Popups.floatingAssistant.open();
          }}
          className="group flex items-center gap-3 px-4 py-3 rounded-full bg-foreground text-background shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          data-testid="button-assistant-expand"
        >
          <Rocket className="h-5 w-5" />
          <span className="font-medium text-sm">Explore Projects</span>
        </button>
      )}
    </div>
  );
}

export function ScrollEngagementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [, navigate] = useLocation();
  const [location] = useLocation();

  useEffect(() => {
    const state = getPopupState();
    if (state.hasSeenScrollEngagement || hasTriggered) return;
    if (location !== "/") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent >= 55 && !hasTriggered) {
        setHasTriggered(true);
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          setPopupState({ hasSeenScrollEngagement: true });
        }, 1000);
      }
    };

    timeoutId = setTimeout(() => {
      if (!hasTriggered && location === "/") {
        setHasTriggered(true);
        setIsOpen(true);
        setPopupState({ hasSeenScrollEngagement: true });
      }
    }, 34000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [hasTriggered, location]);

  if (location !== "/") return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-xs transition-all duration-500 ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      data-testid="popup-scroll-engagement"
    >
      <Card className="bg-background border-border shadow-2xl overflow-visible">
        <CardContent className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-muted-foreground"
            aria-label="Close"
            data-testid="button-scroll-close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3 pr-6">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Calculator className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">Plan your project</p>
              <p className="text-xs text-muted-foreground mt-1">
                Get a free ball-park estimate for your web or mobile app in just
                2 minutes.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              onClick={() => {
                setIsOpen(false);
                navigate("/estimate");
              }}
              className="flex-1"
              data-testid="button-scroll-estimate"
            >
              Get Estimate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              data-testid="button-scroll-dismiss"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface PortfolioPopupProps {
  projectTitle: string;
}

export function PortfolioPopup({ projectTitle }: PortfolioPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (hasTriggered) return;

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent >= 70 && !hasTriggered) {
        setHasTriggered(true);
        setIsOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  const handleCTA = () => {
    setIsOpen(false);
    navigate("/contact");
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-sm transition-all duration-500 ${
        isOpen
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      }`}
      data-testid="popup-portfolio"
    >
      <Card className="bg-background border-border shadow-2xl overflow-visible">
        <CardContent className="p-5">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground transition-colors"
            aria-label="Close popup"
            data-testid="button-popup-close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Rocket className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                Impressed by this project?
              </h3>
              <p className="text-xs text-muted-foreground">
                Let's create something similar for you
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            We'd love to discuss how we can build a solution tailored to your
            specific business needs.
          </p>

          <div className="flex gap-2">
            <Button
              onClick={handleCTA}
              className="flex-1"
              data-testid="button-popup-portfolio-cta"
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              data-testid="button-popup-portfolio-dismiss"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PageContextPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [, navigate] = useLocation();
  const hasShownRef = useRef<Record<string, boolean>>({});

  const pageMessages: Record<
    string,
    { title: string; message: string; cta: string; link: string }
  > = {
    "/services": {
      title: "Need a custom solution?",
      message: "Our services can be tailored to your specific requirements.",
      cta: "Get Custom Quote",
      link: "/contact",
    },
    "/journey": {
      title: "Like our process?",
      message: "We'd love to apply this approach to your project.",
      cta: "Start Your Journey",
      link: "/contact",
    },
    "/blog": {
      title: "Found something useful?",
      message:
        "We write about software development, product strategy, and more.",
      cta: "Let's Connect",
      link: "/contact",
    },
  };

  useEffect(() => {
    const message = pageMessages[location];
    if (!message || hasShownRef.current[location]) return;

    const timer = setTimeout(() => {
      hasShownRef.current[location] = true;
      setIsOpen(true);
    }, 14000);

    return () => clearTimeout(timer);
  }, [location]);

  const currentMessage = pageMessages[location];
  if (!currentMessage) return null;

  return (
    <div
      className={`fixed top-24 right-6 z-40 max-w-xs transition-all duration-500 ${
        isOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8 pointer-events-none"
      }`}
      data-testid="popup-page-context"
    >
      <Card className="bg-background border-border shadow-xl overflow-visible">
        <CardContent className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-muted-foreground"
            aria-label="Close"
            data-testid="button-context-close"
          >
            <X className="h-4 w-4" />
          </button>

          <h4 className="font-medium text-sm pr-6">{currentMessage.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {currentMessage.message}
          </p>

          <Button
            size="sm"
            className="w-full mt-3"
            onClick={() => {
              setIsOpen(false);
              navigate(currentMessage.link);
            }}
            data-testid="button-context-cta"
          >
            {currentMessage.cta}
            <ArrowRight className="h-3 w-3 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function GlobalPopups() {
  const [location] = useLocation();

  // Do NOT show popups on planner, contact, privacy, or terms pages
  const noPopupPaths = ["/estimate", "/contact", "/privacy", "/terms"];
  if (noPopupPaths.some((path) => location.startsWith(path))) {
    return null;
  }

  return (
    <>
      <ScrollEngagementPopup />
      <ExitIntentPopup />
    </>
  );
}
