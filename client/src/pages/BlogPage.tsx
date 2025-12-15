import { useState, useMemo, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, Search, X, ChevronLeft, ChevronRight, BookOpen, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useQuery } from "@tanstack/react-query";
import type { BlogArticle } from "@shared/schema";
import { socialLinks } from "@/lib/data";
import { usePageView } from "@/hooks/use-analytics";

export default function BlogPage() {
  usePageView("/blog");
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const { data: articles, isLoading, error } = useQuery<BlogArticle[]>({
    queryKey: ["/api/blog"],
  });

  const allTopics = useMemo(() => {
    if (!articles) return [];
    const topics = new Set<string>();
    articles.forEach(article => {
      article.categories.forEach(cat => topics.add(cat));
    });
    return Array.from(topics).sort();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    
    return articles.filter(article => {
      const matchesSearch = searchQuery === "" || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTopic = selectedTopic === null || 
        article.categories.includes(selectedTopic);
      
      return matchesSearch && matchesTopic;
    });
  }, [articles, searchQuery, selectedTopic]);

  const articlesByTopic = useMemo(() => {
    if (!filteredArticles.length) return {};
    
    const grouped: Record<string, BlogArticle[]> = {};
    
    if (selectedTopic) {
      grouped[selectedTopic] = filteredArticles;
    } else {
      filteredArticles.forEach(article => {
        const topic = article.categories[0] || "General";
        if (!grouped[topic]) {
          grouped[topic] = [];
        }
        grouped[topic].push(article);
      });
    }
    
    return grouped;
  }, [filteredArticles, selectedTopic]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTopic(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTopic !== null;

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog">
      <Header />
      
      <main className="pt-24 lg:pt-32">
        <section
          ref={heroRef}
          className="py-16 lg:py-24 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
                data-testid="text-blog-page-title"
              >
                Knowledge Library
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Explore thoughts on technology, product development, leadership, and 
                building businesses. Hover to preview, click to read more.
              </p>
            </div>

            <div
              className={`mb-12 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search the library..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-blog-search"
                  />
                </div>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    data-testid="button-clear-filters"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {allTopics.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                  <span className="text-sm text-muted-foreground mr-2">Browse by topic:</span>
                  {allTopics.slice(0, 8).map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopic === topic ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                      data-testid={`badge-topic-${topic}`}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-16">
                {Array.from({ length: 2 }).map((_, sectionIndex) => (
                  <div key={sectionIndex}>
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="flex gap-6 overflow-hidden">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex-shrink-0 w-80">
                          <Skeleton className="h-64 w-full rounded-lg" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  Unable to load articles at the moment.
                </p>
                <a 
                  href={socialLinks.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  Visit my Medium profile directly
                </a>
              </div>
            ) : Object.keys(articlesByTopic).length > 0 ? (
              <div className="space-y-16">
                {Object.entries(articlesByTopic).map(([topic, topicArticles], sectionIndex) => (
                  <TopicCarousel
                    key={topic}
                    topic={topic}
                    articles={topicArticles}
                    sectionIndex={sectionIndex}
                  />
                ))}
              </div>
            ) : hasActiveFilters ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  No articles match your search. Try different keywords or clear filters.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  No articles available yet. Check back soon!
                </p>
                <a 
                  href={socialLinks.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  Visit my Medium profile
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Want more insights?</h2>
            <p className="text-muted-foreground mb-6">
              Follow me on Medium for the latest articles and updates.
            </p>
            <a
              href={socialLinks.medium}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" data-testid="button-follow-medium">
                Follow on Medium
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

interface TopicCarouselProps {
  topic: string;
  articles: BlogArticle[];
  sectionIndex: number;
}

function TopicCarousel({ topic, articles, sectionIndex }: TopicCarouselProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [articles.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${sectionIndex * 150}ms` }}
      data-testid={`topic-carousel-${topic.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-foreground rounded-full" />
          <h2 className="text-2xl font-semibold" data-testid={`text-topic-${topic}`}>
            {topic}
          </h2>
          <Badge variant="secondary" className="text-xs">
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="transition-opacity"
            data-testid={`button-scroll-left-${topic}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="transition-opacity"
            data-testid={`button-scroll-right-${topic}`}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {articles.map((article, index) => (
          <LibraryCard key={article.link} article={article} index={index} topicSlug={topic.toLowerCase().replace(/\s+/g, "-")} />
        ))}
      </div>
    </div>
  );
}

interface LibraryCardProps {
  article: BlogArticle;
  index: number;
  topicSlug: string;
}

function LibraryCard({ article, index, topicSlug }: LibraryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = article.description.split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));
  const cleanDescription = article.description.replace(/<[^>]*>/g, "");

  const spineColors = [
    "from-neutral-800 to-neutral-900 dark:from-neutral-200 dark:to-neutral-300",
    "from-neutral-700 to-neutral-800 dark:from-neutral-300 dark:to-neutral-400",
    "from-neutral-600 to-neutral-700 dark:from-neutral-400 dark:to-neutral-500",
    "from-neutral-500 to-neutral-600 dark:from-neutral-500 dark:to-neutral-600",
  ];

  return (
    <div
      className="flex-shrink-0 w-80 snap-start group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        data-testid={`blog-card-${topicSlug}-${index}`}
      >
        <div className="relative h-72 perspective-1000">
          <Card
            className={`h-full overflow-hidden transition-all duration-500 cursor-pointer ${
              isHovered ? "shadow-2xl" : "shadow-lg"
            }`}
            style={{
              transform: isHovered
                ? "rotateY(-5deg) rotateX(2deg) scale(1.02)"
                : "rotateY(0deg) rotateX(0deg) scale(1)",
              transformStyle: "preserve-3d",
              transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease",
            }}
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b ${
                spineColors[index % spineColors.length]
              } rounded-l-md`}
            />

            <CardContent className="p-6 pl-8 flex flex-col h-full relative">
              <div className="flex items-start justify-between gap-2 mb-3">
                {article.categories.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {article.categories[0]}
                  </Badge>
                )}
                <ExternalLink
                  className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-x-0.5 -translate-y-0.5" : "opacity-50"
                  }`}
                />
              </div>

              <h3
                className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                  isHovered ? "line-clamp-none" : "line-clamp-2"
                }`}
              >
                {article.title}
              </h3>

              <div
                className={`flex-grow overflow-hidden transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-70"
                }`}
              >
                <p
                  className={`text-sm text-muted-foreground leading-relaxed transition-all duration-500 ${
                    isHovered ? "line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {cleanDescription.slice(0, isHovered ? 400 : 150)}
                  {cleanDescription.length > (isHovered ? 400 : 150) && "..."}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 mt-auto border-t border-border">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {readTime} min
                </span>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-foreground/20 via-foreground/40 to-foreground/20 transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </CardContent>
          </Card>

          <div
            className={`absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-t from-background to-transparent blur-sm transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-50"
            }`}
          />
        </div>
      </a>
    </div>
  );
}
