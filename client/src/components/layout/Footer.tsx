import { Link } from "wouter";
import { SocialIcons } from "./Header";
import { socialLinks } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
            <div className="flex items-center gap-1 mt-6">
              <SocialIcons />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Portfolio", "Journey", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                    <span 
                      className="text-muted-foreground transition-colors cursor-pointer"
                      data-testid={`link-footer-${item.toLowerCase()}`}
                    >
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
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
