
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types/messaging';
import supabase from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface MessageInputProps {
  conversationId: string;
  receiverId: string;
  applicationId?: string;
  onMessageSent?: (message: any) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  conversationId,
  receiverId,
  applicationId,
  onMessageSent,
}) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { userDetails } = useAuth();
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!userDetails) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'You need to be logged in to send messages',
      });
      return;
    }
    
    try {
      setSending(true);
      
      // Insert message into the database
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: userDetails.id,
          receiver_id: receiverId,
          application_id: applicationId,
          content: message.trim(),
          read: false,
        })
        .select('*, sender:sender_id(*)')
        .single();
      
      if (error) throw error;
      
      // Update conversation with last message
      await supabase
        .from('conversations')
        .update({
          last_message_content: message.trim(),
          last_message_time: new Date().toISOString(),
          is_read: false,
        })
        .eq('id', conversationId);
      
      // Clear the input
      setMessage('');
      
      // Callback with the new message
      if (onMessageSent && data) {
        onMessageSent(data);
      }
      
      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully',
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        variant: 'destructive',
        title: 'Send failed',
        description: error.message || 'Could not send message. Please try again.',
      });
    } finally {
      setSending(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="border-t p-4 bg-card">
      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none min-h-[80px]"
          disabled={sending}
        />
        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" type="button">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button
            className="rounded-full h-10 w-10 p-0"
            type="button"
            onClick={handleSendMessage}
            disabled={!message.trim() || sending}
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
