import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { PromptSuggestions } from "./PromptSuggestions";
import { UserList } from "./UserList";
import { Message, User, ChatApiResponse, ChatApiError } from "@/types/chat";
import { AIModel } from "@/types/aiModels";
import { API_ENDPOINTS } from "@/constants/api";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/utils/theme";
import axios, { AxiosError } from "axios";

// Chat histories for each user
const INITIAL_CHAT_HISTORIES: Record<string, Message[]> = {
  "1": [
    {
      id: "hitesh-1",
      text: "Namaste Hitesh Sir! 🙏 I'm your AI assistant ready to help with course creation, content development, teaching strategies, or any educational queries. What would you like to work on today?",
      isUser: false,
      timestamp: new Date(),
    }
  ],
  "2": [
    {
      id: "piyush-1", 
      text: "Hello Piyush! I'm your dedicated AI assistant here to support you with any tasks, questions, or projects you need help with. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]
};

// User data mapping
const USER_DATA: Record<string, { name: string; avatar: string }> = {
  "1": { name: "Hitesh Choudhary", avatar: "/src/assets/Hitesh Choudhary.jpg" },
  "2": { name: "Piyush Garg", avatar: "/src/assets/Piyush Garg.jpg" }
};

export const Chatbot = () => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>(INITIAL_CHAT_HISTORIES);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState<AIModel>(AIModel.GEMINI_2_FLASH);
  const [selectedUserId, setSelectedUserId] = useState<string>("1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current user's messages
  const messages = chatHistories[selectedUserId] || [];
  const currentUser = USER_DATA[selectedUserId];

  const user: User = {
    name: currentUser?.name || "Unknown User",
    avatar: currentUser?.avatar || "",
    isOnline: true,
  };

  const scrollToBottom = (immediate = false) => {
    if (messagesEndRef.current) {
      const scrollContainer = messagesEndRef.current.parentElement;
      if (scrollContainer) {
        if (immediate) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        } else {
          messagesEndRef.current.scrollIntoView({ 
            behavior: "smooth",
            block: "end",
            inline: "nearest"
          });
        }
      }
    }
  };

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToBottom();
      }, 10);
    });
  }, [messages, isTyping]);

  const handleSendPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    setInputValue(""); // Clear input when switching users
    console.log(`Selected user: ${userId} (${USER_DATA[userId]?.name})`);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    // Update the specific user's chat history
    setChatHistories(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), userMessage]
    }));
    
    setInputValue("");
    setIsTyping(true);
    
    // Ensure scroll to bottom after user message
    requestAnimationFrame(() => {
      setTimeout(() => scrollToBottom(), 50);
    });

    try {
      const response = await axios.post<ChatApiResponse>(API_ENDPOINTS.CHAT, {
        message: text,
        model: selectedModel,
        userName: currentUser?.name || `User ${selectedUserId}`
      });
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        isUser: false,
        timestamp: new Date(),
      };

      // Add bot response to the specific user's chat history
      setChatHistories(prev => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), botResponse]
      }));
      
      // Ensure scroll to bottom after bot response
      requestAnimationFrame(() => {
        setTimeout(() => scrollToBottom(), 100);
      });
    } catch (error) {
      console.error('Chat API error:', error);
      
      let errorText = 'Sorry, I encountered an unexpected error. Please try again.';
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ChatApiError>;
        if (axiosError.response?.data?.error) {
          errorText = `Sorry, I encountered an error: ${axiosError.response.data.error}`;
        } else if (axiosError.code === 'ECONNREFUSED') {
          errorText = 'Sorry, I cannot connect to the server. Please ensure the backend is running.';
        } else if (axiosError.response?.status === 400) {
          errorText = 'Sorry, your message appears to be invalid. Please try again.';
        } else if (axiosError.response?.status === 500) {
          errorText = 'Sorry, there was a server error. Please try again later.';
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: errorText,
        isUser: false,
        timestamp: new Date(),
        isError: true,
      };

      // Add error message to the specific user's chat history
      setChatHistories(prev => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), errorMessage]
      }));
      
      // Ensure scroll to bottom after error message
      requestAnimationFrame(() => {
        setTimeout(() => scrollToBottom(), 50);
      });
    } finally {
      setIsTyping(false);
      // Final scroll after typing stops
      requestAnimationFrame(() => {
        setTimeout(() => scrollToBottom(), 100);
      });
    }
  };

  return (
    <div className={`h-screen bg-gradient-to-br ${currentTheme.mainBg} flex flex-col xl:flex-row xl:items-center xl:justify-center p-2 xl:p-4`}>
      {/* Desktop Layout */}
      <div className="hidden xl:flex w-full max-w-[100rem] h-full flex-row gap-4">
        {/* Left Sidebar - User List */}
        <div className="w-80 h-full max-h-[95vh]">
          <UserList 
            selectedUserId={selectedUserId}
            onUserSelect={handleUserSelect}
          />
        </div>

        {/* Main Chat */}
        <Card className={`flex-1 max-w-4xl h-full max-h-[95vh] flex flex-col shadow-2xl ${currentTheme.cardBorder} backdrop-blur-xl ${currentTheme.cardBg} overflow-hidden`}>
          <ChatHeader 
            user={user} 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          
          <div className={`flex-1 overflow-y-auto p-3 xl:p-4 space-y-2 bg-gradient-to-b ${currentTheme.chatGradient}`}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} user={user} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isTyping}
            value={inputValue}
            onValueChange={setInputValue}
          />
        </Card>

        {/* Right Sidebar - Prompt Suggestions */}
        <div className="w-96 h-full max-h-[95vh]">
          <PromptSuggestions onSendPrompt={handleSendPrompt} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="xl:hidden flex flex-col w-full h-full gap-2">
        {/* Mobile User List - Horizontal */}
        <div className="flex-shrink-0 h-20">
          <UserList 
            selectedUserId={selectedUserId}
            onUserSelect={handleUserSelect}
          />
        </div>
        
        {/* Main Chat - Takes remaining space */}
        <Card className={`flex-1 flex flex-col shadow-2xl ${currentTheme.cardBorder} backdrop-blur-xl ${currentTheme.cardBg} overflow-hidden min-h-0`}>
          <ChatHeader 
            user={user} 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          
          <div className={`flex-1 overflow-y-auto p-2 xl:p-3 space-y-2 bg-gradient-to-b ${currentTheme.chatGradient} min-h-0`}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} user={user} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isTyping}
            value={inputValue}
            onValueChange={setInputValue}
          />
        </Card>
        
      </div>
    </div>
  );
};