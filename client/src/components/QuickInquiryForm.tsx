import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { serviceOptions, sourceOptions } from "@/lib/faqData";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  description: z.string().min(10, "Please describe your project (min 10 chars)").max(500, "Max 500 characters"),
  source: z.string().optional(),
  website: z.string().max(0, "").optional(),
});

type FormData = z.infer<typeof schema>;

interface QuickInquiryFormProps {
  prefilledService?: string;
  prefilledCountry?: string;
}

export function QuickInquiryForm({ prefilledService, prefilledCountry }: QuickInquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: prefilledService || "",
      fullName: "",
      email: "",
      phone: "",
      description: "",
      source: "",
      website: "",
    },
  });

  const description = watch("description", "");

  const onSubmit = async (data: FormData) => {
    if (data.website) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          formType: "quick",
          country: prefilledCountry || "",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          form_name: "quick_inquiry",
          service_interest: data.service,
          source_page: window.location.pathname,
        });
      }
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-8 bg-white dark:bg-gray-900/50 text-center">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">We've received your enquiry!</h3>
        <p className="text-gray-500 text-sm">Het Soni will personally review this and reach out within 24 hours.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-8 bg-white dark:bg-gray-900/50">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Get a Free Quote</h3>
      <p className="text-gray-500 text-sm mb-6">We'll get back to you within 24 hours.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot */}
        <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("fullName")}
              placeholder="Your name"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-sm"
              data-testid="input-quick-name"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-sm"
              data-testid="input-quick-email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Phone / WhatsApp <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-sm"
              data-testid="input-quick-phone"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Service Interested In <span className="text-red-500">*</span>
            </label>
            <select
              {...register("service")}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-sm"
              data-testid="select-quick-service"
            >
              <option value="">Select a service</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
          </div>

          {/* Description — full width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Brief Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              rows={3}
              maxLength={500}
              placeholder="What are you building? What problem does it solve?"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-sm resize-none"
              data-testid="textarea-quick-description"
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="text-red-500 text-xs">{errors.description.message}</p>
              ) : <span />}
              <span className="text-xs text-gray-400">{description.length}/500</span>
            </div>
          </div>

          {/* Source */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              How did you find us? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <select
              {...register("source")}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-sm"
              data-testid="select-quick-source"
            >
              <option value="">Select (optional)</option>
              {sourceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {status === "error" && (
          <div className="mt-4 flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            Something went wrong — please email us at{" "}
            <a href="mailto:hello@soniconsultancyservices.com" className="underline">
              hello@soniconsultancyservices.com
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-60 transition-colors"
          data-testid="button-quick-submit"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Get Free Quote →"
          )}
        </button>
      </form>
    </div>
  );
}
