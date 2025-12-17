import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, ExternalLink, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { BlogArticle } from "@shared/schema";
import { usePageView } from "@/hooks/use-analytics";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  
  usePageView(`/blog/${slug}`);

  const { data: articles, isLoading } = useQuery<BlogArticle[]>({
    queryKey: ["/api/blog"],
  });

  const article = articles?.find((a) => {
    const articleSlug = a.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return articleSlug === slug;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = article.description.split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));
  const cleanDescription = article.description.replace(/<[^>]*>/g, "");

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-detail">
      <Header />
      
      <main>
        <section className="relative py-20 lg:py-32 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {article.categories.map((cat) => (
                <Badge key={cat} variant="secondary" data-testid={`badge-category-${cat}`}>
                  {cat}
                </Badge>
              ))}
            </div>

            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
              data-testid="text-article-title"
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </span>
            </div>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" data-testid="button-read-on-medium-hero">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Full Article on Medium
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {article.thumbnail && (
              <div className="mb-12 rounded-lg overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                  data-testid="img-article-thumbnail"
                />
              </div>
            )}

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Article Preview
                </h2>
                <p 
                  className="text-lg leading-relaxed text-muted-foreground"
                  data-testid="text-article-description"
                >
                  {cleanDescription}
                </p>
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Continue Reading</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                This is a preview of the article. Read the full article on Medium for 
                the complete content, including all details, examples, and insights.
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" data-testid="button-read-on-medium">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read on Medium
                  <ExternalLink className="ml-2 h-4 w-4" />
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
