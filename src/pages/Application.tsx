
import React from "react";
import { Navbar } from "@/components/Navbar";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Separator } from "@/components/ui/separator";

const Application = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container pt-32 pb-20">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Financing Application
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete the form below to apply for financing. Your information will be kept
            confidential and reviewed by our team.
          </p>
        </div>
        
        <Separator className="mb-10 max-w-3xl mx-auto" />
        
        <ApplicationForm />
      </div>
    </div>
  );
};

export default Application;
