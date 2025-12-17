import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, Search, X, ChevronLeft, ChevronRight, BookOpen, ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useQuery } from "@tanstack/react-query";
import type { BlogArticle } from "@shared/schema";
import { socialLinks } from "@/lib/data";
import { usePageView } from "@/hooks/use-analytics";
import blogHeroVideo from "@assets/generated_videos/abstract_tech_digital_particles.mp4";

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
      
      <main>
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              data-testid="video-blog-hero"
            >
              <source src={blogHeroVideo} type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
            <div
              className={`transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Sparkles className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/80 font-medium">Insights & Ideas</span>
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6"
                data-testid="text-blog-page-title"
              >
                Knowledge
                <span className="block text-white/60">Library</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
                Deep dives into technology, product strategy, and the art of building 
                digital products that scale. Learn from real experiences.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="flex items-center gap-2 text-white/60">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">{articles?.length || 0}+ Articles</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">{allTopics.length} Topics</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">For Founders & CTOs</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-xl mx-auto">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                    data-testid="input-blog-search"
                  />
                </div>
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="border-white/20 text-white bg-white/10 backdrop-blur-sm"
                    data-testid="button-clear-filters"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>

              {allTopics.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                  {allTopics.slice(0, 6).map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopic === topic ? "default" : "secondary"}
                      className={`cursor-pointer transition-all ${
                        selectedTopic === topic 
                          ? "bg-white text-black" 
                          : "bg-white/10 text-white/80 border-white/20 backdrop-blur-sm"
                      }`}
                      onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                      data-testid={`badge-topic-${topic}`}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
                heroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col items-center gap-2 text-white/40">
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                  <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
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
              <div className="space-y-20">
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

        <section className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-10 w-1.5 bg-foreground rounded-full" />
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold">All Articles</h2>
                <p className="text-sm text-muted-foreground mt-1">Complete reading list</p>
              </div>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="space-y-6">
                {filteredArticles.map((article, index) => (
                  <TextArticleRow key={article.link} article={article} index={index} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-12">
                No articles found. Check back soon!
              </p>
            )}
          </div>
        </section>

        <section className="py-20 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Want more insights?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Follow me on Medium for the latest articles on product development, 
              technology leadership, and building successful digital products.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={socialLinks.medium}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" data-testid="button-follow-medium">
                  Follow on Medium
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" data-testid="button-connect-linkedin">
                  Connect on LinkedIn
                </Button>
              </a>
            </div>
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
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className="h-8 sm:h-10 w-1 sm:w-1.5 bg-foreground rounded-full flex-shrink-0" />
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate" data-testid={`text-topic-${topic}`}>
              {topic}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {articles.length} {articles.length === 1 ? "article" : "articles"} available
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="transition-opacity"
            data-testid={`button-scroll-left-${topic}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
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

interface TextArticleRowProps {
  article: BlogArticle;
  index: number;
}

function TextArticleRow({ article, index }: TextArticleRowProps) {
  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = article.description.split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));
  const cleanDescription = article.description.replace(/<[^>]*>/g, "");

  const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <Link
      href={`/blog/${slug}`}
      className="block group"
      data-testid={`text-article-row-${index}`}
    >
      <div className="py-6 border-b border-border hover-elevate rounded-md px-4 -mx-4 transition-all">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {article.categories.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime} min read
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground/80 transition-colors flex items-start gap-2">
          {article.title}
          <ExternalLink className="h-4 w-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-60 transition-opacity" />
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {cleanDescription}
        </p>
      </div>
    </Link>
  );
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

  const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const accentColors = [
    "from-neutral-700 to-neutral-800",
    "from-neutral-600 to-neutral-700",
    "from-neutral-800 to-neutral-900",
    "from-neutral-500 to-neutral-600",
  ];

  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 snap-start group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/blog/${slug}`}
        className="block h-full"
        data-testid={`blog-card-${topicSlug}-${index}`}
      >
        <div className="relative h-80">
          <Card
            className={`h-full overflow-hidden transition-all duration-500 cursor-pointer border-2 ${
              isHovered ? "shadow-2xl border-foreground/20" : "shadow-lg border-transparent"
            }`}
            style={{
              transform: isHovered
                ? "translateY(-8px) scale(1.02)"
                : "translateY(0) scale(1)",
              transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border-color 0.3s ease",
            }}
          >
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                accentColors[index % accentColors.length]
              }`}
            />

            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between gap-2 mb-4">
                {article.categories.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {article.categories[0]}
                  </Badge>
                )}
                <ExternalLink
                  className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-x-0.5 -translate-y-0.5" : "opacity-40"
                  }`}
                />
              </div>

              <h3
                className={`text-lg font-semibold mb-3 transition-colors duration-300 line-clamp-2 ${
                  isHovered ? "text-foreground" : "text-foreground/90"
                }`}
              >
                {article.title}
              </h3>

              <div className="flex-grow overflow-hidden">
                <p
                  className={`text-sm text-muted-foreground leading-relaxed transition-all duration-500 ${
                    isHovered ? "line-clamp-none" : "line-clamp-4"
                  }`}
                >
                  {cleanDescription.slice(0, isHovered ? 300 : 120)}
                  {cleanDescription.length > (isHovered ? 300 : 120) && "..."}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground pt-4 mt-auto border-t border-border">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {readTime} min read
                </span>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground/30 to-transparent transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </CardContent>
          </Card>
        </div>
      </Link>
    </div>
  );
}
