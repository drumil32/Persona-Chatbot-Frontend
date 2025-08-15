import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/chat";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/utils/theme";

interface UserListUser extends User {
  tagline: string;
  id: string;
}

interface UserListProps {
  users: UserListUser[];
  selectedUserId?: string;
  onUserSelect: (userId: string) => void;
}

const SAMPLE_USERS: UserListUser[] = [
  {
    id: "1",
    name: "Hitesh Choudhary",
    avatar: "/src/assets/Hitesh Choudhary.jpg",
    isOnline: true,
    tagline: "Educator"
  },
  {
    id: "2", 
    name: "Piyush Garg",
    avatar: "/src/assets/Piyush Garg.jpg",
    isOnline: true,
    tagline: "Assistant"
  }
];

export const UserList = ({ 
  users = SAMPLE_USERS, 
  selectedUserId, 
  onUserSelect 
}: UserListProps) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  
  return (
    <Card className={`w-full h-full ${currentTheme.cardBg} ${currentTheme.cardBorder} backdrop-blur-xl overflow-hidden`}>
      {/* Desktop Header */}
      <div className={`hidden xl:block p-4 border-b ${currentTheme.cardBorder}`}>
        <h3 className={`${currentTheme.primaryText} font-semibold text-base`}>Chats</h3>
      </div>
      
      {/* Desktop Layout - Vertical */}
      <div className="hidden xl:block overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 hover:${currentTheme.secondaryBtn} border-b ${currentTheme.cardBorder} ${
              selectedUserId === user.id ? currentTheme.secondaryBtn : ''
            }`}
          >
            <div className="relative">
              <Avatar className={`h-12 w-12 ring-2 ${currentTheme.avatarRing}`}>
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                <AvatarFallback className={`${currentTheme.avatarFallback} font-semibold`}>
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              {/* Online status indicator */}
              <div 
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 ${theme === 'dark' ? 'border-gray-900' : 'border-white'} transition-all duration-300 ${
                  user.isOnline ? currentTheme.onlineStatus : currentTheme.offlineStatus
                }`}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-medium ${currentTheme.primaryText} truncate`}>{user.name}</h4>
                <div className="flex items-center gap-1">
                  {user.isOnline && (
                    <div className={`w-2 h-2 ${currentTheme.onlineStatus} rounded-full animate-pulse`} />
                  )}
                </div>
              </div>
              <p className={`text-sm ${currentTheme.mutedText} truncate`}>{user.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Layout - Horizontal */}
      <div className="xl:hidden flex h-full overflow-x-auto gap-2 p-2">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 cursor-pointer transition-all duration-200 hover:${currentTheme.secondaryBtn} rounded-lg ${
              selectedUserId === user.id ? `${currentTheme.secondaryBtn} ring-1 ring-orange-500/50` : ''
            }`}
          >
            <div className="relative">
              <Avatar className={`h-10 w-10 ring-2 ${currentTheme.avatarRing}`}>
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                <AvatarFallback className={`${currentTheme.avatarFallback} font-semibold text-sm`}>
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              {/* Online status indicator */}
              <div 
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${theme === 'dark' ? 'border-gray-900' : 'border-white'} transition-all duration-300 ${
                  user.isOnline ? currentTheme.onlineStatus : currentTheme.offlineStatus
                }`}
              />
            </div>
            
            <div className="min-w-0">
              <h4 className={`font-medium ${currentTheme.primaryText} text-sm whitespace-nowrap`}>{user.name}</h4>
              <p className={`text-xs ${currentTheme.mutedText} whitespace-nowrap`}>{user.tagline}</p>
            </div>
          </div>
        ))}
      </div>
        
      {/* Empty state if no users */}
      {users.length === 0 && (
        <div className="p-8 text-center">
          <p className={`${currentTheme.mutedText} text-sm`}>No users available</p>
        </div>
      )}
    </Card>
  );
};