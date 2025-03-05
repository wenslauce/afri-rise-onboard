
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, FileText, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
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

const Index = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
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
      
      {/* Process Section */}
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
            {[
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
            ].map((item, index) => (
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
      
      {/* Features Section */}
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
                {[
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
                ].map((feature, index) => (
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
      
      {/* Security Section */}
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
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-afririse-50 flex items-center justify-center mb-6">
                  <Lock className="h-6 w-6 text-afririse-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Upload</h3>
                <p className="text-muted-foreground">
                  All documents are uploaded through secure, encrypted connections to protect your sensitive information.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-afririse-50 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-afririse-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Confidentiality</h3>
                <p className="text-muted-foreground">
                  Your information is only accessible to authorized personnel involved in the review process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-afririse-50 flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-afririse-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Digital NDA</h3>
                <p className="text-muted-foreground">
                  Our electronic NDA ensures your business plans and financial information remain protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-afririse-600 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Start your application today and take the first step toward securing the financing your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/application">
                  Start Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 md:py-16 bg-afririse-950 text-white/80">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                <span className="bg-afririse-500 text-white px-2 py-1 rounded-md">Afri</span>
                <span>Rise</span>
              </div>
              <p className="mb-6">
                Financial solutions tailored for African businesses, driving growth and development across the continent.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Business Loans</a></li>
                <li><a href="#" className="hover:text-white">Project Financing</a></li>
                <li><a href="#" className="hover:text-white">Trade Finance</a></li>
                <li><a href="#" className="hover:text-white">Asset Financing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Team</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; {new Date().getFullYear()} AfriRise. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
