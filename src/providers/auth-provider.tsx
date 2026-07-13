'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/constants';
import type { User } from '@/types';

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitialAuth() {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null as User | null };
  }
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const storedUser = localStorage.getItem('ao-user');
  if (token && storedUser) {
    try {
      return { isAuthenticated: true, user: JSON.parse(storedUser) as User };
    } catch {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem('ao-user');
    }
  }
  return { isAuthenticated: false, user: null as User | null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(getInitialAuth);
  const [isAuthenticated, setIsAuthenticated] = useState(initial.isAuthenticated);
  const [user, setUser] = useState<User | null>(initial.user);

  const login = (token: string, refreshToken: string, userData: User) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem('ao-user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem('ao-user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading: false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
