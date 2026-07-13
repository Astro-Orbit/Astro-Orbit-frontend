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
  ORGANIZATIONS: '/organizations',
  ORGANIZATION_NEW: '/organizations/new',
  ORGANIZATION: (id: string) => `/organizations/${id}`,
  PROJECTS: '/projects',
  PROJECT: (id: string) => `/projects/${id}`,
  CONTRACTS: '/contracts',
  CONTRACT: (id: string) => `/contracts/${id}`,
  DEPLOYMENTS: '/deployments',
  DEPLOYMENT: (id: string) => `/deployments/${id}`,
  ANALYTICS: '/analytics',
  REPOSITORIES: '/repositories',
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
    MEMBERS: (id: string) => `/organizations/${id}/members`,
  },
  PROJECTS: {
    BY_ORG: (orgId: string) => `/orgs/${orgId}/projects`,
    BY_ID: (id: string) => `/projects/${id}`,
  },
  CONTRACTS: {
    BY_PROJECT: (projectId: string) => `/projects/${projectId}/contracts`,
    BY_ID: (id: string) => `/contracts/${id}`,
    VERSIONS: (id: string) => `/contracts/${id}/versions`,
  },
  DEPLOYMENTS: {
    BY_PROJECT: (projectId: string) => `/projects/${projectId}/deployments`,
    BY_ID: (id: string) => `/deployments/${id}`,
    ROLLBACK: (id: string) => `/deployments/${id}/rollback`,
    CANCEL: (id: string) => `/deployments/${id}/cancel`,
    LOGS: (id: string) => `/deployments/${id}/logs`,
  },
  REPOS: {
    BY_PROJECT: (projectId: string) => `/projects/${projectId}/repositories`,
    BY_ID: (id: string) => `/repositories/${id}`,
    SYNC: (id: string) => `/repositories/${id}/sync`,
  },
  ANALYTICS: {
    OVERVIEW: (orgId: string) => `/orgs/${orgId}/analytics/overview`,
    DASHBOARD_STATS: (orgId: string) => `/orgs/${orgId}/dashboard/stats`,
    ACTIVITY: '/dashboard/activity',
  },
  API_KEYS: '/api-keys',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
