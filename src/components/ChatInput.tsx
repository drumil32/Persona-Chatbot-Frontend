import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      // Keep focus on input after sending message
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 border-t border-border bg-card/50 backdrop-blur-sm rounded-b-lg">
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 bg-input/80 border-border focus:ring-primary focus:ring-2 transition-all duration-200 h-12 px-4 text-base"
        autoFocus
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        size="icon"
        className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};