export interface User {
  id: string;
  displayName: string | null;
  walletAddress: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  role: 'owner' | 'admin' | 'developer' | 'viewer';
  memberCount: number;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  publicKey: string;
  expiresAt: string;
  deviceType: string | null;
  deviceName: string | null;
}
