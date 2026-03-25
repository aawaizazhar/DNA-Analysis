import Navbar from "@/components/landing/Navbar";
import DnaBackground from "@/components/landing/DnaBackground";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import ProblemStatement from "@/components/landing/ProblemStatement";
import CoreFeatures from "@/components/landing/CoreFeatures";
import HowItWorks from "@/components/landing/HowItWorks";
import UserPersonas from "@/components/landing/UserPersonas";
import AuthSection from "@/components/landing/AuthSection";
import EthicsBanner from "@/components/landing/EthicsBanner";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen page-bg relative">
    <DnaBackground />
    <Navbar />
    <HeroSection />
    <TrustBar />
    <ProblemStatement />
    <CoreFeatures />
    <HowItWorks />
    <UserPersonas />
    <AuthSection />
    <EthicsBanner />
    <Footer />
  </div>
);

export default Index;
