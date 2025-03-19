
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  action: string;
  company: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
}) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
              <div className="font-medium">{activity.action}</div>
              <div className="text-sm text-muted-foreground">{activity.company}</div>
              <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
