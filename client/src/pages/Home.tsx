import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { JourneyPreview } from "@/components/sections/JourneyPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { EntrancePopup } from "@/components/Popups";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Header />
      <main>
        <Hero />
        <Services />
        <PortfolioPreview />
        <JourneyPreview />
        <BlogPreview />
        <ContactCTA />
      </main>
      <Footer />
      <EntrancePopup />
    </div>
  );
}
