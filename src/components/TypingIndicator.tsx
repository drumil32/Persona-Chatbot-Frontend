export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="chat-bot-bubble px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};