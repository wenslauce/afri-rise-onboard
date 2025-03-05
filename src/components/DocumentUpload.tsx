
import React, { useState } from "react";
import { Upload, X, File, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface DocumentType {
  id: string;
  name: string;
  description?: string;
  required: boolean;
}

interface DocumentUploadProps {
  documentTypes: DocumentType[];
  onComplete: (uploadedFiles: Record<string, File[]>) => void;
}

export function DocumentUpload({ documentTypes, onComplete }: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadStatus, setUploadStatus] = useState<Record<string, "idle" | "uploading" | "success" | "error">>({});

  // Initialize the state with empty arrays for each document type
  React.useEffect(() => {
    const initialState: Record<string, File[]> = {};
    documentTypes.forEach(type => {
      initialState[type.id] = [];
    });
    setUploadedFiles(initialState);
  }, [documentTypes]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    const files = event.target.files;
    if (!files?.length) return;

    // Simulate upload process
    setUploadStatus(prev => ({ ...prev, [documentId]: "uploading" }));
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));

    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
          progress = 100;
          clearInterval(interval);
          
          // Add files to state after "upload" completes
          const newFiles = Array.from(files);
          setUploadedFiles(prev => ({
            ...prev,
            [documentId]: [...prev[documentId], ...newFiles]
          }));
          setUploadStatus(prev => ({ ...prev, [documentId]: "success" }));
          
          toast({
            title: "Upload complete",
            description: `Successfully uploaded ${newFiles.length} file(s)`,
          });
          
          // Check if all required docs are uploaded
          checkAllUploaded();
        }
        setUploadProgress(prev => ({ ...prev, [documentId]: progress }));
      }, 200);
    };

    simulateUpload();
  };

  const removeFile = (documentId: string, fileIndex: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentId]: prev[documentId].filter((_, index) => index !== fileIndex)
    }));
    
    // Reset status if no files remain
    if (uploadedFiles[documentId].length === 1) {
      setUploadStatus(prev => ({ ...prev, [documentId]: "idle" }));
      setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    }
    
    toast({
      variant: "destructive",
      title: "File removed",
      description: "Document has been removed from the upload list",
    });
  };

  const checkAllUploaded = () => {
    const allRequiredUploaded = documentTypes
      .filter(type => type.required)
      .every(type => uploadedFiles[type.id]?.length > 0);
    
    if (allRequiredUploaded) {
      onComplete(uploadedFiles);
    }
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Document Upload</h2>
        <p className="text-muted-foreground">
          Please upload all required documentation to proceed with your application.
        </p>
      </div>
      
      <div className="grid gap-6">
        {documentTypes.map((document) => (
          <div 
            key={document.id}
            className={cn(
              "p-5 rounded-lg border transition-all duration-200",
              uploadStatus[document.id] === "success" 
                ? "border-green-200 bg-green-50" 
                : document.required 
                  ? "border-amber-200 bg-amber-50/30" 
                  : "border-gray-200"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-medium flex items-center">
                  {document.name}
                  {document.required && (
                    <span className="text-xs font-medium ml-2 py-0.5 px-2 rounded-full bg-amber-100 text-amber-800">
                      Required
                    </span>
                  )}
                  {uploadStatus[document.id] === "success" && (
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                  )}
                </h3>
                {document.description && (
                  <p className="text-sm text-muted-foreground mt-1">{document.description}</p>
                )}
              </div>
              
              <div>
                <label htmlFor={`file-upload-${document.id}`}>
                  <Button
                    type="button"
                    variant={uploadStatus[document.id] === "success" ? "outline" : "default"}
                    size="sm"
                    className={cn(
                      "cursor-pointer",
                      uploadStatus[document.id] === "success" && "border-green-200 text-green-700 hover:bg-green-50"
                    )}
                    asChild
                  >
                    <div>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadStatus[document.id] === "success" 
                        ? "Add More Files" 
                        : "Upload Files"}
                    </div>
                  </Button>
                </label>
                <input
                  id={`file-upload-${document.id}`}
                  type="file"
                  onChange={(e) => handleFileChange(e, document.id)}
                  className="hidden"
                  multiple
                />
              </div>
            </div>
            
            {/* Progress bar */}
            {uploadStatus[document.id] === "uploading" && (
              <div className="mt-4 mb-2">
                <Progress value={uploadProgress[document.id]} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {Math.round(uploadProgress[document.id])}%
                </p>
              </div>
            )}
            
            {/* File list */}
            {uploadedFiles[document.id]?.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Uploaded files:</p>
                <div className="space-y-2">
                  {uploadedFiles[document.id].map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-2 rounded bg-white border"
                    >
                      <div className="flex items-center">
                        <File className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(document.id, index)}
                        className="h-8 w-8 p-0 text-muted-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-muted p-4 rounded-lg mt-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Important</h4>
            <p className="text-sm text-muted-foreground mt-1">
              All documents will be kept confidential and only accessed by authorized personnel. 
              Please ensure all files are legible and complete before submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
