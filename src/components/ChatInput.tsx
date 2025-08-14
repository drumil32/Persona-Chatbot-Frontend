import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-border bg-card rounded-b-lg">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 bg-input border-border focus:ring-primary"
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        size="icon"
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};