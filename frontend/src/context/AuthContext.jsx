import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Add token to default headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get('/users/profile');
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    const { token, ...userData } = response.data;
    
    // Make sure profileImage is included in userData
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    
    return userData;
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/users/register', {
        name,
        email,
        password
      });
      
      const { token, ...userData } = response.data;
      
      // Save token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, setUser }}>
      {!loading && children}
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