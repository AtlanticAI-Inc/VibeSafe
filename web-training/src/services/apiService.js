import { API_CONFIG } from '../config/api';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get authentication token
  getToken() {
    return this.token || localStorage.getItem('token');
  }

  // Get headers with authentication
  getHeaders(customHeaders = {}) {
    const headers = {
      ...API_CONFIG.HEADERS,
      ...customHeaders
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: this.getHeaders(options.headers),
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      
      // Handle authentication errors
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        this.setToken(null);
        window.location.href = '/login';
        return;
      }
      
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.get(API_CONFIG.ENDPOINTS.HEALTH);
      return response;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    try {
      const response = await this.post(API_CONFIG.ENDPOINTS.LOGIN, { email, password });
      if (response.token) {
        this.setToken(response.token);
      }
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await this.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
      if (response.token) {
        this.setToken(response.token);
      }
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.setToken(null);
    }
  }

  // Module methods
  async getModules() {
    try {
      return await this.get(API_CONFIG.ENDPOINTS.MODULES);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
      throw error;
    }
  }

  async getModule(id) {
    try {
      return await this.get(API_CONFIG.ENDPOINTS.MODULE_BY_ID(id));
    } catch (error) {
      console.error(`Failed to fetch module ${id}:`, error);
      throw error;
    }
  }

  // Progress methods
  async getUserProgress(userId) {
    try {
      return await this.get(API_CONFIG.ENDPOINTS.USER_PROGRESS(userId));
    } catch (error) {
      console.error(`Failed to fetch progress for user ${userId}:`, error);
      throw error;
    }
  }

  async updateProgress(progressData) {
    try {
      return await this.post(API_CONFIG.ENDPOINTS.PROGRESS, progressData);
    } catch (error) {
      console.error('Failed to update progress:', error);
      throw error;
    }
  }

  // User methods
  async getUserProfile() {
    try {
      return await this.get(API_CONFIG.ENDPOINTS.PROFILE);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
