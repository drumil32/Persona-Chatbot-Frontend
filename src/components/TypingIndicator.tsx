export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="chat-bot-bubble px-5 py-4 rounded-2xl rounded-bl-md shadow-lg">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-typing"></div>
          <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};