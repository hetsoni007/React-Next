import { useState, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, ExternalLink, BookOpen, Share2, Copy, Check, User } from "lucide-react";
import { SiX, SiLinkedin, SiFacebook, SiWhatsapp } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import type { BlogArticle } from "@shared/schema";
import { usePageView } from "@/hooks/use-analytics";
import { useToast } from "@/hooks/use-toast";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const { toast } = useToast();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { top, height } = contentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrolled = Math.max(0, -top);
        const totalHeight = height - windowHeight;
        const progress = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = article?.title || "";

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: "Link copied!", description: "Share it with your network" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

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

  const wordCount = (article.fullContent || article.description).split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  const contentParagraphs = (article.fullContent || article.description)
    .split("\n\n")
    .filter(p => p.trim());

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-detail">
      <div 
        className="fixed top-0 left-0 h-1 bg-foreground z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        data-testid="scroll-progress"
      />
      
      <Header />
      
      <aside className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <Card className="p-3 shadow-lg">
          <div className="flex flex-col items-center gap-3">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button size="sm" className="gap-2" data-testid="button-view-on-medium-sidebar">
                <BookOpen className="h-4 w-4" />
                Medium
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
            
            <div className="w-full h-px bg-border" />
            
            <span className="text-xs text-muted-foreground">Share</span>
            
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" data-testid="button-share-twitter">
                <SiX className="h-4 w-4" />
              </Button>
            </a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" data-testid="button-share-linkedin">
                <SiLinkedin className="h-4 w-4" />
              </Button>
            </a>
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" data-testid="button-share-facebook">
                <SiFacebook className="h-4 w-4" />
              </Button>
            </a>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" data-testid="button-share-whatsapp">
                <SiWhatsapp className="h-4 w-4" />
              </Button>
            </a>
            <Button size="icon" variant="ghost" onClick={copyLink} data-testid="button-copy-link">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </aside>
      
      <main ref={contentRef}>
        <section className="relative py-20 lg:py-32 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-20 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {article.categories.map((cat) => (
                <Badge key={cat} data-testid={`badge-category-${cat}`}>
                  {cat}
                </Badge>
              ))}
            </div>

            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-tight"
              data-testid="text-article-title"
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author || "Het Soni"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" data-testid="button-read-on-medium-hero">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read on Medium
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              
              <div className="flex items-center gap-2 md:hidden">
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" data-testid="button-share-twitter-mobile">
                    <SiX className="h-4 w-4" />
                  </Button>
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" data-testid="button-share-linkedin-mobile">
                    <SiLinkedin className="h-4 w-4" />
                  </Button>
                </a>
                <Button size="icon" variant="outline" onClick={copyLink} data-testid="button-copy-link-mobile">
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {article.thumbnail && (
              <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                  data-testid="img-article-thumbnail"
                />
              </div>
            )}

            <article className="prose prose-lg dark:prose-invert max-w-none" data-testid="article-content">
              {contentParagraphs.map((paragraph, index) => {
                const trimmed = paragraph.trim();
                
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }
                
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-8 mb-3">
                      {trimmed.replace("### ", "")}
                    </h3>
                  );
                }
                
                if (trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n").filter(l => l.startsWith("- "));
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                      {items.map((item, i) => (
                        <li key={i} className="text-muted-foreground leading-relaxed">
                          {item.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                    {trimmed}
                  </p>
                );
              })}
            </article>

            <Card className="mt-16 bg-muted/30 border-2">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Read the full article on Medium for the complete experience, 
                  including comments and the ability to follow for more content.
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" data-testid="button-read-on-medium-footer">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Continue on Medium
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <div className="mt-12 pt-8 border-t border-border">
              <h4 className="text-lg font-semibold mb-4">Share this article</h4>
              <div className="flex flex-wrap items-center gap-3">
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2" data-testid="button-share-twitter-footer">
                    <SiX className="h-4 w-4" />
                    Twitter
                  </Button>
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2" data-testid="button-share-linkedin-footer">
                    <SiLinkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2" data-testid="button-share-facebook-footer">
                    <SiFacebook className="h-4 w-4" />
                    Facebook
                  </Button>
                </a>
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2" data-testid="button-share-whatsapp-footer">
                    <SiWhatsapp className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
                <Button variant="outline" className="gap-2" onClick={copyLink} data-testid="button-copy-link-footer">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
