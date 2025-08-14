import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/chat";

interface ChatHeaderProps {
  user: User;
}

export const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-4 p-6 border-b border-border/50 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm rounded-t-lg">
      <Avatar className="h-14 w-14 ring-2 ring-primary/20">
        <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <div 
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              user.isOnline ? 'bg-online-status shadow-lg shadow-online-status/50' : 'bg-muted-foreground'
            }`}
          />
          <span className="text-sm text-muted-foreground font-medium">
            {user.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};