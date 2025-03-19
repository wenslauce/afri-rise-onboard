
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileCheck, FileText, Upload, CheckCircle } from "lucide-react";

interface ApplicationProgressProps {
  progress: number;
}

export const ApplicationProgress: React.FC<ApplicationProgressProps> = ({
  progress,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Progress</CardTitle>
        <CardDescription>Your application is currently under review</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { title: "Personal Details", status: "complete", icon: <FileCheck className="h-5 w-5" /> },
              { title: "Company Info", status: "complete", icon: <FileText className="h-5 w-5" /> },
              { title: "Documents", status: "in-progress", icon: <Upload className="h-5 w-5" /> },
              { title: "Final Review", status: "pending", icon: <CheckCircle className="h-5 w-5" /> }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-muted/50 rounded-lg text-center">
                <div className={`mb-2 p-2 rounded-full ${
                  step.status === 'complete' ? 'bg-green-100 text-green-600' : 
                  step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-sm font-medium">{step.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{step.status.replace('-', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
