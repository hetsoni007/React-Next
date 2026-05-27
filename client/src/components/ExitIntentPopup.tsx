import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { serviceOptions } from "@/lib/faqData";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  service: z.string().min(1, "Please select a service"),
});

type FormData = z.infer<typeof schema>;

const EXCLUDED_PATHS = ["/contact", "/thank-you"];
const SESSION_KEY = "exit-intent-seen";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [location] = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", service: "" },
  });

  useEffect(() => {
    if (EXCLUDED_PATHS.some((p) => location.startsWith(p))) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {}

    let mobileTimer: ReturnType<typeof setTimeout>;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        try {
          if (sessionStorage.getItem(SESSION_KEY)) return;
        } catch {}
        setOpen(true);
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      mobileTimer = setTimeout(() => {
        try {
          if (sessionStorage.getItem(SESSION_KEY)) return;
        } catch {}
        setOpen(true);
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      }, 40000);
    } else {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [location]);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "exit_intent" }),
      });
      setStatus("success");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          form_name: "exit_intent",
          service_interest: data.service,
          source_page: window.location.pathname,
        });
      }
    } catch {
      setStatus("loading");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ animation: "fadeIn 0.2s ease-out" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6" style={{ animation: "slideInUp 0.25s ease-out" }}>
        <style>{`@keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close" data-testid="button-exit-close">
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <p className="font-medium text-gray-900 dark:text-white">✓ Done!</p>
            <p className="text-gray-500 text-sm mt-1">Expect an estimate from Het Soni within 24 hours.</p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Wait — before you go!</h3>
            <p className="text-gray-500 text-sm mb-5">Get a free, no-obligation project estimate sent to your inbox within 24 hours.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <input {...register("name")} placeholder="Your name *" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm" data-testid="input-exit-name" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register("email")} type="email" placeholder="your@email.com *" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm" data-testid="input-exit-email" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <select {...register("service")} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 text-sm" data-testid="select-exit-service">
                  <option value="">What are you looking to build? *</option>
                  {serviceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
              </div>
              <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-60 transition-colors" data-testid="button-exit-submit">
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get My Free Estimate →"}
              </button>
              <p className="text-center text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
