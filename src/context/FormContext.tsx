
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FormData = {
  // Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Company Information
  companyName: string;
  companyNumber: string;
  officialAddress: string;
  contactPerson: string;
  contactEmail: string;
  
  // Company Background
  foundedYear: string;
  officeLocations: string;
  industry: string;
  employeeCount: string;
  
  // Funding Background
  hasForeignPresence: string;
  hasPreviousFinancing: string;
  
  // Company Markets
  businessModel: string;
  competitiveAdvantage: string;
  competitors: string;
  
  // Final Details
  isShovelReady: string;
  financingAmount: string;
  interestRate: string;
  loanTerm: string;
  loanDate: Date | null;
  
  // Documents
  documents: {
    projectSummary: File | null;
    auditedAccounts: File | null;
    managementAccounts: File | null;
    cashFlowProjection: File | null;
    certificateOfIncorporation: File | null;
    pinCertificate: File | null;
    cr12: File | null;
    taxCompliance: File | null;
    operatingLicenses: File | null;
    directorId: File | null;
    directorPin: File | null;
  };
};

interface FormContextType {
  formData: FormData;
  currentStep: number;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  // Personal Details
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  
  // Company Information
  companyName: '',
  companyNumber: '',
  officialAddress: '',
  contactPerson: '',
  contactEmail: '',
  
  // Company Background
  foundedYear: '',
  officeLocations: '',
  industry: '',
  employeeCount: '',
  
  // Funding Background
  hasForeignPresence: '',
  hasPreviousFinancing: '',
  
  // Company Markets
  businessModel: '',
  competitiveAdvantage: '',
  competitors: '',
  
  // Final Details
  isShovelReady: '',
  financingAmount: '',
  interestRate: '',
  loanTerm: '',
  loanDate: null,
  
  // Documents
  documents: {
    projectSummary: null,
    auditedAccounts: null,
    managementAccounts: null,
    cashFlowProjection: null,
    certificateOfIncorporation: null,
    pinCertificate: null,
    cr12: null,
    taxCompliance: null,
    operatingLicenses: null,
    directorId: null,
    directorPin: null,
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
