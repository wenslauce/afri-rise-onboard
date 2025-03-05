
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from "lucide-react";
import { ApplicationProgress, steps } from "./ApplicationProgress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DocumentUpload } from "./DocumentUpload";
import {
  personalDetailsSchema,
  PersonalDetailsForm,
  companyInfoSchema,
  CompanyInfoForm,
  companyBackgroundSchema,
  CompanyBackgroundForm,
  fundingBackgroundSchema,
  FundingBackgroundForm,
  companyMarketsSchema,
  CompanyMarketsForm,
  finalSchema,
  FinalForm,
} from "./FormSteps";

// Combine all schemas
const formSchema = z.object({
  ...personalDetailsSchema.shape,
  ...companyInfoSchema.shape,
  ...companyBackgroundSchema.shape,
  ...fundingBackgroundSchema.shape,
  ...companyMarketsSchema.shape,
  ...finalSchema.shape,
});

type FormValues = z.infer<typeof formSchema>;

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Document types for upload
  const documentTypes = [
    {
      id: "project-summary",
      name: "Project Summary",
      description: "A complete overview of the project",
      required: true,
    },
    {
      id: "audited-accounts",
      name: "Audited Accounts",
      required: true,
    },
    {
      id: "management-accounts",
      name: "2 Year Management Accounts",
      required: true,
    },
    {
      id: "cash-flow",
      name: "5 Year Cash Flow Projection",
      required: true,
    },
    {
      id: "company-docs",
      name: "Company Documents",
      description: "Certificate of Incorporation, PIN Certificate, CR12, Tax Compliance, Operating Licenses",
      required: true,
    },
    {
      id: "director-docs",
      name: "Directors Documents",
      description: "ID and PIN for all directors",
      required: true,
    },
  ];

  // Default values with empty strings for all fields
  const defaultValues: Partial<FormValues> = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    registrationNumber: "",
    officialAddress: "",
    contactPerson: "",
    contactEmail: "",
    foundingYear: "",
    officeLocations: "",
    industry: "",
    employees: "",
    foreignMarkets: "no",
    previousFinancing: "no",
    businessModel: "",
    competitiveAdvantage: "",
    competitors: "",
    shovelReady: "no",
    financingAmount: "",
    interestRate: "",
    loanTerm: "",
    date: undefined,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  // Determine which schema to use based on the current step
  const getSchemaForCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return personalDetailsSchema;
      case 2:
        return companyInfoSchema;
      case 3:
        return companyBackgroundSchema;
      case 4:
        return fundingBackgroundSchema;
      case 5:
        return companyMarketsSchema;
      case 6:
        return finalSchema;
      default:
        return personalDetailsSchema;
    }
  };

  const handleNext = async () => {
    // Validate only the fields for the current step
    const currentSchema = getSchemaForCurrentStep();
    const currentStepData = form.getValues();
    
    try {
      // Validate the current step data against the current schema
      await currentSchema.parseAsync(currentStepData);
      
      // Mark the step as completed
      setCompletedSteps({ ...completedSteps, [currentStep]: true });
      
      // Auto-save the form data
      const formData = form.getValues();
      localStorage.setItem("application-form-data", JSON.stringify(formData));
      
      // If not the last step, move to the next step
      if (currentStep < steps.length) {
        // Add animation for moving to the next step
        setCurrentStep(currentStep + 1);
        toast({
          title: "Progress saved",
          description: "Your progress has been saved automatically.",
        });
      }
    } catch (error) {
      console.error("Validation error:", error);
      form.trigger();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDocumentUploadComplete = (uploadedFiles: Record<string, File[]>) => {
    console.log("Uploaded files:", uploadedFiles);
    toast({
      title: "Documents uploaded",
      description: "All required documents have been uploaded successfully.",
    });
    
    // Mark the current step as completed
    setCompletedSteps({ ...completedSteps, [currentStep]: true });
    
    // Move to the next step if not on the last step
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      console.log("Form submission data:", data);
      
      // Simulate delay for submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success state
      setIsComplete(true);
      localStorage.removeItem("application-form-data");
      
      toast({
        title: "Application submitted successfully",
        description: "We will review your application and contact you soon.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load saved form data from localStorage on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem("application-form-data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Convert the date string back to a Date object if it exists
        if (parsedData.date) {
          parsedData.date = new Date(parsedData.date);
        }
        form.reset(parsedData);
        
        // Determine which steps have been completed
        const completed: Record<number, boolean> = {};
        
        // Check personal details step
        const personalDetailsValid = personalDetailsSchema.safeParse({
          firstName: parsedData.firstName,
          lastName: parsedData.lastName,
          email: parsedData.email,
          phone: parsedData.phone,
        }).success;
        if (personalDetailsValid) completed[1] = true;
        
        // Check company info step
        const companyInfoValid = companyInfoSchema.safeParse({
          companyName: parsedData.companyName,
          registrationNumber: parsedData.registrationNumber,
          officialAddress: parsedData.officialAddress,
          contactPerson: parsedData.contactPerson,
          contactEmail: parsedData.contactEmail,
        }).success;
        if (companyInfoValid) completed[2] = true;
        
        // Set completed steps
        setCompletedSteps(completed);
        
        toast({
          title: "Progress restored",
          description: "Your previous application progress has been loaded.",
        });
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, [form]);

  // Animation variants for slide transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  if (isComplete) {
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-sm border">
        <div className="text-center py-12">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">Application Submitted!</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Thank you for submitting your application. Our team will review it and contact you soon.
          </p>
          <div className="p-4 bg-muted rounded-lg text-left max-w-md mx-auto mb-8">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              <li>Our team will review your application</li>
              <li>You'll receive an email confirmation</li>
              <li>We may request additional documents if needed</li>
              <li>A decision will be made within 14 business days</li>
            </ol>
          </div>
          <Button asChild>
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-sm border">
      <ApplicationProgress 
        currentStep={currentStep} 
        completedSteps={completedSteps} 
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
          <AnimatePresence mode="wait" initial={false} custom={currentStep}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {currentStep === 1 && <PersonalDetailsForm form={form} />}
              {currentStep === 2 && <CompanyInfoForm form={form} />}
              {currentStep === 3 && <CompanyBackgroundForm form={form} />}
              {currentStep === 4 && <FundingBackgroundForm form={form} />}
              {currentStep === 5 && <CompanyMarketsForm form={form} />}
              {currentStep === 6 && <FinalForm form={form} />}
              {currentStep === 7 && (
                <DocumentUpload
                  documentTypes={documentTypes}
                  onComplete={handleDocumentUploadComplete}
                />
              )}
            </motion.div>
          </AnimatePresence>
          
          <div className={cn("flex justify-between pt-4 border-t", currentStep === 7 && "mt-12")}>
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Save progress
                const formData = form.getValues();
                localStorage.setItem("application-form-data", JSON.stringify(formData));
                
                toast({
                  title: "Progress saved",
                  description: "Your progress has been saved. You can return to complete your application later.",
                });
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Progress
            </Button>
            
            {currentStep < steps.length ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting || currentStep !== steps.length || Object.keys(completedSteps).length !== steps.length} 
                className={cn(
                  "relative overflow-hidden transition-all",
                  isSubmitting && "bg-afririse-600"
                )}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
                {isSubmitting && (
                  <span className="absolute bottom-0 left-0 h-1 bg-afririse-300 animate-pulse" style={{ width: "100%" }}></span>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
