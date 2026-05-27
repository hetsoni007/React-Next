import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2, CheckCircle, Rocket, Smartphone, Building2, Car, BarChart3, Wrench } from "lucide-react";

interface ProjectInquiryModalProps {
  open: boolean;
  onClose: () => void;
  prefilledCountry?: string;
}

const step1Schema = z.object({
  fullName: z.string().min(2, "Name required"),
  company: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().min(5, "Phone required"),
  country: z.string().min(1, "Country required"),
});

const step2Schema = z.object({
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  description: z.string().min(10, "Please describe your project").max(1000),
});

const step3Schema = z.object({
  hasDesigns: z.string().min(1, "Please select an option"),
  hasCodebase: z.string().min(1, "Please select an option"),
  commChannels: z.array(z.string()).min(1, "Select at least one channel"),
  howHeard: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const PROJECT_TYPES = [
  { value: "saas", label: "SaaS Product", icon: Rocket },
  { value: "mobile", label: "Mobile App", icon: Smartphone },
  { value: "enterprise", label: "Enterprise System", icon: Building2 },
  { value: "booking", label: "Booking / Transport App", icon: Car },
  { value: "analytics", label: "Analytics / Dashboard", icon: BarChart3 },
  { value: "other", label: "Other / Not sure", icon: Wrench },
];

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not sure yet",
];

const TIMELINES = ["ASAP (under 1 month)", "1–3 months", "3–6 months", "6–12 months", "Flexible"];
const COUNTRIES = ["USA", "UK", "UAE", "Australia", "India", "Other"];
const COMM_CHANNELS = ["Email", "WhatsApp", "Zoom", "Google Meet", "Slack"];
const HOW_HEARD = ["Google", "LinkedIn", "Twitter/X", "Referral", "Clutch", "GoodFirms", "Other"];

export function ProjectInquiryModal({ open, onClose, prefilledCountry }: ProjectInquiryModalProps) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data & Step3Data>>({});

  const step1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { country: prefilledCountry || "", fullName: "", company: "", email: "", phone: "" },
  });

  const step2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { projectType: "", budget: "", timeline: "", description: "" },
  });

  const step3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { hasDesigns: "", hasCodebase: "", commChannels: [], howHeard: "", additionalInfo: "" },
  });

  const description = step2.watch("description", "");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleStep1 = step1.handleSubmit((data) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(2);
  });

  const handleStep2 = step2.handleSubmit((data) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(3);
  });

  const handleStep3 = step3.handleSubmit(async (data) => {
    const final = { ...formData, ...data, formType: "full_inquiry" };
    setStatus("loading");
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(final),
      });
      setStatus("success");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          form_name: "project_inquiry_modal",
          service_interest: formData.projectType,
          source_page: window.location.pathname,
        });
      }
    } catch {
      setStatus("loading");
    }
  });

  const stepLabels = ["1. Contact", "2. Project", "3. Details"];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ animation: "slideInUp 0.25s ease-out" }}
      >
        {status === "success" ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">We've received your project brief!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Het Soni will personally review this and reach out within 24 hours.
            </p>
            <a
              href="https://calendly.com/soniconsultancyservices"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mb-3"
            >
              Book a Calendly Call →
            </a>
            <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">Close</button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {step === 1 ? "Tell us about your project" : step === 2 ? "What are you building?" : "Almost there!"}
                </h2>
                <div className="flex gap-3 mt-2">
                  {stepLabels.map((label, i) => (
                    <span
                      key={label}
                      className={`text-xs ${i + 1 === step ? "text-black dark:text-white font-medium" : i + 1 < step ? "text-green-600" : "text-gray-400"}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" data-testid="button-modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full mb-8">
              <div
                className="h-1 bg-black dark:bg-white rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <form onSubmit={handleStep1} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                    <input {...step1.register("fullName")} placeholder="Your full name" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm" data-testid="input-modal-name" />
                    {step1.formState.errors.fullName && <p className="text-red-500 text-xs mt-1">{step1.formState.errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company / Startup (optional)</label>
                    <input {...step1.register("company")} placeholder="Acme Inc." className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country *</label>
                    <select {...step1.register("country")} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 text-sm" data-testid="select-modal-country">
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {step1.formState.errors.country && <p className="text-red-500 text-xs mt-1">{step1.formState.errors.country.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                    <input {...step1.register("email")} type="email" placeholder="you@company.com" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm" data-testid="input-modal-email" />
                    {step1.formState.errors.email && <p className="text-red-500 text-xs mt-1">{step1.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone / WhatsApp *</label>
                    <input {...step1.register("phone")} type="tel" placeholder="+1 234 567 8900" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm" data-testid="input-modal-phone" />
                    {step1.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{step1.formState.errors.phone.message}</p>}
                  </div>
                </div>
                <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-2" data-testid="button-modal-next1">Next →</button>
              </form>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <form onSubmit={handleStep2} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PROJECT_TYPES.map(({ value, label, icon: Icon }) => (
                      <label key={value} className={`flex flex-col items-center gap-1.5 p-3 border rounded-xl cursor-pointer text-xs text-center transition-colors ${step2.watch("projectType") === value ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black" : "border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
                        <input type="radio" value={value} {...step2.register("projectType")} className="sr-only" />
                        <Icon className="w-5 h-5" />
                        {label}
                      </label>
                    ))}
                  </div>
                  {step2.formState.errors.projectType && <p className="text-red-500 text-xs mt-1">{step2.formState.errors.projectType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Budget *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGETS.map((b) => (
                      <label key={b} className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer text-xs transition-colors ${step2.watch("budget") === b ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black" : "border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
                        <input type="radio" value={b} {...step2.register("budget")} className="sr-only" />
                        {b}
                      </label>
                    ))}
                  </div>
                  {step2.formState.errors.budget && <p className="text-red-500 text-xs mt-1">{step2.formState.errors.budget.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timeline *</label>
                  <select {...step2.register("timeline")} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 text-sm">
                    <option value="">Select timeline</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {step2.formState.errors.timeline && <p className="text-red-500 text-xs mt-1">{step2.formState.errors.timeline.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Describe your project *</label>
                  <textarea {...step2.register("description")} rows={5} maxLength={1000} placeholder="What problem are you solving? Who are your users? What's the core feature you need first?" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm resize-none" />
                  <div className="flex justify-between mt-1">
                    {step2.formState.errors.description ? <p className="text-red-500 text-xs">{step2.formState.errors.description.message}</p> : <span />}
                    <span className="text-xs text-gray-400">{description.length}/1000</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 dark:border-gray-700 py-3 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">← Back</button>
                  <button type="submit" className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors" data-testid="button-modal-next2">Next →</button>
                </div>
              </form>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <form onSubmit={handleStep3} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Do you have designs/wireframes? *</label>
                  <div className="space-y-2">
                    {["Yes — I have Figma/XD files", "Partial — rough sketches only", "No — I need design too"].map((opt) => (
                      <label key={opt} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer text-sm transition-colors ${step3.watch("hasDesigns") === opt ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
                        <input type="radio" value={opt} {...step3.register("hasDesigns")} className="accent-black dark:accent-white" />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {step3.formState.errors.hasDesigns && <p className="text-red-500 text-xs mt-1">{step3.formState.errors.hasDesigns.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Do you have an existing codebase? *</label>
                  <div className="space-y-2">
                    {["Yes — needs to be extended", "No — starting from scratch", "Not sure"].map((opt) => (
                      <label key={opt} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer text-sm transition-colors ${step3.watch("hasCodebase") === opt ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
                        <input type="radio" value={opt} {...step3.register("hasCodebase")} className="accent-black dark:accent-white" />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {step3.formState.errors.hasCodebase && <p className="text-red-500 text-xs mt-1">{step3.formState.errors.hasCodebase.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred communication *</label>
                  <div className="flex flex-wrap gap-2">
                    {COMM_CHANNELS.map((ch) => {
                      const vals = step3.watch("commChannels") || [];
                      const checked = vals.includes(ch);
                      return (
                        <label key={ch} className={`flex items-center gap-2 px-3 py-2 border rounded-full cursor-pointer text-xs transition-colors ${checked ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black" : "border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
                          <input
                            type="checkbox"
                            value={ch}
                            className="sr-only"
                            checked={checked}
                            onChange={(e) => {
                              const curr = step3.getValues("commChannels") || [];
                              if (e.target.checked) step3.setValue("commChannels", [...curr, ch], { shouldValidate: true });
                              else step3.setValue("commChannels", curr.filter((v) => v !== ch), { shouldValidate: true });
                            }}
                          />
                          {ch}
                        </label>
                      );
                    })}
                  </div>
                  {step3.formState.errors.commChannels && <p className="text-red-500 text-xs mt-1">{step3.formState.errors.commChannels.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">How did you hear about us? (optional)</label>
                  <select {...step3.register("howHeard")} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 text-sm">
                    <option value="">Select (optional)</option>
                    {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Anything else you'd like us to know? (optional)</label>
                  <textarea {...step3.register("additionalInfo")} rows={3} placeholder="Share anything that would help us understand your project better..." className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm resize-none" />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 dark:border-gray-700 py-3 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">← Back</button>
                  <button type="submit" disabled={status === "loading"} className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-60 transition-colors" data-testid="button-modal-submit">
                    {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit & Book Free Call →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
