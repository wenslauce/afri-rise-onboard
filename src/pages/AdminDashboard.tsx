
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserPlus, UserCheck } from "lucide-react";
import { ApplicationsTable } from "@/components/dashboard/admin/ApplicationsTable";
import { ReviewersManagement } from "@/components/dashboard/admin/ReviewersManagement";
import { StatusCards } from "@/components/dashboard/admin/StatusCards";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageThread } from "@/components/messaging/MessageThread";
import { Conversation, Message, UserRole } from "@/types/messaging";
import ErrorBoundary from "@/components/ErrorBoundary";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Sample data
const applications = [
  {
    id: "APP-001",
    name: "Accra Textiles Ltd",
    status: "pending",
    stage: "document review",
    date: "2023-08-15",
    amount: "$120,000",
    avatar: "AT"
  },
  {
    id: "APP-002",
    name: "Lagos Tech Solutions",
    status: "approved",
    stage: "final review",
    date: "2023-08-14",
    amount: "$250,000",
    avatar: "LT"
  },
  {
    id: "APP-003",
    name: "Nairobi Agritech",
    status: "rejected",
    stage: "initial screening",
    date: "2023-08-10",
    amount: "$85,000",
    avatar: "NA"
  },
  {
    id: "APP-004",
    name: "Cape Town Renewables",
    status: "in-progress",
    stage: "nda verification",
    date: "2023-08-12",
    amount: "$175,000",
    avatar: "CT"
  },
  {
    id: "APP-005",
    name: "Addis Manufacturing",
    status: "pending",
    stage: "document review",
    date: "2023-08-08",
    amount: "$90,000",
    avatar: "AM"
  }
];

// Sample reviewers data
const reviewers = [
  { id: "rev1", name: "John Smith", avatar: "JS", assignedApplications: 3 },
  { id: "rev2", name: "Maria Garcia", avatar: "MG", assignedApplications: 5 },
  { id: "rev3", name: "David Osei", avatar: "DO", assignedApplications: 2 },
];

// Sample conversations with correct type
const conversations: Conversation[] = [
  {
    id: "conv1",
    participant: {
      id: "client1",
      name: "Accra Textiles Ltd",
      role: "client" as UserRole,
    },
    lastMessage: {
      content: "Can we schedule a call to discuss the application?",
      timestamp: new Date("2023-08-15T14:30:00"),
      isRead: false,
    },
    applicationId: "001",
  },
  {
    id: "conv2",
    participant: {
      id: "reviewer1",
      name: "John Smith",
      role: "reviewer" as UserRole,
    },
    lastMessage: {
      content: "I've completed the review for Lagos Tech",
      timestamp: new Date("2023-08-15T11:20:00"),
      isRead: true,
    },
  },
  {
    id: "conv3",
    participant: {
      id: "client3",
      name: "Nairobi Agritech",
      role: "client" as UserRole,
    },
    lastMessage: {
      content: "Thank you for the feedback on our application",
      timestamp: new Date("2023-08-14T16:45:00"),
      isRead: true,
    },
    applicationId: "003",
  }
];

// Sample messages with correct type
const dummyMessages: Message[] = [
  {
    id: "msg1",
    content: "Hello, I'm the admin reviewing your application. Could you provide more details about your business plan?",
    sender: {
      id: "admin1",
      name: "Admin",
      role: "admin" as UserRole,
    },
    timestamp: new Date("2023-08-15T10:30:00"),
  },
  {
    id: "msg2",
    content: "Sure, I've just uploaded an updated business plan to the documents section. Please let me know if you need anything else.",
    sender: {
      id: "client1",
      name: "Accra Textiles Ltd",
      role: "client" as UserRole,
    },
    timestamp: new Date("2023-08-15T11:15:00"),
  },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("applications");
  const [activeConversationId, setActiveConversationId] = useState<string>("conv1");
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  
  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg${messages.length + 1}`,
      content,
      sender: {
        id: "admin1",
        name: "Admin",
        role: "admin",
      },
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
  };

  const handleViewApplication = (id: string) => {
    console.log(`Viewing application: ${id}`);
    // Implementation for viewing application details
  };

  const handleMessageClient = (id: string) => {
    setActiveTab("messages");
    // In a real app, you would find the right conversation ID
    setActiveConversationId("conv1");
  };

  const handleViewReviewer = (id: string) => {
    console.log(`Viewing reviewer: ${id}`);
    // Implementation for viewing reviewer details
  };

  const handleMessageReviewer = (id: string) => {
    setActiveTab("messages");
    // For demo purposes we'll just use one conversation
    setActiveConversationId("conv2");
  };

  const handleViewNdas = () => {
    console.log("Viewing all NDAs");
    // Implementation for viewing all NDAs
  };

  const handleViewPending = () => {
    console.log("Viewing all pending applications");
    // Implementation for viewing all pending applications
  };

  const handleReviewApplication = (id: string) => {
    console.log(`Reviewing application: ${id}`);
    // Implementation for reviewing application
  };

  const pendingApplications = applications.filter(app => app.status === "pending").slice(0, 3);
  
  const recentActivities = [
    { action: "Document approved", company: "Lagos Tech Solutions", time: "2 hours ago" },
    { action: "Application rejected", company: "Nairobi Agritech", time: "Yesterday" },
    { action: "NDA signed", company: "Cape Town Renewables", time: "2 days ago" },
  ];

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
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage applications, reviewers, and communications
                </p>
              </div>
              
              <div className="flex gap-2">
                <ThemeToggle />
                <Button variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Reviewer
                </Button>
                <Button>
                  <UserCheck className="mr-2 h-4 w-4" /> Assign Applications
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="applications" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications Overview</CardTitle>
                    <CardDescription>View and manage all applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApplicationsTable 
                      applications={applications}
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      onViewApplication={handleViewApplication}
                      onMessageClient={handleMessageClient}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviewers" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviewers Management</CardTitle>
                    <CardDescription>Manage and track reviewer assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReviewersManagement 
                      reviewers={reviewers}
                      onViewReviewer={handleViewReviewer}
                      onMessageReviewer={handleMessageReviewer}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages" className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 h-[600px]">
                    <ConversationList 
                      conversations={conversations}
                      onSelectConversation={setActiveConversationId}
                      activeConversationId={activeConversationId}
                    />
                  </div>
                  
                  <div className="md:col-span-2 h-[600px]">
                    <MessageThread 
                      messages={messages}
                      onSendMessage={handleSendMessage}
                      currentUser={{ id: "admin1", role: "admin" }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <StatusCards 
              approvedNdas={24}
              rejectedNdas={6}
              pendingApplications={pendingApplications}
              recentActivities={recentActivities}
              onViewNdas={handleViewNdas}
              onViewPending={handleViewPending}
              onReviewApplication={handleReviewApplication}
            />
          </motion.div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;
