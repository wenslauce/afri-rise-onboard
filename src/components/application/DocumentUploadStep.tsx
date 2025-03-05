
import React, { useState } from 'react';
import { useFormContext } from '@/context/FormContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Check, AlertCircle, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const requiredDocuments = [
  {
    id: 'projectSummary',
    name: 'Project Summary',
    description: 'A complete overview of the project',
  },
  {
    id: 'auditedAccounts',
    name: 'Audited Accounts',
    description: 'Most recent audited financial statements',
  },
  {
    id: 'managementAccounts',
    name: '2 Year Management Accounts',
    description: 'Last 2 years of management financial reports',
  },
  {
    id: 'cashFlowProjection',
    name: '5 Year Cash Flow Projection',
    description: 'Forecasted cash flow for the next 5 years',
  },
  {
    id: 'certificateOfIncorporation',
    name: 'Certificate of Incorporation',
    description: 'Legal document confirming company registration',
  },
  {
    id: 'pinCertificate',
    name: 'PIN Certificate',
    description: 'Official tax identification document',
  },
  {
    id: 'cr12',
    name: 'CR12',
    description: 'Current list of company directors and shareholders',
  },
  {
    id: 'taxCompliance',
    name: 'Tax Compliance',
    description: 'Proof of tax compliance from revenue authority',
  },
  {
    id: 'operatingLicenses',
    name: 'Operating Licenses',
    description: 'Industry-specific permits and licenses',
  },
  {
    id: 'directorId',
    name: 'Director ID',
    description: 'Identity documents for all directors',
  },
  {
    id: 'directorPin',
    name: 'Director PIN',
    description: 'Personal tax identification for all directors',
  },
];

const DocumentUploadStep = () => {
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(prev => ({ ...prev, [documentId]: true }));
      
      // Simulate upload process
      setTimeout(() => {
        // Update context with the file
        updateFormData({
          documents: {
            ...formData.documents,
            [documentId]: file
          }
        });
        
        setUploading(prev => ({ ...prev, [documentId]: false }));
        
        toast({
          title: "Document uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      }, 1500);
    }
  };
  
  const countUploadedDocuments = () => {
    return Object.values(formData.documents).filter(Boolean).length;
  };
  
  const isDocumentUploaded = (documentId: string) => {
    return Boolean(formData.documents[documentId as keyof typeof formData.documents]);
  };
  
  const handleSubmit = () => {
    if (countUploadedDocuments() < requiredDocuments.length) {
      toast({
        variant: "destructive",
        title: "Missing documents",
        description: "Please upload all required documents before proceeding.",
      });
      return;
    }
    
    nextStep();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Document Upload</h2>
        <p className="text-muted-foreground">
          Please upload all required documents to support your application
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requiredDocuments.map((doc) => (
          <Card key={doc.id} className={cn(
            "border transition-all",
            isDocumentUploaded(doc.id) ? "border-green-200 bg-green-50" : ""
          )}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className={cn(
                "mt-1 size-10 flex-shrink-0 rounded-full flex items-center justify-center",
                isDocumentUploaded(doc.id) 
                  ? "bg-green-100 text-green-700" 
                  : "bg-muted text-muted-foreground"
              )}>
                {isDocumentUploaded(doc.id) ? (
                  <Check className="size-5" />
                ) : (
                  <File className="size-5" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-sm">{doc.name}</h3>
                  {isDocumentUploaded(doc.id) && (
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      Uploaded
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 mb-3">{doc.description}</p>
                
                <div>
                  <Button
                    type="button"
                    variant={isDocumentUploaded(doc.id) ? "outline" : "default"}
                    size="sm"
                    className="w-full relative"
                    disabled={uploading[doc.id]}
                  >
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, doc.id)}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {uploading[doc.id] ? (
                      <span>Uploading...</span>
                    ) : isDocumentUploaded(doc.id) ? (
                      <span>Replace file</span>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Upload file</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted p-4 rounded-lg mt-6">
        <div className="flex items-center gap-2 text-sm mb-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <span className="font-medium">Important Note</span>
        </div>
        <p className="text-sm text-muted-foreground">
          All documents should be clear, complete, and in PDF format where possible. 
          Ensure that all information is up-to-date and accurate to avoid delays in processing your application.
        </p>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">
            Documents uploaded: {countUploadedDocuments()} of {requiredDocuments.length}
          </span>
          
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            countUploadedDocuments() === requiredDocuments.length
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          )}>
            {countUploadedDocuments() === requiredDocuments.length
              ? "All documents uploaded"
              : "Missing documents"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button
            type="button" 
            onClick={handleSubmit}
            disabled={countUploadedDocuments() < requiredDocuments.length}
          >
            Review & Finalize
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentUploadStep;

// Helper function
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
