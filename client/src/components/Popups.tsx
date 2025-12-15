import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, MessageCircle } from "lucide-react";

export function EntrancePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("entrance-popup-seen");
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("entrance-popup-seen", "true");
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  const handleCTA = () => {
    setIsOpen(false);
    navigate("/contact");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border shadow-2xl"
        data-testid="popup-entrance"
      >
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4 mx-auto">
            <MessageCircle className="h-6 w-6 text-foreground" />
          </div>
          <DialogTitle className="text-center text-2xl font-semibold">
            Thinking about building an app or website?
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            Let's discuss your project and explore how I can help bring your vision to life.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button 
            onClick={handleCTA} 
            className="w-full"
            data-testid="button-popup-cta"
          >
            Start a Conversation
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="w-full text-muted-foreground"
            data-testid="button-popup-dismiss"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
      className={`fixed bottom-6 right-6 z-50 max-w-sm transition-all duration-500 ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      data-testid="popup-portfolio"
    >
      <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-6">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground transition-colors"
          aria-label="Close popup"
          data-testid="button-popup-close"
        >
          <X className="h-4 w-4" />
        </button>
        
        <h3 className="text-lg font-semibold pr-6">
          Want to discuss a similar project?
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          I'd love to hear about your ideas and explore how we can create something great together.
        </p>
        
        <Button 
          onClick={handleCTA} 
          className="w-full mt-4"
          data-testid="button-popup-portfolio-cta"
        >
          Contact Me
        </Button>
      </div>
    </div>
  );
}
