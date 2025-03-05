
import React from "react";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, CheckCircle2 } from "lucide-react";

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

const ProcessSection: React.FC = () => {
  const processSteps = [
    {
      icon: <FileText className="h-10 w-10 text-afririse-600" />,
      title: "Complete Application",
      description: "Fill out our comprehensive application with details about your business and financing needs."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-afririse-600" />,
      title: "Document Verification",
      description: "Upload required documents securely. Our team verifies your information promptly."
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-afririse-600" />,
      title: "Receive Financing",
      description: "After approval, receive your financing with favorable terms tailored to your business."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background" id="process">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Simple Application Process
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
            Our streamlined onboarding process is designed to be transparent, secure, and efficient.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {processSteps.map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="rounded-full bg-afririse-50 w-16 h-16 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
