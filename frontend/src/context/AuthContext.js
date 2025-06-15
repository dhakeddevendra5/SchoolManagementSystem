import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for token on initial load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      // Clear corrupted data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials, navigate) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await apiLogin(credentials);
      console.log('Login response:', response);
      
      // Handle the response structure from your Spring Boot backend
      // JwtResponse: { token, id, email, firstName, lastName, role }
      if (response && response.token) {
        const { token, id, email, firstName, lastName, role } = response;
        
        const userData = {
          id,
          email,
          firstName,
          lastName,
          role
        };
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setToken(token);
        
        console.log('Login successful, navigating to dashboard');
        
        // Navigate to dashboard
        if (navigate) {
          navigate('/dashboard');
        }
        
        return true;
      } else {
        console.error('Invalid response structure:', response);
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      
      // Clear any existing data on login failure
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
      
      return false;
    }
  };

  const logout = (navigate) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
      
      // Call API logout if available
      if (apiLogout) {
        apiLogout();
      }
      
      if (navigate) {
        navigate('/');
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};