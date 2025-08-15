import { Message, User } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState } from "react";
import "highlight.js/styles/github.css";

interface MessageBubbleProps {
  message: Message;
  user?: User;
}

export const MessageBubble = ({ message, user }: MessageBubbleProps) => {
  const isUser = message.isUser;
  const isError = message.isError;
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CodeBlock = ({ children, ...props }: any) => {
    const extractTextFromChildren = (node: any): string => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extractTextFromChildren).join('');
      if (node && typeof node === 'object' && node.props && node.props.children) {
        return extractTextFromChildren(node.props.children);
      }
      return '';
    };

    const codeText = extractTextFromChildren(children).replace(/\n$/, '');
    const isCopied = copiedCode === codeText;
    
    return (
      <div className="relative group">
        <pre 
          style={{ backgroundColor: 'rgb(253, 232, 165)' }}
          className="p-2 xl:p-3 rounded mb-2 border border-orange-200 overflow-x-auto w-full min-w-0"
          {...props}
        >
          <code className="text-gray-900 text-xs xl:text-sm font-mono whitespace-pre block">
            {children}
          </code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(codeText)}
          className="absolute top-1 right-1 xl:top-2 xl:right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800/80 hover:bg-gray-900/90 text-white border border-gray-600 h-6 w-6 xl:h-8 xl:w-8 p-0"
        >
          {isCopied ? <Check className="h-3 w-3 xl:h-4 xl:w-4" /> : <Copy className="h-3 w-3 xl:h-4 xl:w-4" />}
        </Button>
      </div>
    );
  };
  
  const getBubbleStyle = () => {
    if (isUser) {
      return 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-md';
    }
    if (isError) {
      return 'bg-red-900 text-red-200 border border-red-700 rounded-bl-md';
    }
    return 'bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-bl-md';
  };

  const getBotAvatar = () => {
    if (!user) {
      return (
        <Avatar className="h-8 w-8 ring-1 ring-gray-600">
          <AvatarFallback className="bg-gray-600 text-gray-200 font-semibold text-xs">
            AI
          </AvatarFallback>
        </Avatar>
      );
    }
    // For AI responses, show the selected user's avatar (Hitesh/Piyush)
    return (
      <Avatar className="h-8 w-8 ring-1 ring-blue-500/50">
        <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
        <AvatarFallback className="bg-blue-500/20 text-blue-300 font-semibold text-xs">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    );
  };

  const getUserAvatar = () => {
    // For user messages, show a generic end-user avatar
    return (
      <Avatar className="h-8 w-8 ring-1 ring-orange-500/30">
        <AvatarFallback className="bg-orange-500/20 text-orange-300 font-semibold text-xs">
          U
        </AvatarFallback>
      </Avatar>
    );
  };
  
  return (
    <div 
      className={`flex mb-4 xl:mb-6 animate-slide-up items-end gap-1 xl:gap-2 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && getBotAvatar()}
      
      <div
        className={`max-w-[85%] xl:max-w-[75%] px-3 xl:px-4 py-1.5 xl:py-2 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${getBubbleStyle()}`}
      >
        <div className="prose prose-sm max-w-none mb-1 overflow-hidden">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              p: ({children}) => <p className="mb-1 last:mb-0 break-words">{children}</p>,
              a: ({href, children, ...props}) => (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors duration-200"
                  {...props}
                >
                  {children}
                </a>
              ),
              code: ({node, inline, className, children, ...props}) => {
                return inline ? (
                  <code 
                    style={{ backgroundColor: 'rgb(253, 232, 165)' }}
                    className="text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border border-orange-200" 
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <CodeBlock className={className} {...props}>
                    {children}
                  </CodeBlock>
                );
              },
              pre: ({children, ...props}) => <>{children}</>,
              ul: ({children}) => <ul className="list-disc list-inside mb-1 space-y-0.5 pl-2 overflow-x-auto">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-1 space-y-0.5 pl-2 overflow-x-auto">{children}</ol>,
              li: ({children}) => <li className="mb-0.5 break-words">{children}</li>,
              h1: ({children}) => <h1 className="text-lg font-bold mb-1.5 text-white break-words">{children}</h1>,
              h2: ({children}) => <h2 className="text-base font-bold mb-1.5 text-white break-words">{children}</h2>,
              h3: ({children}) => <h3 className="text-sm font-bold mb-1.5 text-white break-words">{children}</h3>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-orange-500/50 pl-3 italic mb-1.5 text-gray-300 overflow-x-auto break-words">{children}</blockquote>,
              strong: ({children}) => <strong className="font-semibold text-white">{children}</strong>,
              em: ({children}) => <em className="italic text-gray-200">{children}</em>,
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        <span className="text-xs opacity-70 float-right">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>

      {isUser && getUserAvatar()}
    </div>
  );
};