import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/chat";

interface ChatHeaderProps {
  user: User;
}

export const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border bg-card rounded-t-lg">
      <Avatar className="h-12 w-12">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{user.name}</h3>
        <div className="flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full ${
              user.isOnline ? 'bg-online-status' : 'bg-muted-foreground'
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {user.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};