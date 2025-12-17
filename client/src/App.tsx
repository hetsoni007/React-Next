import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function Router() {
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
