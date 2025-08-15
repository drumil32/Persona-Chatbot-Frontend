import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bot, Sun, Moon } from "lucide-react";
import { User } from "@/types/chat";
import { AIModel, AI_MODEL_OPTIONS } from "@/types/aiModels";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/utils/theme";

interface ChatHeaderProps {
  user: User;
  selectedModel?: AIModel;
  onModelChange?: (model: AIModel) => void;
}

export const ChatHeader = ({ user, selectedModel, onModelChange }: ChatHeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = themes[theme];
  
  return (
    <div className={`flex items-center gap-3 p-2 xl:p-3 border-b ${currentTheme.cardBorder} bg-gradient-to-r ${currentTheme.headerBg} backdrop-blur-sm rounded-t-lg`}>
      <Avatar className={`h-8 w-8 xl:h-10 xl:w-10 ring-2 ${currentTheme.avatarRing}`}>
        <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
        <AvatarFallback className={`${currentTheme.avatarFallback} font-semibold text-xs xl:text-sm`}>
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold ${currentTheme.primaryText} text-sm xl:text-base truncate`}>{user.name}</h3>
        <div className="flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              user.isOnline ? `${currentTheme.onlineStatus} shadow-lg shadow-green-400/50` : currentTheme.offlineStatus
            }`}
          />
          <span className={`text-xs ${currentTheme.secondaryText} font-medium`}>
            {user.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <Button
        onClick={toggleTheme}
        size="icon"
        className={`h-8 w-8 xl:h-9 xl:w-9 ${currentTheme.secondaryBtn} ${currentTheme.primaryText} hover:scale-105 active:scale-95 transition-all duration-200`}
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* AI Model Selection */}
      {selectedModel && onModelChange && (
        <div className="flex-shrink-0">
          <Select value={selectedModel} onValueChange={(value) => onModelChange(value as AIModel)}>
            <SelectTrigger className={`w-40 xl:w-48 ${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.inputText} h-8 xl:h-9 hover:${currentTheme.secondaryBtn} ${currentTheme.inputFocus} focus:ring-orange-500 text-xs xl:text-sm`}>
              <Bot className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={`${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
              {AI_MODEL_OPTIONS.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className={`${currentTheme.primaryText} hover:${currentTheme.secondaryBtn} focus:${currentTheme.secondaryBtn} cursor-pointer`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-xs xl:text-sm">{option.label}</span>
                    {option.description && (
                      <span className={`text-xs ${currentTheme.mutedText} hidden xl:block`}>{option.description}</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};