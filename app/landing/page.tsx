import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorks from '@/components/landing/HowItWorks';
import MarketPreview from '@/components/landing/MarketPreview';  
import TrustBadges from '@/components/landing/TrustBadges';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <MarketPreview />
      <TrustBadges />
      <Footer />
    </div>
  );
}