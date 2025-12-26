import { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, Search, X, BookOpen, ArrowRight, Sparkles, TrendingUp, Users, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useQuery } from "@tanstack/react-query";
import type { BlogArticle } from "@shared/schema";
import { socialLinks } from "@/lib/data";
import { usePageView } from "@/hooks/use-analytics";
import blogHeroVideo from "@assets/generated_videos/abstract_tech_digital_particles.mp4";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function BlogPage() {
  usePageView("/blog");
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["hsl(0, 0%, 100%)", "hsl(0, 0%, 98%)", "hsl(0, 0%, 96%)", "hsl(0, 0%, 100%)"]
  );

  const darkBackgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["hsl(0, 0%, 3%)", "hsl(0, 0%, 6%)", "hsl(0, 0%, 8%)", "hsl(0, 0%, 3%)"]
  );

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

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTopic(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTopic !== null;

  const [isDark, setIsDark] = useState(false);
  
  useIsomorphicLayoutEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen" data-testid="page-blog">
      <motion.div 
        className="fixed inset-0 -z-10 transition-colors"
        style={{ backgroundColor: isDark ? darkBackgroundColor : backgroundColor }}
      />
      <Header />
      
      <main>
        <section
          ref={heroRef}
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
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
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                <motion.div 
                  className="flex flex-wrap items-center justify-center gap-2 mt-8"
                  initial={{ opacity: 0 }}
                  animate={heroVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
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
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={heroVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex flex-col items-center gap-2 text-white/40">
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-32 px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <BlogSkeleton />
            ) : error ? (
              <ErrorState />
            ) : filteredArticles.length > 0 ? (
              <div className="space-y-20">
                {featuredArticle && (
                  <FeaturedArticle article={featuredArticle} />
                )}
                
                {gridArticles.length > 0 && (
                  <CreativeGrid articles={gridArticles} />
                )}
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
              <EmptyState />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
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
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function FeaturedArticle({ article }: { article: BlogArticle }) {
  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = (article.fullContent || article.description).split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));
  const cleanDescription = article.description.replace(/<[^>]*>/g, "");

  const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-1.5 bg-foreground rounded-full" />
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold">Featured</h2>
          <p className="text-sm text-muted-foreground">Latest deep dive</p>
        </div>
      </div>

      <Link href={`/blog/${slug}`} className="block group" data-testid="featured-article">
        <Card className="overflow-hidden border-2 border-transparent hover:border-foreground/10 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-0">
            {article.thumbnail && (
              <div className="relative h-64 lg:h-auto overflow-hidden bg-muted">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
              </div>
            )}
            <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.categories.slice(0, 3).map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-foreground/80 transition-colors leading-tight">
                {article.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {cleanDescription}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

function CreativeGrid({ articles }: { articles: BlogArticle[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-1.5 bg-foreground rounded-full" />
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold">All Articles</h2>
          <p className="text-sm text-muted-foreground">{articles.length} articles to explore</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={article.link} article={article} index={index} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ article, index }: { article: BlogArticle; index: number }) {
  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const wordCount = article.description.split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));
  const cleanDescription = article.description.replace(/<[^>]*>/g, "");

  const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
    >
      <Link
        href={`/blog/${slug}`}
        className="block h-full group"
        data-testid={`blog-card-${index}`}
      >
        <Card className="h-full overflow-hidden hover:border-foreground/10 transition-all duration-300 hover:shadow-lg">
          {article.thumbnail && (
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                {article.categories.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs bg-black/50 text-white border-0">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <CardContent className="p-5">
            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-foreground/80 transition-colors leading-snug">
              {article.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {cleanDescription}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime} min
              </span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function BlogSkeleton() {
  return (
    <div className="space-y-12">
      <div>
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState() {
  return (
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
  );
}

function EmptyState() {
  return (
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
  );
}
