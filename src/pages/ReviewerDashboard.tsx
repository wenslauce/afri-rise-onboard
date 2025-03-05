
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCheck, FileX, Search, Filter, Eye, MessageSquare, ClipboardCheck } from "lucide-react";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageThread } from "@/components/messaging/MessageThread";

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

// Dummy data for the message threads
const conversations = [
  {
    id: "conv1",
    participant: {
      id: "client1",
      name: "Accra Textiles Ltd",
      role: "client",
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
      role: "client",
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
      role: "admin",
    },
    lastMessage: {
      content: "Please prioritize the Lagos Tech review",
      timestamp: new Date("2023-08-14T09:45:00"),
      isRead: true,
    },
  }
];

// Dummy messages for a conversation
const dummyMessages = [
  {
    id: "msg1",
    content: "Hello, I'm reviewing your application now. Do you have the financial statements for the last 3 years?",
    sender: {
      id: "reviewer1",
      name: "John Reviewer",
      role: "reviewer",
    },
    timestamp: new Date("2023-08-14T10:30:00"),
  },
  {
    id: "msg2",
    content: "Yes, I have uploaded them to the documents section. Let me know if you need anything else.",
    sender: {
      id: "client2",
      name: "Lagos Tech Solutions",
      role: "client",
    },
    timestamp: new Date("2023-08-14T10:35:00"),
  },
  {
    id: "msg3",
    content: "Thank you, I can see them now. I'll continue with the review and get back to you if I have more questions.",
    sender: {
      id: "reviewer1",
      name: "John Reviewer",
      role: "reviewer",
    },
    timestamp: new Date("2023-08-14T10:40:00"),
  },
];

const ReviewerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<string>("conv2");
  const [messages, setMessages] = useState(dummyMessages);
  
  const filteredApplications = assignedApplications.filter(app => 
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const statusColor = (status: string) => {
    switch(status) {
      case "approved": return "bg-green-100 text-green-600";
      case "rejected": return "bg-red-100 text-red-600";
      case "in-progress": return "bg-blue-100 text-blue-600";
      default: return "bg-amber-100 text-amber-600";
    }
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg${messages.length + 1}`,
      content,
      sender: {
        id: "reviewer1",
        name: "John Reviewer",
        role: "reviewer" as const,
      },
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
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
              <h1 className="text-3xl font-bold tracking-tight">Reviewer Dashboard</h1>
              <p className="text-muted-foreground">
                Review applications and communicate with clients
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <FileCheck className="mr-2 h-4 w-4" /> Completed Reviews
              </Button>
              <Button>
                <ClipboardCheck className="mr-2 h-4 w-4" /> Start New Review
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="assigned" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="assigned">Assigned Applications</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assigned" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications Assigned to You</CardTitle>
                  <CardDescription>Review and process these applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                    <div className="relative w-full md:w-96">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search by company or ID..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 border-b bg-muted/50 font-medium text-sm">
                      <div className="col-span-5 md:col-span-4">Company</div>
                      <div className="col-span-3 md:col-span-2">Status</div>
                      <div className="hidden md:block md:col-span-2">Stage</div>
                      <div className="hidden md:block md:col-span-2">Date</div>
                      <div className="col-span-3 md:col-span-1">Actions</div>
                    </div>
                    
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app, index) => (
                        <div key={index} className="grid grid-cols-12 p-4 border-b last:border-0 items-center text-sm">
                          <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" alt={app.company} />
                              <AvatarFallback>{app.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{app.company}</div>
                              <div className="text-muted-foreground text-xs">APP-{app.id}</div>
                            </div>
                          </div>
                          <div className="col-span-3 md:col-span-2">
                            <Badge variant="outline" className={`${statusColor(app.status)} capitalize`}>
                              {app.status}
                            </Badge>
                          </div>
                          <div className="hidden md:block md:col-span-2 capitalize">
                            {app.stage}
                          </div>
                          <div className="hidden md:block md:col-span-2 text-muted-foreground">
                            {app.date}
                          </div>
                          <div className="col-span-3 md:col-span-1 flex gap-1">
                            <Button variant="ghost" size="icon" title="View Details">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Message Client">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No applications match your search criteria
                      </div>
                    )}
                  </div>
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
                    currentUser={{ id: "reviewer1", role: "reviewer" }}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Review Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <FileCheck className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-2xl font-bold text-green-600">5</span>
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <FileX className="h-8 w-8 text-amber-600 mb-2" />
                    <span className="text-2xl font-bold text-amber-600">3</span>
                    <span className="text-sm text-muted-foreground">Pending</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View All Reviews</Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Document approved", company: "Lagos Tech Solutions", time: "2 hours ago" },
                    { action: "NDA verified", company: "Accra Textiles Ltd", time: "Yesterday" },
                    { action: "Review completed", company: "Cape Town Renewables", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.company}</div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ReviewerDashboard;
