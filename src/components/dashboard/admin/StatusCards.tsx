
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, FileX } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PendingApplication {
  id: string;
  name: string;
  avatar: string;
  stage: string;
}

interface Activity {
  action: string;
  company: string;
  time: string;
}

interface StatusCardsProps {
  approvedNdas: number;
  rejectedNdas: number;
  pendingApplications: PendingApplication[];
  recentActivities: Activity[];
  onViewNdas: () => void;
  onViewPending: () => void;
  onReviewApplication: (id: string) => void;
}

export const StatusCards: React.FC<StatusCardsProps> = ({
  approvedNdas,
  rejectedNdas,
  pendingApplications,
  recentActivities,
  onViewNdas,
  onViewPending,
  onReviewApplication,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>NDA Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <FileCheck className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-2xl font-bold text-green-600">{approvedNdas}</span>
              <span className="text-sm text-muted-foreground">Approved</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <FileX className="h-8 w-8 text-red-600 mb-2" />
              <span className="text-2xl font-bold text-red-600">{rejectedNdas}</span>
              <span className="text-sm text-muted-foreground">Rejected</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={onViewNdas}>View All NDAs</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Pending Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApplications.map((app, index) => (
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
                <Button variant="ghost" size="sm" onClick={() => onReviewApplication(app.id)}>Review</Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={onViewPending}>View All Pending</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
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
  );
};
