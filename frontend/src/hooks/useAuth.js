import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin, logout as apiLogout } from '../services/authService';

const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isAuthenticated, user, login: contextLogin, logout: contextLogout } = context;

  const login = async (credentials) => {
    try {
      const userData = await apiLogin(credentials);
      contextLogin(userData);
      enqueueSnackbar('Login successful', { variant: 'success' });
      navigate('/dashboard');
      return true;
    } catch (error) {
      enqueueSnackbar('Login failed', { variant: 'error' });
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      contextLogout();
      enqueueSnackbar('Logged out successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Logout failed', { variant: 'error' });
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout
  };
};

export default useAuth;