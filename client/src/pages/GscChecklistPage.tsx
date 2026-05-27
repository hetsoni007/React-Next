import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SeoHead } from "@/components/SeoHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Shield, CheckCircle2, Globe, Search, BarChart3, Link2, MapPin, FileText } from "lucide-react";

interface ChecklistItem {
  id: string;
  step: number;
  title: string;
  description: string;
  actionText: string;
  actionUrl: string;
  icon: React.ReactNode;
  extraItems?: { label: string; url: string }[];
}

const checklist: ChecklistItem[] = [
  {
    id: "verify",
    step: 1,
    title: "Verify site ownership in GSC",
    description: "Go to GSC, choose HTML tag verification, copy the content value, replace PASTE_GSC_TOKEN_HERE in index.html, then click Verify.",
    actionText: "Open Google Search Console",
    actionUrl: "https://search.google.com/search-console",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "sitemap",
    step: 2,
    title: "Submit sitemap.xml",
    description: "Submit your dynamic sitemap to GSC so Google knows every page on your site.",
    actionText: "Submit Sitemap",
    actionUrl: "https://search.google.com/search-console/sitemaps?resource_id=sc-domain:soniconsultancyservices.com",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "inspect",
    step: 3,
    title: "Request manual indexing for key pages",
    description: "Use GSC URL Inspection to request indexing for your most important pages.",
    actionText: "Inspect URLs",
    actionUrl: "https://search.google.com/search-console/inspect?resource_id=sc-domain:soniconsultancyservices.com",
    icon: <Search className="w-5 h-5" />,
    extraItems: [
      { label: "Homepage", url: "https://search.google.com/search-console/inspect?resource_id=sc-domain:soniconsultancyservices.com&url=https://soniconsultancyservices.com/" },
      { label: "Services", url: "https://search.google.com/search-console/inspect?resource_id=sc-domain:soniconsultancyservices.com&url=https://soniconsultancyservices.com/services" },
      { label: "Portfolio", url: "https://search.google.com/search-console/inspect?resource_id=sc-domain:soniconsultancyservices.com&url=https://soniconsultancyservices.com/portfolio" },
      { label: "Contact", url: "https://search.google.com/search-console/inspect?resource_id=sc-domain:soniconsultancyservices.com&url=https://soniconsultancyservices.com/contact" },
      { label: "Blog", url: "https://search.google.com/search-console/inspect?resource_id=sc-domain:soniconsultancyservices.com&url=https://soniconsultancyservices.com/blog" },
      { label: "FAQ", url: "https://search.google.com/search-console/inspect?resource_id=sc-domain:soniconsultancyservices.com&url=https://soniconsultancyservices.com/faq" },
    ],
  },
  {
    id: "coverage",
    step: 4,
    title: "Check Coverage report",
    description: "Review the Coverage report after 7 days. Look for 'Crawled, not indexed' pages — if many appear, your SEO content rendering needs attention.",
    actionText: "Open Coverage Report",
    actionUrl: "https://search.google.com/search-console/index?resource_id=sc-domain:soniconsultancyservices.com",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: "ga4-link",
    step: 5,
    title: "Link GSC to GA4",
    description: "In GA4 Admin → Search Console Links, connect your GSC property to your GA4 property.",
    actionText: "Open GA4 Admin",
    actionUrl: "https://analytics.google.com/analytics/web/#/a0p0/admin/search-console-links",
    icon: <Link2 className="w-5 h-5" />,
  },
  {
    id: "country",
    step: 6,
    title: "Set target country",
    description: "In GSC Settings → International Targeting → Country, set target to India.",
    actionText: "Open International Targeting",
    actionUrl: "https://search.google.com/search-console/settings/international-targeting?resource_id=sc-domain:soniconsultancyservices.com",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: "validate",
    step: 7,
    title: "Validate schema with Rich Results Test",
    description: "Test your structured data to make sure Google can read all schema markup correctly.",
    actionText: "Open Rich Results Test",
    actionUrl: "https://search.google.com/test/rich-results?url=https://soniconsultancyservices.com",
    icon: <Globe className="w-5 h-5" />,
  },
];

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: key }),
    });
    if (res.ok) {
      sessionStorage.setItem("gsc-checklist-auth", key);
      onAuth();
    } else {
      setError("Incorrect key");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-white dark:text-black" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">GSC Checklist</h1>
          <p className="text-gray-500 text-sm mt-1">Enter the admin password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Access Checklist
          </button>
        </form>
      </div>
    </div>
  );
}

export default function GscChecklistPage() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("gsc-checklist-auth"));
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("gsc-checklist") || "{}");
      setCompleted(saved);
    } catch {
      setCompleted({});
    }
  }, []);

  const toggle = (id: string) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem("gsc-checklist", JSON.stringify(next));
  };

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />;

  const allDone = checklist.every((item) => completed[item.id]);

  return (
    <>
      <SeoHead title="GSC Checklist" description="Post-deployment Google Search Console checklist." noIndex />
      <Header />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10">
            <Badge variant="secondary" className="mb-3">Admin</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              Google Search Console Checklist
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Complete these steps after every deployment to keep your site indexed and healthy.
            </p>
            {allDone && (
              <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> All steps completed!
              </div>
            )}
          </div>

          <div className="space-y-4">
            {checklist.map((item) => (
              <Card key={item.id} className={`border transition-colors ${completed[item.id] ? "border-green-200 dark:border-green-900/40 bg-green-50/40 dark:bg-green-900/10" : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-gray-400">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          <span className="text-gray-400 mr-2">{item.step}.</span>
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={item.id}
                            checked={!!completed[item.id]}
                            onCheckedChange={() => toggle(item.id)}
                          />
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.description}</p>
                      <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                        <a href={item.actionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                          {item.actionText} <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                      {item.extraItems && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.extraItems.map((sub) => (
                            <a
                              key={sub.url}
                              href={sub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              {sub.label} <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
