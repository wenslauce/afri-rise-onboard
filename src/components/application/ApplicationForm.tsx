
import React, { useState } from 'react';
import { useFormContext } from '@/context/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import PersonalDetailsStep from './PersonalDetailsStep';
import CompanyInfoStep from './CompanyInfoStep';
import CompanyBackgroundStep from './CompanyBackgroundStep';
import FundingBackgroundStep from './FundingBackgroundStep';
import CompanyMarketsStep from './CompanyMarketsStep';
import FinalDetailsStep from './FinalDetailsStep';
import DocumentUploadStep from './DocumentUploadStep';
import ReviewStep from './ReviewStep';
import FormStepIndicator from './FormStepIndicator';

const ApplicationForm = () => {
  const { currentStep } = useFormContext();
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep />;
      case 2:
        return <CompanyInfoStep />;
      case 3:
        return <CompanyBackgroundStep />;
      case 4:
        return <FundingBackgroundStep />;
      case 5:
        return <CompanyMarketsStep />;
      case 6:
        return <FinalDetailsStep />;
      case 7:
        return <DocumentUploadStep />;
      case 8:
        return <ReviewStep />;
      default:
        return <PersonalDetailsStep />;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <FormStepIndicator />
      
      <Card className="mt-8">
        <CardContent className="pt-6">
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
