
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import PersonalDetailsStep from './PersonalDetailsStep';
import CompanyInfoStep from './CompanyInfoStep';
import FormStepIndicator from './FormStepIndicator';

const ApplicationForm = () => {
  const { currentStep } = useFormContext();
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep />;
      case 2:
        return <CompanyInfoStep />;
      // We'll implement the remaining steps later
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
