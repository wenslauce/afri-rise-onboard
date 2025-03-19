
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface Document {
  name: string;
  status: string;
  date: string;
}

interface DocumentsListProps {
  documents: Document[];
  onUploadNew: () => void;
}

export const DocumentsList: React.FC<DocumentsListProps> = ({
  documents,
  onUploadNew,
}) => {
  const statusClass = (status: string) => {
    switch(status) {
      case "approved": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "rejected": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default: return "text-amber-600 bg-amber-100 dark:bg-amber-900/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Documents</CardTitle>
        <CardDescription>Manage your application documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">Uploaded on {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${statusClass(doc.status)}`}>
                  {doc.status}
                </span>
                <Button variant="ghost" size="icon" title="Download">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button className="w-full" onClick={onUploadNew}>Upload New Document</Button>
        </div>
      </CardContent>
    </Card>
  );
};
