import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/apiService';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
const AuthActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null
      };
    
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          apiService.setToken(token);
          const response = await apiService.getUserProfile();
          
          dispatch({
            type: AuthActionTypes.SET_USER,
            payload: {
              user: response.data,
              token
            }
          });
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          apiService.setToken(null);
          dispatch({ type: AuthActionTypes.LOGOUT });
        }
      } else {
        dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      
      const response = await apiService.login(email, password);
      
      dispatch({
        type: AuthActionTypes.SET_USER,
        payload: {
          user: response.user,
          token: response.token
        }
      });
      
      return { success: true, user: response.user };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage
      });
      
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      
      const response = await apiService.register(userData);
      
      dispatch({
        type: AuthActionTypes.SET_USER,
        payload: {
          user: response.user,
          token: response.token
        }
      });
      
      return { success: true, user: response.user };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage
      });
      
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      apiService.setToken(null);
      dispatch({ type: AuthActionTypes.LOGOUT });
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      
      const response = await apiService.put('/users/me', profileData);
      
      dispatch({
        type: AuthActionTypes.SET_USER,
        payload: {
          user: response.data,
          token: state.token
        }
      });
      
      return { success: true, user: response.data };
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed';
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage
      });
      
      return { success: false, error: errorMessage };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiService.post('/auth/refresh', { refreshToken });
      
      apiService.setToken(response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      return response.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(state.user?.role);
  };

  const value = {
    // State
    ...state,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    clearError,
    refreshToken,
    
    // Utilities
    hasRole,
    hasAnyRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
