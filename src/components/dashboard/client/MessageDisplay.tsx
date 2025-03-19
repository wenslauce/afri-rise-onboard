
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface MessageDisplayProps {
  onSendMessage: () => void;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  onSendMessage,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communication with the Afri-Rise team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                AR
              </div>
              <div>
                <h3 className="font-medium">Afri-Rise Team</h3>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <p className="text-sm">
              Thank you for submitting your application. We've reviewed your initial documents 
              and need you to resubmit your Tax Compliance Certificate as the one provided 
              has expired. Please upload the current document at your earliest convenience.
            </p>
          </div>
          
          <Button className="w-full" onClick={onSendMessage}>
            <MessageSquare className="mr-2 h-4 w-4" /> Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
