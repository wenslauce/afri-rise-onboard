
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Download } from "lucide-react";

interface NdaStatusProps {
  signedDate: string;
  onDownload: () => void;
}

export const NdaStatus: React.FC<NdaStatusProps> = ({
  signedDate,
  onDownload,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Non-Disclosure Agreement</CardTitle>
        <CardDescription>Your signed agreement with Afri-Rise</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 border rounded-lg border-dashed flex flex-col items-center justify-center text-center">
          <FileCheck className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-medium mb-2">NDA Successfully Signed</h3>
          <p className="text-muted-foreground mb-4">Your NDA was signed on {signedDate}</p>
          <Button variant="outline" onClick={onDownload}>
            <Download className="mr-2 h-4 w-4" /> Download Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
