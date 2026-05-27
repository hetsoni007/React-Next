import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

type Category = "saas" | "mobile" | "hiring" | "enterprise" | "general";

const MESSAGES: Record<Category, string> = {
  saas: "Get our free SaaS MVP Planning Checklist →",
  mobile: "Download our App Cost Calculator (free) →",
  hiring: "Get our Remote Dev Interview Kit (free) →",
  enterprise: "Download our Enterprise Software RFP Template →",
  general: "Get a free project estimate in 24 hours →",
};

interface LeadMagnetFormProps {
  category?: Category;
  postSlug?: string;
}

export function LeadMagnetForm({ category = "general", postSlug = "" }: LeadMagnetFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, postSlug, resourceType: category }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          form_name: "lead_magnet",
          service_interest: category,
          source_page: window.location.pathname,
        });
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 flex items-center gap-4">
        <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
        <div>
          <p className="font-medium">✓ Check your inbox! Sending now...</p>
          <p className="text-gray-400 text-sm mt-0.5">While you wait, feel free to browse our portfolio.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="md:max-w-sm">
          <p className="font-semibold text-lg leading-snug">{MESSAGES[category]}</p>
          <p className="text-gray-400 text-sm mt-1">Free resource — no spam, ever.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:w-96">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 text-sm"
              data-testid="input-leadmagnet-email"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-shrink-0 flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 disabled:opacity-60 transition-colors"
            data-testid="button-leadmagnet-submit"
          >
            {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Me the Free Resource →"}
          </button>
        </form>
      </div>
    </div>
  );
}
