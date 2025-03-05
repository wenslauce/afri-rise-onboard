
import React from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

export const steps = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Company Information" },
  { id: 3, name: "Company Background" },
  { id: 4, name: "Funding Background" },
  { id: 5, name: "Company Markets" },
  { id: 6, name: "Final Details" },
];

interface ApplicationProgressProps {
  currentStep: number;
  completedSteps: Record<number, boolean>;
}

export function ApplicationProgress({ currentStep, completedSteps }: ApplicationProgressProps) {
  return (
    <div className="max-w-full">
      {/* Mobile stepper (visible on small screens) */}
      <div className="md:hidden flex items-center justify-between mb-8">
        <div className="flex-1 flex items-center">
          <span className="bg-afririse-500 text-white font-medium h-8 w-8 rounded-full flex items-center justify-center text-sm">
            {currentStep}
          </span>
          <span className="ml-3 font-medium">{steps[currentStep - 1].name}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>
      </div>

      {/* Desktop stepper (hidden on small screens) */}
      <nav aria-label="Progress" className="hidden md:block">
        <ol className="relative flex w-full overflow-hidden rounded-full bg-muted transition-all">
          {steps.map((step, stepIdx) => (
            <li 
              key={step.name}
              className={cn(
                "relative flex-1 transition-all",
                step.id <= currentStep ? "before:bg-afririse-500" : "before:bg-muted-foreground/30",
                "before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:-translate-y-1/2",
                stepIdx === 0 && "before:hidden"
              )}
            >
              <div className="group flex items-center justify-center relative z-10">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300",
                    step.id < currentStep && completedSteps[step.id]
                      ? "bg-afririse-500 text-white"
                      : step.id === currentStep
                      ? "bg-afririse-600 text-white"
                      : "bg-muted-foreground/30 text-muted-foreground",
                    "text-sm font-medium"
                  )}
                >
                  {step.id < currentStep && completedSteps[step.id] ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    step.id
                  )}
                </span>
                <span className="absolute -bottom-7 text-xs font-medium hidden md:block whitespace-nowrap">
                  {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
      
      <div className="mt-12 mb-4 bg-secondary/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-afririse-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm">
              <span className="font-medium">Your progress is saved automatically.</span> You can return to complete your application at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
