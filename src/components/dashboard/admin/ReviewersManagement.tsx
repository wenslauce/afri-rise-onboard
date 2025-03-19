
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, MessageSquare, UserPlus, Users } from "lucide-react";

interface Reviewer {
  id: string;
  name: string;
  avatar: string;
  assignedApplications: number;
}

interface ReviewersManagementProps {
  reviewers: Reviewer[];
  onViewReviewer: (id: string) => void;
  onMessageReviewer: (id: string) => void;
}

export const ReviewersManagement: React.FC<ReviewersManagementProps> = ({
  reviewers,
  onViewReviewer,
  onMessageReviewer,
}) => {
  return (
    <div>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onViewReviewer(reviewer.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onMessageReviewer(reviewer.id)}
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
    </div>
  );
};
