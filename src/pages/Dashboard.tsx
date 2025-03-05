
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { FileCheck, MessageSquare, FileText, Download, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
  
  const statusClass = (status: string) => {
    switch(status) {
      case "approved": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "rejected": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default: return "text-amber-600 bg-amber-100 dark:bg-amber-900/20";
    }
  };

  return (
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
          
          <Card>
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
              <CardDescription>Your application is currently under review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{applicationProgress}%</span>
                </div>
                <Progress value={applicationProgress} className="h-2" />
                
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
          
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-3">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="nda">NDA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-6">
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
                    
                    <Button className="w-full">Upload New Document</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communication with the Afri-Rise team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          AR
                        </div>
                        <div>
                          <h3 className="font-medium">Afri-Rise Team</h3>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        Thank you for submitting your application. We've reviewed your initial documents 
                        and need you to resubmit your Tax Compliance Certificate as the one provided 
                        has expired. Please upload the current document at your earliest convenience.
                      </p>
                    </div>
                    
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nda" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Non-Disclosure Agreement</CardTitle>
                  <CardDescription>Your signed agreement with Afri-Rise</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 border rounded-lg border-dashed flex flex-col items-center justify-center text-center">
                    <FileCheck className="h-12 w-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-medium mb-2">NDA Successfully Signed</h3>
                    <p className="text-muted-foreground mb-4">Your NDA was signed on August 10, 2023</p>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Download Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
