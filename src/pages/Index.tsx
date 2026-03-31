import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GrowthPlansSection from "@/components/GrowthPlansSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import ShopSection from "@/components/ShopSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GrowthPlansSection />
      <PricingSection />
      <PortfolioSection />
      <ShopSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
