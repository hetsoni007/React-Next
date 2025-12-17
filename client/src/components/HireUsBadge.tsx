import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  X, 
  MessageCircle, 
  ChevronUp, 
  ChevronDown,
  ExternalLink,
  Mail,
  Users
} from "lucide-react";
import { SiBehance, SiUpwork, SiFiverr, SiFreelancer } from "react-icons/si";

interface PlatformLink {
  name: string;
  url: string;
  icon: typeof SiBehance;
  description: string;
}

const platforms: PlatformLink[] = [
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~013865210560e7c210",
    icon: SiUpwork,
    description: "Top Rated Developer",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/sellers/satyam_rathaur",
    icon: SiFiverr,
    description: "5-Star Seller",
  },
  {
    name: "Freelancer",
    url: "https://www.freelancer.in/u/Satyam0216",
    icon: SiFreelancer,
    description: "Verified Expert",
  },
];

const behanceProfiles = [
  {
    name: "Himani Jadav",
    url: "https://www.behance.net/himanijadav/",
  },
  {
    name: "Satyam R",
    url: "https://www.behance.net/satyamr16",
  },
];

export function HireUsBadge() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 transition-all duration-300"
      data-testid="hire-us-badge"
    >
      {isExpanded ? (
        <Card className="w-80 bg-background border-border shadow-2xl overflow-visible">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                    <Users className="h-4 w-4 text-background" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Hire Our Developers</span>
                    <p className="text-xs text-muted-foreground">Connect on your preferred platform</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-muted-foreground p-1"
                  data-testid="button-hire-close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-3 space-y-2">
              <a
                href="mailto:het.soni@soniconsultacyservices.com?subject=Project%20Inquiry%20-%20Hire%20Developer"
                className="flex items-center gap-3 p-3 rounded-lg bg-foreground text-background transition-all duration-200 hover:opacity-90"
                data-testid="link-hire-email"
              >
                <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Quick Message</p>
                  <p className="text-xs opacity-80">Talk to us directly</p>
                </div>
                <MessageCircle className="h-4 w-4 opacity-70" />
              </a>

              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-all duration-200 hover-elevate group"
                  data-testid={`link-hire-${platform.name.toLowerCase()}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <platform.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{platform.name}</p>
                    <p className="text-xs text-muted-foreground">{platform.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 px-1">Design Portfolios</p>
                <div className="flex gap-2">
                  {behanceProfiles.map((profile, index) => (
                    <a
                      key={profile.name}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-muted/50 transition-all duration-200 hover-elevate"
                      data-testid={`link-behance-${index}`}
                    >
                      <SiBehance className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium truncate">{profile.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 pt-0">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => setIsExpanded(false)}
                data-testid="button-hire-collapse"
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Collapse
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-foreground text-background shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          data-testid="button-hire-expand"
        >
          <Users className="h-5 w-5" />
          <span className="font-medium text-sm">Hire Us</span>
          <ChevronUp className="h-4 w-4 opacity-70" />
        </button>
      )}
    </div>
  );
}
