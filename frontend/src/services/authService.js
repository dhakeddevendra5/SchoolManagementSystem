import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { handleApiError } from '../utils/helpers';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL
});

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    throw handleApiError(error);
  }
);

const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

const logout = async () => {
  await api.post('/api/auth/logout');
};

const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

// Export both the API instance and the auth functions
export {
  api as default,
  login,
  logout,
  register
};

