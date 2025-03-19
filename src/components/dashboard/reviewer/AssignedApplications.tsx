
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Eye, MessageSquare } from "lucide-react";

interface Application {
  id: string;
  company: string;
  status: string;
  stage: string;
  date: string;
  avatar: string;
}

interface AssignedApplicationsProps {
  applications: Application[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onViewApplication: (id: string) => void;
  onMessageClient: (id: string) => void;
}

export const AssignedApplications: React.FC<AssignedApplicationsProps> = ({
  applications,
  searchTerm,
  onSearchChange,
  onViewApplication,
  onMessageClient,
}) => {
  const statusColor = (status: string) => {
    switch(status) {
      case "approved": return "bg-green-100 text-green-600";
      case "rejected": return "bg-red-100 text-red-600";
      case "in-progress": return "bg-blue-100 text-blue-600";
      default: return "bg-amber-100 text-amber-600";
    }
  };

  const filteredApplications = applications.filter(app => 
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="View Details"
                    onClick={() => onViewApplication(app.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Message Client"
                    onClick={() => onMessageClient(app.id)}
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
  );
};
