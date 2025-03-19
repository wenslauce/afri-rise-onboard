
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { FileCheck, ClipboardCheck } from "lucide-react";
import { AssignedApplications } from "@/components/dashboard/reviewer/AssignedApplications";
import { ReviewStatus } from "@/components/dashboard/reviewer/ReviewStatus";
import { RecentActivity } from "@/components/dashboard/reviewer/RecentActivity";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageThread } from "@/components/messaging/MessageThread";
import { Conversation, Message, UserRole } from "@/types/messaging";
import ErrorBoundary from "@/components/ErrorBoundary";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Dummy data for the reviewer dashboard
const assignedApplications = [
  {
    id: "001",
    company: "Accra Textiles Ltd",
    status: "pending",
    stage: "document review",
    date: "2023-08-15",
    avatar: "AT"
  },
  {
    id: "002",
    company: "Lagos Tech Solutions",
    status: "in-progress",
    stage: "nda verification",
    date: "2023-08-14",
    avatar: "LT"
  },
  {
    id: "003",
    company: "Nairobi Agritech",
    status: "pending",
    stage: "initial screening",
    date: "2023-08-10",
    avatar: "NA"
  }
];

// Dummy data for the message threads with correct types
const conversations: Conversation[] = [
  {
    id: "conv1",
    participant: {
      id: "client1",
      name: "Accra Textiles Ltd",
      role: "client" as UserRole,
    },
    lastMessage: {
      content: "When will my application be reviewed?",
      timestamp: new Date("2023-08-15T10:30:00"),
      isRead: false,
    },
    applicationId: "001",
  },
  {
    id: "conv2",
    participant: {
      id: "client2",
      name: "Lagos Tech Solutions",
      role: "client" as UserRole,
    },
    lastMessage: {
      content: "I have uploaded the requested documents",
      timestamp: new Date("2023-08-14T15:20:00"),
      isRead: true,
    },
    applicationId: "002",
  },
  {
    id: "conv3",
    participant: {
      id: "admin1",
      name: "Sarah Admin",
      role: "admin" as UserRole,
    },
    lastMessage: {
      content: "Please prioritize the Lagos Tech review",
      timestamp: new Date("2023-08-14T09:45:00"),
      isRead: true,
    },
  }
];

// Dummy messages for a conversation with correct types
const dummyMessages: Message[] = [
  {
    id: "msg1",
    content: "Hello, I'm reviewing your application now. Do you have the financial statements for the last 3 years?",
    sender: {
      id: "reviewer1",
      name: "John Reviewer",
      role: "reviewer" as UserRole,
    },
    timestamp: new Date("2023-08-14T10:30:00"),
  },
  {
    id: "msg2",
    content: "Yes, I have uploaded them to the documents section. Let me know if you need anything else.",
    sender: {
      id: "client2",
      name: "Lagos Tech Solutions",
      role: "client" as UserRole,
    },
    timestamp: new Date("2023-08-14T10:35:00"),
  },
  {
    id: "msg3",
    content: "Thank you, I can see them now. I'll continue with the review and get back to you if I have more questions.",
    sender: {
      id: "reviewer1",
      name: "John Reviewer",
      role: "reviewer" as UserRole,
    },
    timestamp: new Date("2023-08-14T10:40:00"),
  },
];

// Recent activities
const recentActivities = [
  { action: "Document approved", company: "Lagos Tech Solutions", time: "2 hours ago" },
  { action: "NDA verified", company: "Accra Textiles Ltd", time: "Yesterday" },
  { action: "Review completed", company: "Cape Town Renewables", time: "2 days ago" },
];

const ReviewerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("assigned");
  const [activeConversationId, setActiveConversationId] = useState<string>("conv2");
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  
  const handleViewApplication = (id: string) => {
    console.log(`Viewing application: ${id}`);
    // Implementation for viewing application details
  };

  const handleMessageClient = (id: string) => {
    setActiveTab("messages");
    // Find the right conversation based on application ID
    const conversation = conversations.find(conv => conv.applicationId === id);
    if (conversation) {
      setActiveConversationId(conversation.id);
    }
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg${messages.length + 1}`,
      content,
      sender: {
        id: "reviewer1",
        name: "John Reviewer",
        role: "reviewer",
      },
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
  };

  const handleStartNewReview = () => {
    console.log("Starting new review");
    // Implementation for starting a new review
  };

  const handleViewAllReviews = () => {
    console.log("Viewing all reviews");
    // Implementation for viewing all reviews
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
                <h1 className="text-3xl font-bold tracking-tight">Reviewer Dashboard</h1>
                <p className="text-muted-foreground">
                  Review applications and communicate with clients
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileCheck className="mr-2 h-4 w-4" /> Completed Reviews
                </Button>
                <Button onClick={handleStartNewReview}>
                  <ClipboardCheck className="mr-2 h-4 w-4" /> Start New Review
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="assigned" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="assigned">Assigned Applications</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assigned" className="mt-6">
                <AssignedApplications 
                  applications={assignedApplications}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onViewApplication={handleViewApplication}
                  onMessageClient={handleMessageClient}
                />
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
                      currentUser={{ id: "reviewer1", role: "reviewer" }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ReviewStatus 
                completedCount={5}
                pendingCount={3}
                onViewAllReviews={handleViewAllReviews}
              />
              
              <RecentActivity activities={recentActivities} />
            </div>
          </motion.div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default ReviewerDashboard;
