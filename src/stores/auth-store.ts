import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  setTokens: (token: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      login: (token, refreshToken, user) =>
        set({ token, refreshToken, user, isAuthenticated: true }),
      logout: () =>
        set({ token: null, refreshToken: null, user: null, isAuthenticated: false }),
      setTokens: (token, refreshToken) => set({ token, refreshToken }),
    }),
    {
      name: 'ao-auth',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
