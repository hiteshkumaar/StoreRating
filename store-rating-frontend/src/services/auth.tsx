import { createContext, useContext, useState, useEffect } from 'react';
import { login } from './api';

interface User {
  userId: number;
  role: 'user' | 'admin' | 'store_owner';
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload from localStorage:', payload);
        if ((payload.userId || payload.sub) && payload.role) {
          setUser({ userId: payload.userId || payload.sub, role: payload.role });
        } else {
          console.error('Invalid token payload, clearing localStorage');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token');
      }
    } else {
      console.log('No token found in localStorage');
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      console.log('Login API response:', response);
      const token = response.data.token || response.data.accessToken;
      if (!token) {
        throw new Error('No token received from backend');
      }
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('SignIn payload:', payload);
      if ((payload.userId || payload.sub) && payload.role) {
        setUser({ userId: payload.userId || payload.sub, role: payload.role });
      } else {
        throw new Error('Invalid token payload');
      }
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('token');
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
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