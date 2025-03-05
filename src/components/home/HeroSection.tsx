
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface HeroSectionProps {
  scrollYProgress: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollYProgress }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  return (
    <motion.div 
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-afririse-50/30 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-block mb-6">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-afririse-100 text-afririse-800">
              <Sparkles size={14} />
              AfriRise Financial Solutions
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Streamlined Financing <br className="hidden md:block" />
            <span className="text-afririse-600">for African Growth</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Apply for business financing through our secure, transparent, and efficient onboarding process designed specifically for African businesses.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/application" className="group">
                Start Application
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </motion.div>
  );
};

export default HeroSection;
