import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogArticle } from "@shared/schema";

export function BlogPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  const { data: articles, isLoading } = useQuery<BlogArticle[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 lg:px-8 bg-card"
      data-testid="section-blog-preview"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
              data-testid="text-blog-title"
            >
              Latest Insights
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Thoughts on technology, product development, and building businesses.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" data-testid="button-view-all-blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-visible">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : articles && articles.length > 0 ? (
            articles.slice(0, 3).map((article, index) => (
              <BlogCard
                key={article.link}
                article={article}
                index={index}
                isVisible={isVisible}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No articles available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface BlogCardProps {
  article: BlogArticle;
  index: number;
  isVisible: boolean;
}

function BlogCard({ article, index, isVisible }: BlogCardProps) {
  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const readTime = Math.max(3, Math.ceil(article.description.length / 1000));

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      data-testid={`card-blog-${index}`}
    >
      <Card
        className={`group cursor-pointer h-full transition-all duration-500 shadow-lg overflow-visible ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${(index + 1) * 100}ms` }}
      >
        <CardContent className="p-6">
          {article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-muted-foreground transition-colors">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
            {article.description.replace(/<[^>]*>/g, "").slice(0, 150)}...
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime} min read
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
