import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Clock, Mail, MessageSquare, TrendingUp } from "lucide-react";

interface AnalyticsSummaryData {
  totalPageViews: number;
  uniqueSessions: number;
  avgEngagementTime: number;
  topPages: { page: string; views: number }[];
  contactSubmissions: number;
  newsletterSubscriptions: number;
  recentEvents: Array<{
    id: string;
    eventType: string;
    page: string;
    duration: number | null;
    createdAt: string | null;
  }>;
}

export default function AnalyticsDashboard() {
  const { data, isLoading, error } = useQuery<AnalyticsSummaryData>({
    queryKey: ["/api/analytics/summary"],
  });

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatEventType = (type: string) => {
    return type.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const getPageLabel = (page: string) => {
    const labels: Record<string, string> = {
      "/": "Home",
      "/services": "Services",
      "/portfolio": "Portfolio",
      "/journey": "Journey",
      "/blog": "Blog",
      "/contact": "Contact",
    };
    return labels[page] || page;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-12">
              <Badge variant="secondary" className="mb-4">Admin</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Analytics Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Track page views, engagement, and lead generation metrics.
              </p>
            </div>

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-4 bg-muted rounded w-24" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 bg-muted rounded w-16" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {error && (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="text-destructive">Failed to load analytics data. Please try again.</p>
                </CardContent>
              </Card>
            )}

            {data && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card data-testid="card-page-views">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Page Views
                      </CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold" data-testid="text-page-views-count">
                        {data.totalPageViews.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-unique-sessions">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Unique Sessions
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold" data-testid="text-sessions-count">
                        {data.uniqueSessions.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-avg-engagement">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Avg Engagement Time
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold" data-testid="text-engagement-time">
                        {formatTime(data.avgEngagementTime)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-contact-submissions">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Contact Submissions
                      </CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold" data-testid="text-contacts-count">
                        {data.contactSubmissions.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-newsletter-subs">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Newsletter Subscribers
                      </CardTitle>
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold" data-testid="text-newsletter-count">
                        {data.newsletterSubscriptions.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-conversion-rate">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Conversion Rate
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold" data-testid="text-conversion-rate">
                        {data.uniqueSessions > 0 
                          ? ((data.contactSubmissions / data.uniqueSessions) * 100).toFixed(1)
                          : "0"}%
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Contacts / Sessions
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card data-testid="card-top-pages">
                    <CardHeader>
                      <CardTitle>Top Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.topPages.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No page views recorded yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {data.topPages.map((page, index) => (
                            <div 
                              key={page.page} 
                              className="flex items-center justify-between"
                              data-testid={`row-top-page-${index}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-muted-foreground w-6">
                                  {index + 1}.
                                </span>
                                <span className="font-medium">{getPageLabel(page.page)}</span>
                              </div>
                              <Badge variant="secondary">{page.views} views</Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card data-testid="card-recent-events">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.recentEvents.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No activity recorded yet.</p>
                      ) : (
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {data.recentEvents.slice(0, 10).map((event, index) => (
                            <div 
                              key={event.id} 
                              className="flex items-center justify-between text-sm"
                              data-testid={`row-event-${index}`}
                            >
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {formatEventType(event.eventType)}
                                </Badge>
                                <span className="text-muted-foreground">
                                  {getPageLabel(event.page)}
                                </span>
                              </div>
                              {event.createdAt && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(event.createdAt).toLocaleTimeString()}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
