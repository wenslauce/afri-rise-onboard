
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Tailored for African Businesses",
      description: "Financing solutions designed specifically for the unique challenges and opportunities in African markets."
    },
    {
      title: "Transparent Process",
      description: "Clear documentation requirements and straightforward application steps with regular status updates."
    },
    {
      title: "Competitive Rates",
      description: "Access to financing with favorable interest rates and flexible repayment terms to support your growth."
    },
    {
      title: "Dedicated Support",
      description: "A team of experts ready to assist you throughout the application and approval process."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-afririse-50/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose AfriRise for Your Business Financing?
            </motion.h2>
            
            <motion.div variants={staggerContainer} className="space-y-6">
              {features.map((feature, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-afririse-100 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-afririse-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-8">
              <Button asChild>
                <Link to="/application">
                  Apply Now <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-radial from-afririse-200/50 to-transparent rounded-2xl -translate-x-4 translate-y-4" />
            <div className="relative rounded-2xl overflow-hidden border shadow-lg bg-white">
              <img 
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Business financing" 
                className="w-full h-80 object-cover object-center"
              />
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-4">Supporting African Entrepreneurs</h3>
                <p className="text-muted-foreground mb-6">
                  Our financing solutions are designed to help African businesses overcome barriers to growth and reach their full potential.
                </p>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full bg-afririse-100 border-2 border-white flex items-center justify-center text-afririse-600 font-medium">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-muted-foreground">
                    Trusted by hundreds of businesses across Africa
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
