import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.isUser;
  
  return (
    <div 
      className={`flex mb-4 animate-slide-up ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
          isUser 
            ? 'chat-user-bubble rounded-br-md' 
            : 'chat-bot-bubble rounded-bl-md'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};