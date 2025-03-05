import React, { useState } from 'react';
import { useFormContext } from '@/context/FormContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ReviewStep = () => {
  const { formData, prevStep } = useFormContext();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application submitted successfully",
        description: "Your application has been received and is under review.",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  const sections = [
    {
      title: "Personal Details",
      items: [
        { label: "Name", value: `${formData.firstName} ${formData.lastName}` },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
      ],
    },
    {
      title: "Company Information",
      items: [
        { label: "Company Name", value: formData.companyName },
        { label: "Company Number", value: formData.companyNumber },
        { label: "Official Address", value: formData.officialAddress },
        { label: "Contact Person", value: formData.contactPerson },
        { label: "Contact Email", value: formData.contactEmail },
      ],
    },
    {
      title: "Company Background",
      items: [
        { label: "Founded Year", value: formData.foundedYear },
        { label: "Office Locations", value: formData.officeLocations },
        { label: "Industry", value: formData.industry },
        { label: "Number of Employees", value: formData.employeeCount },
      ],
    },
    {
      title: "Funding Background",
      items: [
        { label: "Present in Foreign Markets", value: formData.hasForeignPresence === 'yes' ? 'Yes' : 'No' },
        { label: "Previous Financing", value: formData.hasPreviousFinancing === 'yes' ? 'Yes' : 'No' },
      ],
    },
    {
      title: "Company Markets",
      items: [
        { label: "Business Model", value: formData.businessModel },
        { label: "Competitive Advantage", value: formData.competitiveAdvantage },
        { label: "Competitors", value: formData.competitors },
      ],
    },
    {
      title: "Financing Details",
      items: [
        { label: "Shovel Ready", value: formData.isShovelReady === 'yes' ? 'Yes' : 'No' },
        { label: "Financing Amount", value: `$${formData.financingAmount}` },
        { label: "Requested Interest Rate", value: `${formData.interestRate}%` },
        { label: "Loan Term", value: `${formData.loanTerm} months` },
        { label: "Date", value: formData.loanDate ? new Date(formData.loanDate).toLocaleDateString() : 'Not specified' },
      ],
    },
  ];
  
  const countUploadedDocuments = () => {
    return Object.values(formData.documents).filter(Boolean).length;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Review Your Application</h2>
        <p className="text-muted-foreground">
          Please review all the information below before submitting your application
        </p>
      </div>
      
      <div className="space-y-6">
        {sections.map((section, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <h3 className="font-medium text-base mb-3">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item, j) => (
                  <div key={j} className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-muted-foreground">{item.label}:</span>
                    <span className="text-sm font-medium break-words">{item.value || 'Not provided'}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-base mb-3">Documents</h3>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 text-green-700 rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm">
                {countUploadedDocuments()} document{countUploadedDocuments() !== 1 ? 's' : ''} uploaded
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-muted border-dashed">
        <CardContent className="p-4">
          <div className="flex items-start md:items-center md:flex-row flex-col gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium">Application Fee Payment</h3>
              <p className="text-sm text-muted-foreground mt-1">
                A non-refundable application fee of $300 USD is required to process your application.
              </p>
            </div>
            
            <Button className="shrink-0" onClick={() => toast({
              title: "Payment Integration",
              description: "In a real application, this would open the payment gateway.",
            })}>
              Pay Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="border-t pt-6 mt-6">
        <div className="grid gap-2 mb-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" className="rounded" />
            <label htmlFor="terms" className="text-sm">
              I confirm that all information provided is accurate and complete.
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="privacy" className="rounded" />
            <label htmlFor="privacy" className="text-sm">
              I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </label>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          
          <Button
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
