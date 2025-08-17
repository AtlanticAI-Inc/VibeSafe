// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // User endpoints
  PROFILE: '/users/profile',
  USERS: '/users',
  
  // Module endpoints
  MODULES: '/modules',
  MODULE_BY_ID: (id) => `/modules/${id}`,
  
  // Progress endpoints
  PROGRESS: '/progress',
  USER_PROGRESS: (userId) => `/progress/${userId}`,
  
  // Health check
  HEALTH: '/health'
};

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// API Configuration object
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: API_ENDPOINTS,
  HEADERS: DEFAULT_HEADERS,
  TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
