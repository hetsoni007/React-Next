import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, Search, X } from "lucide-react";
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

  const getRelatedArticles = (article: BlogArticle, count: number = 2) => {
    if (!articles) return [];
    return articles
      .filter(a => a.link !== article.link && 
        a.categories.some(cat => article.categories.includes(cat)))
      .slice(0, count);
  };

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
              className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
                data-testid="text-blog-page-title"
              >
                Blog
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Thoughts on technology, product development, leadership, and 
                building businesses. Originally published on{" "}
                <a 
                  href={socialLinks.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors"
                >
                  Medium
                </a>.
              </p>
            </div>

            <div
              className={`mb-8 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
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
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  <span className="text-sm text-muted-foreground mr-2">Topics:</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-visible">
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-24 mb-4" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-6 w-4/5 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-6" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </CardContent>
                  </Card>
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
            ) : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredArticles.map((article, index) => (
                  <BlogCard 
                    key={article.link} 
                    article={article} 
                    index={index}
                    relatedArticles={getRelatedArticles(article)}
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
      </main>
      
      <Footer />
    </div>
  );
}

interface BlogCardProps {
  article: BlogArticle;
  index: number;
  relatedArticles: BlogArticle[];
}

function BlogCard({ article, index, relatedArticles }: BlogCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [showRelated, setShowRelated] = useState(false);

  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = article.description.split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));
  const cleanDescription = article.description.replace(/<[^>]*>/g, "").slice(0, 200);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
      onMouseEnter={() => setShowRelated(true)}
      onMouseLeave={() => setShowRelated(false)}
    >
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        data-testid={`blog-card-${index}`}
      >
        <Card className="group h-full cursor-pointer shadow-lg overflow-visible transition-all duration-300">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-start justify-between gap-4 mb-4">
              {article.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.categories.slice(0, 2).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
              <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-muted-foreground transition-colors">
              {article.title}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-grow">
              {cleanDescription}...
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readTime} min read
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
      
      {relatedArticles.length > 0 && (
        <div 
          className={`mt-3 p-4 bg-card rounded-lg border border-border transition-all duration-300 ${
            showRelated ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <p className="text-xs font-medium text-muted-foreground mb-2">Related Articles</p>
          <div className="space-y-2">
            {relatedArticles.map((related) => (
              <a
                key={related.link}
                href={related.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors line-clamp-1"
                data-testid={`link-related-article`}
              >
                {related.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
