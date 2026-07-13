export const APP_NAME = 'Astro Orbit';
export const APP_TAGLINE = 'Build, deploy, and manage Soroban smart contracts';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SETTINGS: '/settings/profile',
  SETTINGS_APPEARANCE: '/settings/appearance',
  SETTINGS_API_KEYS: '/settings/api-keys',
  PROFILE: '/profile',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ao-auth-token',
  REFRESH_TOKEN: 'ao-refresh-token',
  THEME: 'ao-theme',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    CHALLENGE: '/auth/challenge',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    ME: '/users/me',
    BY_ID: (id: string) => `/users/${id}`,
  },
  ORGS: {
    BASE: '/organizations',
    BY_ID: (id: string) => `/organizations/${id}`,
    INVITE: (id: string) => `/organizations/${id}/invite`,
  },
  API_KEYS: '/api-keys',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
