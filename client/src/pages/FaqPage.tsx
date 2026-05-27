import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { allFaqCategories } from "@/lib/faqData";
import { Link } from "wouter";

export default function FaqPage() {
  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://soniconsultancyservices.com" },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://soniconsultancyservices.com/faq" },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <title>Frequently Asked Questions | Soni Consultancy Services</title>
      <meta name="description" content="Answers to common questions about our software development services — pricing, timelines, process, technology, and more." />
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">FAQ</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-20 md:py-24 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-4">Help Centre</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need to know about working with Soni Consultancy Services — pricing, process, technology, and more.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <FAQAccordion
              categories={allFaqCategories}
              showSearch
              showCategoryHeaders
              ctaText="Still have questions? Ask us directly"
              ctaHref="/contact"
              generateSchema
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Ready to start your project?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
              Book a free 30-minute consultation. No commitment needed — just a conversation about what you're building.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Book a Free Consultation →
              </Link>
              <Link
                href="/estimate"
                className="border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Get a Project Estimate
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
