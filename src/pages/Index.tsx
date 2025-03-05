
import React, { useEffect } from "react";
import { useScroll } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import SecuritySection from "@/components/home/SecuritySection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

const Index = () => {
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection scrollYProgress={scrollYProgress} />
      <ProcessSection />
      <FeaturesSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
