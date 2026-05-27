import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { QuickInquiryForm } from "@/components/QuickInquiryForm";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { servicePages } from "@/lib/serviceData";
import { allFaqCategories } from "@/lib/faqData";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";
import { useEffect } from "react";

export default function ServiceDetailPage() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug || "";
  const page = servicePages[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Service not found</h1>
            <Link href="/services" className="text-gray-500 hover:text-black underline text-sm">← Back to Services</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Collect FAQ items relevant to this page
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
    ? [{ id: "service-faq", title: "Frequently Asked Questions", items: relevantFaqItems }]
    : [];

  const serviceSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.schemaName,
    "description": page.schemaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Soni Consultancy Services",
      "url": "https://soniconsultancyservices.com",
    },
    "areaServed": ["US", "GB", "AE", "AU"],
    "url": `https://soniconsultancyservices.com/services/${page.slug}`,
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://soniconsultancyservices.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://soniconsultancyservices.com/services" },
      { "@type": "ListItem", "position": 3, "name": page.h1, "item": `https://soniconsultancyservices.com/services/${page.slug}` },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
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
            <Link href="/services" className="hover:text-black dark:hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white truncate">{page.h1}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-20 md:py-28 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
              {page.h1}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
              {page.subtitle}
            </p>
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

        {/* Introduction */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            {page.intro.split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-white dark:bg-black border-t border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">What You Get</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {page.benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-0.5">{benefit.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
                {section.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-sm">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Related blog posts */}
        {page.relatedPosts.length > 0 && (
          <section className="py-14 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                Further Reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {page.relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-100 leading-snug">
                      {post.title} →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quick Inquiry Form */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">{page.cta}</h2>
            <QuickInquiryForm prefilledService={page.schemaName} />
          </div>
        </section>

        {/* FAQ */}
        {faqCategory.length > 0 && (
          <section className="py-16 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Common Questions</h2>
              <FAQAccordion
                categories={faqCategory}
                showSearch={false}
                showCategoryHeaders={false}
                ctaText="Have a more specific question? Contact us"
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
