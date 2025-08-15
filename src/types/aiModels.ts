export enum AIModel {
  GEMINI_2_FLASH = 'gemini-2.0-flash',
  GPT_4O_MINI = 'gpt-4o-mini',
  DEEPSEEK = 'deepseek',
  CLAUDE = 'claude',
  GROQ_LLAMA = 'groq-llama'
}

export interface AIModelOption {
  value: AIModel;
  label: string;
  description?: string;
}

export const AI_MODEL_OPTIONS: AIModelOption[] = [
  {
    value: AIModel.GEMINI_2_FLASH,
    label: 'Gemini 2.0 Flash',
    // description: 'Google\'s latest fast model'
  },
  {
    value: AIModel.GPT_4O_MINI,
    label: 'GPT-4o Mini',
    // description: 'OpenAI\'s efficient model'
  },
  {
    value: AIModel.DEEPSEEK,
    label: 'DeepSeek',
    // description: 'DeepSeek AI model'
  },
  // {
  //   value: AIModel.CLAUDE,
  //   label: 'Claude',
  //   // description: 'Anthropic\'s Claude model'
  // },
  {
    value: AIModel.GROQ_LLAMA,
    label: 'Groq Llama',
    // description: 'Fast Llama on Groq'
  }
];