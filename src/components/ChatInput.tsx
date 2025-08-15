import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/utils/theme";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const ChatInput = ({ 
  onSendMessage, 
  disabled, 
  value, 
  onValueChange
}: ChatInputProps) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [internalMessage, setInternalMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const message = value !== undefined ? value : internalMessage;
  const setMessage = onValueChange || setInternalMessage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      // Keep focus on input after sending message immediately
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 p-2 xl:p-3 border-t ${currentTheme.cardBorder} ${currentTheme.inputBg} backdrop-blur-sm rounded-b-lg`}>
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={disabled ? "Waiting for response..." : "Type a message..."}
        disabled={false}
        className={`flex-1 ${currentTheme.inputBg} border ${currentTheme.inputBorder} ${currentTheme.inputText} ${currentTheme.inputPlaceholder} ${currentTheme.inputFocus} focus:outline-none transition-all duration-200 h-10 xl:h-12 px-3 xl:px-4 text-sm xl:text-base`}
        autoFocus
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        size="icon"
        className={`bg-gradient-to-br ${currentTheme.primaryBtn} text-white h-10 w-10 xl:h-12 xl:w-12 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Send className="h-4 w-4 xl:h-5 xl:w-5" />
      </Button>
    </form>
  );
};