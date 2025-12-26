import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HelpMeDecide } from "@/components/sections/HelpMeDecide";
import { HowWeThink } from "@/components/sections/HowWeThink";
import { Services } from "@/components/sections/Services";
import { UseCaseWalkthroughs } from "@/components/sections/UseCaseWalkthroughs";
import { VisualRoadmap } from "@/components/sections/VisualRoadmap";
import { PlannerCTA } from "@/components/sections/PlannerCTA";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { FounderNote } from "@/components/sections/FounderNote";
import { JourneyPreview } from "@/components/sections/JourneyPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { usePageView } from "@/hooks/use-analytics";

export default function Home() {
  usePageView("/");
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Header />
      <main>
        <Hero />
        <HelpMeDecide />
        <HowWeThink />
        <Services />
        <UseCaseWalkthroughs />
        <VisualRoadmap />
        <PlannerCTA />
        <PortfolioPreview />
        <FounderNote />
        <JourneyPreview />
        <BlogPreview />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
