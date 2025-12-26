import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Menu, X, Linkedin, Mail } from "lucide-react";
import { SiX, SiInstagram } from "react-icons/si";
import { socialLinks } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";
import Analytics from "@/lib/analytics";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/journey", label: "Journey" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" onClick={() => Analytics.Navigation.logoClick()}>
            <span 
              className="text-xl font-semibold tracking-tight cursor-pointer"
              data-testid="link-logo"
            >
              Het Soni
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => Analytics.Navigation.menuClick(item.label)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <SocialIcons size="sm" />
            <ThemeToggle />
            <Link href="/contact" onClick={() => Analytics.CTA.contactUs('Header')}>
              <Button size="sm" data-testid="button-cta-header">
                Get in Touch
              </Button>
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in"
          data-testid="nav-mobile"
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => Analytics.Navigation.menuClick(`Mobile: ${item.label}`)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-base font-medium ${
                    location === item.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-border mt-2">
              <SocialIcons size="default" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

interface SocialIconsProps {
  size?: "sm" | "default";
}

export function SocialIcons({ size = "default" }: SocialIconsProps) {
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const buttonSize = size === "sm" ? "icon" : "icon";

  const icons = [
    { 
      href: socialLinks.linkedin, 
      icon: <Linkedin className={iconSize} />, 
      label: "LinkedIn",
      testId: "link-social-linkedin"
    },
    { 
      href: socialLinks.twitter, 
      icon: <SiX className={iconSize} />, 
      label: "X (Twitter)",
      testId: "link-social-twitter"
    },
    { 
      href: socialLinks.instagram, 
      icon: <SiInstagram className={iconSize} />, 
      label: "Instagram",
      testId: "link-social-instagram"
    },
    { 
      href: `mailto:${socialLinks.email}`, 
      icon: <Mail className={iconSize} />, 
      label: "Email",
      testId: "link-social-email"
    },
  ];

  return (
    <>
      {icons.map((item) => (
        <Tooltip key={item.href}>
          <TooltipTrigger asChild>
            <a
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-testid={item.testId}
              onClick={() => Analytics.Social.linkClick(item.label)}
            >
              <Button
                variant="ghost"
                size={buttonSize}
                className="text-muted-foreground transition-all duration-300"
              >
                {item.icon}
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}
