
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Search, FileCheck, FileX, UserCheck, ChevronDown, Filter, Eye, MessageSquare, UserPlus, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageThread } from "@/components/messaging/MessageThread";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

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

// Dummy data for reviewers
const reviewers = [
  { id: "rev1", name: "John Smith", avatar: "JS", assignedApplications: 3 },
  { id: "rev2", name: "Maria Garcia", avatar: "MG", assignedApplications: 5 },
  { id: "rev3", name: "David Osei", avatar: "DO", assignedApplications: 2 },
];

// Dummy data for conversations
const conversations = [
  {
    id: "conv1",
    participant: {
      id: "client1",
      name: "Accra Textiles Ltd",
      role: "client",
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
      role: "reviewer",
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
      role: "client",
    },
    lastMessage: {
      content: "Thank you for the feedback on our application",
      timestamp: new Date("2023-08-14T16:45:00"),
      isRead: true,
    },
    applicationId: "003",
  }
];

// Dummy messages for a conversation
const dummyMessages = [
  {
    id: "msg1",
    content: "Hello, I'm the admin reviewing your application. Could you provide more details about your business plan?",
    sender: {
      id: "admin1",
      name: "Admin",
      role: "admin",
    },
    timestamp: new Date("2023-08-15T10:30:00"),
  },
  {
    id: "msg2",
    content: "Sure, I've just uploaded an updated business plan to the documents section. Please let me know if you need anything else.",
    sender: {
      id: "client1",
      name: "Accra Textiles Ltd",
      role: "client",
    },
    timestamp: new Date("2023-08-15T11:15:00"),
  },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("applications");
  const [activeConversationId, setActiveConversationId] = useState<string>("conv1");
  const [messages, setMessages] = useState(dummyMessages);
  
  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
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
        id: "admin1",
        name: "Admin",
        role: "admin" as const,
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>All Applications</DropdownMenuItem>
                          <DropdownMenuItem>Pending Review</DropdownMenuItem>
                          <DropdownMenuItem>Approved</DropdownMenuItem>
                          <DropdownMenuItem>Rejected</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <ChevronDown className="mr-2 h-4 w-4" /> Sort by
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Newest First</DropdownMenuItem>
                          <DropdownMenuItem>Oldest First</DropdownMenuItem>
                          <DropdownMenuItem>Amount (High to Low)</DropdownMenuItem>
                          <DropdownMenuItem>Amount (Low to High)</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 border-b bg-muted/50 font-medium text-sm">
                      <div className="col-span-5 md:col-span-4">Company</div>
                      <div className="col-span-3 md:col-span-2">Status</div>
                      <div className="hidden md:block md:col-span-2">Stage</div>
                      <div className="hidden md:block md:col-span-2">Date</div>
                      <div className="col-span-3 md:col-span-1">Amount</div>
                      <div className="col-span-1">Action</div>
                    </div>
                    
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app, index) => (
                        <div key={index} className="grid grid-cols-12 p-4 border-b last:border-0 items-center text-sm">
                          <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" alt={app.name} />
                              <AvatarFallback>{app.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{app.name}</div>
                              <div className="text-muted-foreground text-xs">{app.id}</div>
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
                          <div className="col-span-3 md:col-span-1 font-medium">
                            {app.amount}
                          </div>
                          <div className="col-span-1 flex gap-1">
                            <Button variant="ghost" size="icon" title="View Details">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Message Client"
                              onClick={() => {
                                setActiveTab("messages");
                                // In a real app, you would find the right conversation ID
                                setActiveConversationId("conv1");
                              }}
                            >
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
            
            <TabsContent value="reviewers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reviewers Management</CardTitle>
                  <CardDescription>Manage and track reviewer assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Active Reviewers</h3>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" /> Add New Reviewer
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviewers.map((reviewer) => (
                      <Card key={reviewer.id} className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>{reviewer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-base">{reviewer.name}</h4>
                              <p className="text-sm text-muted-foreground">Reviewer ID: {reviewer.id}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Assigned Applications</span>
                              <Badge>{reviewer.assignedApplications}</Badge>
                            </div>
                            
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="mr-2 h-4 w-4" /> View
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => {
                                  setActiveTab("messages");
                                  // For demo purposes we'll just use one conversation
                                  setActiveConversationId("conv2");
                                }}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" /> Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Reviewer Load Distribution</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Total Reviewers: {reviewers.length}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileCheck className="h-5 w-5 text-green-600" />
                          <span className="font-medium">
                            Total Assigned: {reviewers.reduce((sum, r) => sum + r.assignedApplications, 0)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {reviewers.map((reviewer) => (
                          <div key={reviewer.id} className="bg-card rounded p-3 shadow-sm">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{reviewer.name}</span>
                              <span className="text-sm font-medium">{reviewer.assignedApplications}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2" 
                                style={{ width: `${(reviewer.assignedApplications / 10) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                    currentUser={{ id: "admin1", role: "admin" }}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>NDA Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <FileCheck className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-2xl font-bold text-green-600">24</span>
                    <span className="text-sm text-muted-foreground">Approved</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <FileX className="h-8 w-8 text-red-600 mb-2" />
                    <span className="text-2xl font-bold text-red-600">6</span>
                    <span className="text-sm text-muted-foreground">Rejected</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View All NDAs</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.filter(app => app.status === "pending").slice(0, 3).map((app, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{app.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{app.name}</div>
                          <div className="text-xs text-muted-foreground">{app.stage}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Review</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">View All Pending</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Document approved", company: "Lagos Tech Solutions", time: "2 hours ago" },
                    { action: "Application rejected", company: "Nairobi Agritech", time: "Yesterday" },
                    { action: "NDA signed", company: "Cape Town Renewables", time: "2 days ago" },
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

export default AdminDashboard;
