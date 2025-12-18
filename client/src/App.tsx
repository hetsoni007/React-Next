import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalPopups } from "@/components/Popups";
import { initializeGA, trackPageView } from "@/lib/analytics";
import Home from "@/pages/Home";
import ServicesPage from "@/pages/ServicesPage";
import PortfolioPage from "@/pages/PortfolioPage";
import PortfolioDetail from "@/pages/PortfolioDetail";
import JourneyPage from "@/pages/JourneyPage";
import BlogPage from "@/pages/BlogPage";
import BlogDetail from "@/pages/BlogDetail";
import ContactPage from "@/pages/ContactPage";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import NotFound from "@/pages/not-found";

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home - Soni Consultancy Services',
  '/services': 'Services - Custom Software Development',
  '/portfolio': 'Portfolio - Our Work',
  '/journey': 'Our Journey - Company Story',
  '/blog': 'Blog - Insights & Articles',
  '/contact': 'Contact Us - Get in Touch',
};

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location] || document.title;
    trackPageView(location, title);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/portfolio/:id" component={PortfolioDetail} />
      <Route path="/journey" component={JourneyPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin/analytics" component={AnalyticsDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <GlobalPopups />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
