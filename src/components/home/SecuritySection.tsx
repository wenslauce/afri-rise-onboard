
import React from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Secure Upload",
      description: "All documents are uploaded through secure, encrypted connections to protect your sensitive information."
    },
    {
      icon: ShieldCheck,
      title: "Confidentiality",
      description: "Your information is only accessible to authorized personnel involved in the review process."
    },
    {
      icon: FileText,
      title: "Digital NDA",
      description: "Our electronic NDA ensures your business plans and financial information remain protected."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Secure and Confidential
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
            Your data and documents are protected with enterprise-grade security measures.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-afririse-50 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-afririse-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
