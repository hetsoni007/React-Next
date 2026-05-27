import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { QuickInquiryForm } from "@/components/QuickInquiryForm";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { geoPages } from "@/lib/geoData";
import { allFaqCategories } from "@/lib/faqData";
import { Clock, DollarSign, Star, CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function GeoLandingPage() {
  const [, params] = useRoute("/:country");
  const countrySlug = params?.country || "";
  const page = geoPages[countrySlug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countrySlug]);

  if (!page) return null;

  const relevantFaqItems = page.faqIds
    .map((id) => {
      for (const cat of allFaqCategories) {
        const item = cat.items.find((i) => i.id === id);
        if (item) return item;
      }
      return null;
    })
    .filter(Boolean) as { id: string; question: string; answer: string }[];

  const faqCategory = relevantFaqItems.length > 0
    ? [{ id: "geo-faq", title: "Frequently Asked Questions", items: relevantFaqItems }]
    : [];

  const localBizSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Soni Consultancy Services",
    "url": "https://soniconsultancyservices.com",
    "email": "hello@soniconsultancyservices.com",
    "description": page.metaDescription,
    "areaServed": {
      "@type": "Country",
      "name": page.localBusinessSchema.areaServed,
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": page.localBusinessSchema.addressCountry,
    },
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://soniconsultancyservices.com" },
      { "@type": "ListItem", "position": 2, "name": page.country, "item": `https://soniconsultancyservices.com/${page.slug}` },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBizSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <title>{page.metaTitle}</title>
      <meta name="description" content={page.metaDescription} />
      <Header />
      <StickyCtaBar />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{page.country}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-20 md:py-28 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1.5 text-xs text-gray-600 dark:text-gray-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Serving {page.country} — {page.currency} invoicing available
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
              {page.h1}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">
              {page.subtitle}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Clock className="w-4 h-4" />
              <span>{page.timezone}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Get a Free Consultation →
              </Link>
              <Link
                href="/estimate"
                className="border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Get Project Estimate
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            {page.intro.split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Pain points */}
        <section className="py-16 bg-white dark:bg-black border-t border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">3 Problems We Solve for {page.country} Businesses</h2>
            <div className="space-y-6">
              {page.painPoints.map((point, i) => (
                <div key={i} className="flex gap-4 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-semibold text-gray-500 flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{point.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timezone + Currency callout */}
        <section className="py-12 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900">
                <Clock className="w-5 h-5 text-gray-400 mb-2" />
                <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">Timezone Overlap</p>
                <p className="text-gray-500 text-xs">{page.timezone}</p>
              </div>
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900">
                <DollarSign className="w-5 h-5 text-gray-400 mb-2" />
                <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">Local Currency Invoicing</p>
                <p className="text-gray-500 text-xs">We invoice in {page.currency} — no conversion risk for you</p>
              </div>
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900">
                <CheckCircle className="w-5 h-5 text-gray-400 mb-2" />
                <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">NDA Before Kickoff</p>
                <p className="text-gray-500 text-xs">We sign a mutual NDA before any detailed project discussion</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-14 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-8 bg-gray-50 dark:bg-gray-950">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gray-400 text-gray-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4 italic">
                "{page.testimonial.quote}"
              </blockquote>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{page.testimonial.author}</p>
              <p className="text-xs text-gray-400">{page.testimonial.company}</p>
            </div>
          </div>
        </section>

        {/* Services we offer */}
        <section className="py-14 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">What We Build for {page.country} Clients</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Custom SaaS Applications", href: "/services/saas-application-development" },
                { label: "Mobile Apps (iOS + Android)", href: "/services/mobile-app-development" },
                { label: "Enterprise Software", href: "/services/enterprise-software-development" },
                { label: "Cab & Chauffeur Booking Apps", href: "/services/cab-booking-app-development" },
                { label: "Influencer Marketing Platforms", href: "/services/influencer-marketing-platform" },
                { label: "Payroll Management Software", href: "/services/payroll-management-software" },
              ].map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="flex items-center gap-2 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-sm text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {svc.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="py-16 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Work with us in {page.country}
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Fill in the form below and we'll get back to you within 24 hours.
            </p>
            <QuickInquiryForm prefilledCountry={page.country} />
          </div>
        </section>

        {/* FAQ */}
        {faqCategory.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                Common Questions from {page.country} Clients
              </h2>
              <FAQAccordion
                categories={faqCategory}
                showSearch={false}
                showCategoryHeaders={false}
                ctaText="Have a question? Contact us"
                ctaHref="/contact"
                generateSchema
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
