import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const defaultContext: AppContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  loading: false,
  sidebarOpen: true,
  toggleSidebar: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful login with admin user
        if (email === 'admin@hospital.com' && password === 'password') {
          setUser({
            id: 1,
            name: 'Admin User',
            email: email,
            role: 'admin',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          });
          setLoading(false);
          resolve(true);
        } else {
          setLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    sidebarOpen,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};