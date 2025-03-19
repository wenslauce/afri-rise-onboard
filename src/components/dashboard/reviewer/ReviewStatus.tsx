
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, FileX } from "lucide-react";

interface ReviewStatusProps {
  completedCount: number;
  pendingCount: number;
  onViewAllReviews: () => void;
}

export const ReviewStatus: React.FC<ReviewStatusProps> = ({
  completedCount,
  pendingCount,
  onViewAllReviews,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Review Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <FileCheck className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-2xl font-bold text-green-600">{completedCount}</span>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <FileX className="h-8 w-8 text-amber-600 mb-2" />
            <span className="text-2xl font-bold text-amber-600">{pendingCount}</span>
            <span className="text-sm text-muted-foreground">Pending</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={onViewAllReviews}>View All Reviews</Button>
      </CardContent>
    </Card>
  );
};
