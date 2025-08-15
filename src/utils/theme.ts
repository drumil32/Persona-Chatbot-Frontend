export const themes = {
  dark: {
    // Main background gradients
    mainBg: 'from-black via-gray-900 to-black',
    
    // Card backgrounds
    cardBg: 'bg-gray-900/95',
    cardBorder: 'border-gray-700/50',
    
    // Header
    headerBg: 'from-gray-800/50 to-gray-900/50',
    
    // Input areas
    inputBg: 'bg-gray-700/80',
    inputBorder: 'border-gray-600',
    inputFocus: 'focus:border-orange-500',
    inputText: 'text-white',
    inputPlaceholder: 'placeholder-gray-400',
    
    // Buttons
    primaryBtn: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    secondaryBtn: 'bg-gray-700/80 hover:bg-gray-600/80',
    
    // Messages
    userBubble: 'from-orange-500 to-orange-600',
    botBubble: 'from-gray-700 to-gray-800',
    errorBubble: 'from-red-600 to-red-700',
    
    // Text colors
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
    mutedText: 'text-gray-400',
    linkText: 'text-blue-400 hover:text-blue-300',
    
    // Code blocks
    codeBg: 'rgb(253, 232, 165)', // Keep cream color for readability
    codeText: 'text-gray-900',
    inlineCodeBg: 'bg-gray-600/50',
    inlineCodeText: 'text-orange-300',
    
    // Avatars
    avatarRing: 'ring-orange-500/30',
    avatarFallback: 'bg-orange-500/20 text-orange-300',
    botAvatarRing: 'ring-blue-500/50',
    botAvatarFallback: 'bg-blue-500/20 text-blue-300',
    
    // Status indicators
    onlineStatus: 'bg-green-400',
    offlineStatus: 'bg-gray-500',
    
    // Gradients for chat area
    chatGradient: 'from-gray-800/10 to-black/10'
  },
  
  light: {
    // Main background gradients
    mainBg: 'from-gray-50 via-white to-gray-100',
    
    // Card backgrounds
    cardBg: 'bg-white/95',
    cardBorder: 'border-gray-300/70',
    
    // Header
    headerBg: 'from-gray-100/50 to-gray-200/50',
    
    // Input areas
    inputBg: 'bg-gray-100/80',
    inputBorder: 'border-gray-400',
    inputFocus: 'focus:border-orange-500',
    inputText: 'text-gray-900',
    inputPlaceholder: 'placeholder-gray-500',
    
    // Buttons
    primaryBtn: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    secondaryBtn: 'bg-gray-200/80 hover:bg-gray-300/80',
    
    // Messages
    userBubble: 'from-orange-500 to-orange-600',
    botBubble: 'from-gray-200 to-gray-300',
    errorBubble: 'from-red-500 to-red-600',
    
    // Text colors
    primaryText: 'text-gray-900',
    secondaryText: 'text-gray-700',
    mutedText: 'text-gray-500',
    linkText: 'text-blue-600 hover:text-blue-700',
    
    // Code blocks
    codeBg: 'rgb(253, 232, 165)', // Keep cream color for readability
    codeText: 'text-gray-900',
    inlineCodeBg: 'bg-gray-200/70',
    inlineCodeText: 'text-orange-600',
    
    // Avatars
    avatarRing: 'ring-orange-500/50',
    avatarFallback: 'bg-orange-500/30 text-orange-700',
    botAvatarRing: 'ring-blue-500/50',
    botAvatarFallback: 'bg-blue-500/30 text-blue-700',
    
    // Status indicators
    onlineStatus: 'bg-green-500',
    offlineStatus: 'bg-gray-400',
    
    // Gradients for chat area
    chatGradient: 'from-gray-100/20 to-white/20'
  }
};

export type ThemeColors = typeof themes.dark;