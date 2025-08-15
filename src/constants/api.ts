const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/chat`,
  HEALTH: `${API_BASE_URL}/api/health`,
} as const;

export { API_BASE_URL };