
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { ApplicationProgress } from "@/components/dashboard/client/ApplicationProgress";
import { DocumentsList } from "@/components/dashboard/client/DocumentsList";
import { MessageDisplay } from "@/components/dashboard/client/MessageDisplay";
import { NdaStatus } from "@/components/dashboard/client/NdaStatus";
import ErrorBoundary from "@/components/ErrorBoundary";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Dashboard = () => {
  const [applicationProgress] = useState(40);
  const [documents] = useState([
    { name: "Business Plan", status: "approved", date: "2023-08-15" },
    { name: "Financial Statements", status: "pending", date: "2023-08-14" },
    { name: "Certificate of Incorporation", status: "approved", date: "2023-08-12" },
    { name: "Tax Compliance Certificate", status: "rejected", date: "2023-08-10" }
  ]);
  
  const handleUploadNewDocument = () => {
    console.log("Uploading new document");
    // Implementation for uploading new document
  };

  const handleSendMessage = () => {
    console.log("Sending message");
    // Implementation for sending message
  };

  const handleDownloadNda = () => {
    console.log("Downloading NDA");
    // Implementation for downloading NDA
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container py-8 md:py-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid gap-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Track your application progress and manage your documents
                </p>
              </div>
              <Button asChild>
                <Link to="/application">Continue Application</Link>
              </Button>
            </div>
            
            <ApplicationProgress progress={applicationProgress} />
            
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="w-full md:w-auto grid grid-cols-3">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="nda">NDA</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents" className="mt-6">
                <DocumentsList 
                  documents={documents}
                  onUploadNew={handleUploadNewDocument}
                />
              </TabsContent>
              
              <TabsContent value="messages" className="mt-6">
                <MessageDisplay onSendMessage={handleSendMessage} />
              </TabsContent>
              
              <TabsContent value="nda" className="mt-6">
                <NdaStatus 
                  signedDate="August 10, 2023"
                  onDownload={handleDownloadNda}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
