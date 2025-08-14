import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { Message, User } from "@/types/chat";
import userAvatar from "@/assets/user-avatar.jpg";

// Mock bot responses
const BOT_RESPONSES = [
  "Hello! How can I help you today?",
  "That's interesting! Tell me more about that.",
  "I understand. Let me think about that for a moment.",
  "Great question! Here's what I think...",
  "Thanks for sharing that with me.",
  "I'm here to help! What else would you like to know?",
  "That makes sense. Is there anything specific you'd like assistance with?",
  "I appreciate you taking the time to chat with me.",
];

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user: User = {
    name: "Alex Johnson",
    avatar: userAvatar,
    isOnline: true,
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  return (
    <div className="min-h-screen bg-chat-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl border-border">
        <ChatHeader user={user} />
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </Card>
    </div>
  );
};