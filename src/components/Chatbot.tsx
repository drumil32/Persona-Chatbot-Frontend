import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { UserList } from "./UserList";
import { Message, User, ChatApiResponse, ChatApiError } from "@/types/chat";
import { AIModel } from "@/types/aiModels";
import { API_ENDPOINTS } from "@/constants/api";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/utils/theme";
import axios, { AxiosError } from "axios";
import hiteshImg from "@/assets/Hitesh Choudhary.jpg";
import piyushImg from "@/assets/Piyush Garg.jpg";

// Chat histories for each user
const INITIAL_CHAT_HISTORIES: Record<string, Message[]> = {
  "1": [
    {
      id: "hitesh-1",
      text: "Hello dost, swagat hai aapka! Chalo shuru karte hain.",
      isUser: false,
      timestamp: new Date(),
    }
  ],
  "2": [
    {
      id: "piyush-1",
      text: "Hello, friend! Welcome to another exciting conversation.",
      isUser: false,
      timestamp: new Date(),
    }
  ]
};

// User data mapping
const USER_DATA: Record<string, { name: string; avatar: string }> = {
  "1": { name: "Hitesh Choudhary", avatar: hiteshImg },
  "2": { name: "Piyush Garg", avatar: piyushImg }
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const mobileMessagesContainerRef = useRef<HTMLDivElement>(null);

  // Get current user's messages
  const messages = chatHistories[selectedUserId] || [];
  const currentUser = USER_DATA[selectedUserId];

  const user: User = {
    name: currentUser?.name || "Unknown User",
    avatar: currentUser?.avatar || "",
    isOnline: true,
  };

  const scrollToBottom = (immediate = false) => {
    // Try desktop container first, then mobile container
    const container = messagesContainerRef.current || mobileMessagesContainerRef.current;
    if (container) {
      if (immediate) {
        container.scrollTop = container.scrollHeight;
      } else {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  };

  useEffect(() => {
    // Simple and reliable scrolling after messages update
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
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
    setTimeout(() => scrollToBottom(), 50);

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
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error('Chat API error:', error);

      // Get personalized error messages based on status code and user
      const getPersonalizedErrorMessage = (statusCode: number | undefined, errorDetails: string, userName: string) => {
        const userFirstName = userName.split(' ')[0];
        
        switch (selectedUserId) {
          case "1": // Hitesh Choudhary
            switch (statusCode) {
              case 400:
                return `Arre bhai! 🤦‍♂️ Ye kya bhej diya tumne? Format ka bhel puri bana diya! Thoda request check karo, fir bhejo. #chaiaurcode`;
            case 401:
                return `Oho bhai! 😏 Authentication ka password bhool gaye kya? Refresh maaro, login karo, aur fir code chalao.`;
            case 403:
                return `Dekho bhai, 🚫 yeh gatekeepers ne rok diya tumhe. Access nahi mil raha. Support wale ko knock knock karo.`;
            case 404:
                return `Bhai, jo dhoondh rahe ho wo toh Bermuda Triangle me chala gaya 😅. Resource hi nahi mila!`;
            case 429:
                return `Arre bhai! 🏃‍♂️ Thoda slow ho jao, Usain Bolt banne ki zarurat nahi. Requests dheere bhejo, server bhi insaan hai.`;
            case 500:
                return `Oho bhai! 💥 Server bol raha hai "Bas bhai, ab aur load nahi". Thodi der chai piyo, fir try karo.`;
            case 502:
                return `Bhai ☕, yeh toh pura bad gateway ka masala ho gaya. Team kaam pe lagi hai, tension nahi lene ka.`;
            case 503:
                return `bhai! 🛠 Service thodi break pe hai. Jitne me repair ho, ek cutting chai le lo.`;
            default:
                return `Bhai, kuch toh gadbad hai 😅. Error: ${errorDetails}. Chinta mat karo, fix ho jayega.`;            
            }
          case "2": // Piyush Garg  
            switch (statusCode) {
              case 400:
                return `Hey ${userFirstName}! There's something wrong with the request format. Can you double-check your message and try again?`;
              case 401:
                return `Hi ${userFirstName}! Authentication problem detected. Try refreshing the page and we'll get you back on track.`;
              case 403:
                return `Sorry ${userFirstName}! Access denied for this request. If this keeps happening, let's contact support together.`;
              case 404:
                return `Oops ${userFirstName}! Couldn't find what we're looking for. This might be temporary - let's try again in a bit.`;
              case 429:
                return `Slow down there ${userFirstName}! You're sending messages too fast. Take a quick breather and try again.`;
              case 500:
                return `Uh oh ${userFirstName}! Server ran into an internal error. Give it a few minutes and let's try again.`;
              case 502:
                return `Technical hiccup ${userFirstName}! Bad gateway error. The tech team is probably on it already.`;
              case 503:
                return `Service is taking a break ${userFirstName}! Try again in a moment - we'll get this sorted.`;
              default:
                return `Sorry ${userFirstName}! Ran into a technical issue: ${errorDetails}. I'm here to help once this gets sorted out.`;
            }
          default:
            switch (statusCode) {
              case 400:
                return `Sorry ${userFirstName}! Invalid request format. Please try again.`;
              case 401:
                return `Sorry ${userFirstName}! Authentication required. Please refresh and try again.`;
              case 403:
                return `Sorry ${userFirstName}! Access forbidden. Contact support if needed.`;
              case 404:
                return `Sorry ${userFirstName}! Resource not found. Try again later.`;
              case 429:
                return `Sorry ${userFirstName}! Too many requests. Please wait a moment.`;
              case 500:
                return `Sorry ${userFirstName}! Server error occurred. Try again later.`;
              case 502:
                return `Sorry ${userFirstName}! Bad gateway error. Technical issue detected.`;
              case 503:
                return `Sorry ${userFirstName}! Service unavailable. Try again shortly.`;
              default:
                return `Sorry ${userFirstName}! ${errorDetails}`;
            }
        }
      };
      
      let statusCode: number | undefined;
      let baseErrorText = 'I encountered an unexpected error. Please try again.';

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ChatApiError>;
        statusCode = axiosError.response?.status;
        
        if (axiosError.response?.data?.error) {
          baseErrorText = axiosError.response.data.error;
        } else if (axiosError.code === 'ECONNREFUSED') {
          baseErrorText = 'Cannot connect to server. Please ensure backend is running.';
          statusCode = undefined; // Connection error, no status code
        } else {
          baseErrorText = axiosError.message || 'Network error occurred.';
        }
      }
      
      const errorText = getPersonalizedErrorMessage(statusCode, baseErrorText, currentUser?.name || 'User');

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
      setTimeout(() => scrollToBottom(), 50);
    } finally {
      setIsTyping(false);
      // Final scroll after typing stops
      setTimeout(() => scrollToBottom(), 100);
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

        {/* Main Chat - fill remaining space */}
        <Card
          className={`flex-1 h-full max-h-[95vh] flex flex-col shadow-2xl ${currentTheme.cardBorder} backdrop-blur-xl ${currentTheme.cardBg} overflow-hidden`}
        >
          <ChatHeader
            user={user}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />

          <div 
            ref={messagesContainerRef}
            className={`flex-1 overflow-y-auto p-3 xl:p-4 space-y-2 bg-gradient-to-b ${currentTheme.chatGradient} scroll-smooth custom-scrollbar`}
            style={{ scrollbarGutter: 'stable' }}
          >
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

          <div 
            ref={mobileMessagesContainerRef}
            className={`flex-1 overflow-y-auto p-2 xl:p-3 space-y-2 bg-gradient-to-b ${currentTheme.chatGradient} min-h-0 scroll-smooth custom-scrollbar`}
            style={{ scrollbarGutter: 'stable' }}
          >
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