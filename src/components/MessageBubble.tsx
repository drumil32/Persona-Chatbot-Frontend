import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.isUser;
  
  return (
    <div 
      className={`flex mb-6 animate-slide-up ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
          isUser 
            ? 'chat-user-bubble rounded-br-md ml-auto' 
            : 'chat-bot-bubble rounded-bl-md mr-auto'
        }`}
      >
        <p className="text-sm leading-relaxed mb-2">{message.text}</p>
        <span className="text-xs opacity-70 float-right">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};