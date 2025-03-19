
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, MessageSquare, Search, Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Application {
  id: string;
  name: string;
  status: string;
  stage: string;
  date: string;
  amount: string;
  avatar: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onViewApplication: (id: string) => void;
  onMessageClient: (id: string) => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
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
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
    </div>
  );
};
