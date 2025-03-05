
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  User, 
  Building2, 
  Info, 
  Globe, 
  ShoppingBag, 
  FilePlus,
  Upload,
  CheckCircle2
} from 'lucide-react';

const steps = [
  { label: 'Personal Details', icon: User },
  { label: 'Company Information', icon: Building2 },
  { label: 'Company Background', icon: Info },
  { label: 'Funding Background', icon: Globe },
  { label: 'Company Markets', icon: ShoppingBag },
  { label: 'Final Details', icon: FilePlus },
  { label: 'Documents', icon: Upload },
  { label: 'Review', icon: CheckCircle2 },
];

const FormStepIndicator = () => {
  const { currentStep, goToStep } = useFormContext();
  
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const StepIcon = step.icon;
          
          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute w-full h-[2px] top-4 left-1/2 bg-muted">
                  <motion.div 
                    className="h-full bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
              
              {/* Step indicator */}
              <button
                onClick={() => isCompleted && goToStep(stepNumber)}
                disabled={!isCompleted && !isActive}
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center mb-2 transition-colors z-10",
                  isActive ? "bg-primary text-primary-foreground" : 
                  isCompleted ? "bg-primary/20 text-primary cursor-pointer" : 
                  "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <StepIcon className="h-4 w-4" />
                )}
              </button>
              
              {/* Step label */}
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary" : 
                isCompleted ? "text-primary" : 
                "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Mobile view */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
            "bg-primary text-primary-foreground"
          )}>
            {React.createElement(steps[currentStep - 1].icon, { className: "h-4 w-4" })}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
            <h3 className="font-medium">{steps[currentStep - 1].label}</h3>
          </div>
        </div>
        
        <div className="text-sm font-medium text-primary">
          {Math.round((currentStep / steps.length) * 100)}% Complete
        </div>
      </div>
      
      {/* Progress bar (mobile only) */}
      <div className="md:hidden w-full h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default FormStepIndicator;
