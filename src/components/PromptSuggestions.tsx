import { Card } from "@/components/ui/card";

interface PromptSuggestionsProps {
  onSendPrompt: (prompt: string) => void;
}

const PROMPT_SUGGESTIONS = [
  "Explain this code in simple terms",
  "Help me debug this error",
  "Suggest best practices for this",
  "Create a test case for this function",
  "Optimize this code for performance"
];

export const PromptSuggestions = ({ onSendPrompt }: PromptSuggestionsProps) => {
  return (
    <Card className="w-full h-full bg-gray-900/95 border-gray-700/50 backdrop-blur-xl overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden xl:block p-4 border-b border-gray-700/50">
        <h3 className="text-white font-semibold text-sm">Prompt Suggestions</h3>
      </div>
      
      {/* Desktop Layout - Vertical */}
      <div className="hidden xl:block p-4 space-y-3 overflow-y-auto">
        {PROMPT_SUGGESTIONS.map((prompt, index) => (
          <div
            key={index}
            onClick={() => onSendPrompt(prompt)}
            className="bg-gradient-to-br from-gray-700 to-gray-800 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:from-gray-600 hover:to-gray-700 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <p className="text-white text-xs leading-relaxed group-hover:text-orange-100">
              {prompt}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Layout - Horizontal */}
      <div className="xl:hidden flex h-full overflow-x-auto gap-2 p-2">
        {PROMPT_SUGGESTIONS.map((prompt, index) => (
          <div
            key={index}
            onClick={() => onSendPrompt(prompt)}
            className="flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-800 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:from-gray-600 hover:to-gray-700 hover:scale-[1.02] active:scale-[0.98] group min-w-fit"
          >
            <p className="text-white text-xs leading-relaxed group-hover:text-orange-100 whitespace-nowrap">
              {prompt}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};