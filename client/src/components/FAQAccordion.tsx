import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, ThumbsUp, ThumbsDown, Send, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

interface ItemFeedback {
  rating: "up" | "down" | null;
  feedbackText: string;
  submitted: boolean;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function FAQItemRow({
  item,
  searchQuery,
}: {
  item: FAQItem;
  searchQuery: string;
}) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<ItemFeedback>(() => {
    try {
      const stored = localStorage.getItem(`faq-feedback-${item.id}`);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { rating: null, feedbackText: "", submitted: false };
  });
  const [negativeInput, setNegativeInput] = useState("");
  const answerRef = useRef<HTMLDivElement>(null);

  const saveFeedback = (updated: ItemFeedback) => {
    setFeedback(updated);
    try {
      localStorage.setItem(`faq-feedback-${item.id}`, JSON.stringify(updated));
    } catch {}
  };

  const handleRating = (rating: "up" | "down") => {
    if (feedback.rating) return;
    saveFeedback({ ...feedback, rating });
  };

  const handleNegativeSubmit = () => {
    if (!negativeInput.trim()) return;
    const updated = { ...feedback, feedbackText: negativeInput, submitted: true };
    saveFeedback(updated);
    console.log(`FAQ feedback [${item.id}]:`, negativeInput);
  };

  return (
    <div id={item.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left group focus:outline-none"
        data-testid={`faq-toggle-${item.id}`}
      >
        <span className="pr-6 text-base font-medium text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-100 transition-colors leading-snug">
          {highlightText(item.question, searchQuery)}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </span>
      </button>

      <div
        ref={answerRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? (answerRef.current ? `${answerRef.current.scrollHeight + 80}px` : "600px") : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="pb-5">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-4">
            {highlightText(item.answer, searchQuery)}
          </p>

          {/* Micro-feedback */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            {feedback.rating === null ? (
              <>
                <span className="text-xs text-gray-400">Was this helpful?</span>
                <button
                  onClick={() => handleRating("up")}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 transition-colors"
                  data-testid={`faq-thumbsup-${item.id}`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Yes
                </button>
                <button
                  onClick={() => handleRating("down")}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                  data-testid={`faq-thumbsdown-${item.id}`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" /> No
                </button>
              </>
            ) : feedback.rating === "up" ? (
              <span className="text-xs text-green-600">Thanks for the feedback!</span>
            ) : feedback.submitted ? (
              <span className="text-xs text-gray-400">Thanks — we'll improve this answer.</span>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-gray-400 flex-shrink-0">What were you looking for?</span>
                <input
                  type="text"
                  value={negativeInput}
                  onChange={(e) => setNegativeInput(e.target.value)}
                  placeholder="Your question..."
                  className="flex-1 text-xs border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-gray-400"
                  onKeyDown={(e) => e.key === "Enter" && handleNegativeSubmit()}
                />
                <button
                  onClick={handleNegativeSubmit}
                  className="text-xs text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3 h-3" /> Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FAQAccordionProps {
  categories: FAQCategory[];
  showSearch?: boolean;
  showCategoryHeaders?: boolean;
  ctaText?: string;
  ctaHref?: string;
  generateSchema?: boolean;
}

export function FAQAccordion({
  categories,
  showSearch = true,
  showCategoryHeaders = true,
  ctaText = "Still have questions? Ask us directly",
  ctaHref = "/contact",
  generateSchema = false,
}: FAQAccordionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const allItems = useMemo(() => categories.flatMap((c) => c.items), [categories]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, searchQuery]);

  const schemaJson = generateSchema
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      })
    : null;

  return (
    <div>
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}

      {showSearch && (
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-sm"
            data-testid="faq-search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {filteredCategories.length === 0 ? (
        <p className="text-center text-gray-400 py-8 text-sm">
          No questions match "{searchQuery}".
        </p>
      ) : (
        <div className="space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.id} id={category.id}>
              {showCategoryHeaders && (
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
                  {category.title}
                </h3>
              )}
              <div className="border border-gray-100 dark:border-gray-800 rounded-2xl px-6 bg-white dark:bg-gray-900/50">
                {category.items.map((item) => (
                  <FAQItemRow key={item.id} item={item} searchQuery={searchQuery} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-3">Didn't find your answer?</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          data-testid="faq-cta"
        >
          <MessageCircle className="w-4 h-4" />
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
