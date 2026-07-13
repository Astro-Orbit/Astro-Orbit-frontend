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

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  description: string | null;
  network: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  projectId: string;
  name: string;
  contractType: string;
  contractId: string;
  version: string;
  status: 'draft' | 'deployed' | 'verified' | 'archived';
  network: string;
  wasmHash: string | null;
  sourceHash: string | null;
  verified: boolean;
  createdAt: string;
}

export interface Deployment {
  id: string;
  projectId: string;
  contractName: string;
  environment: string;
  status: string;
  version: string | null;
  network: string;
  contractId: string | null;
  logs: string | null;
  createdAt: string;
}

export interface Repository {
  id: string;
  projectId: string;
  name: string;
  url: string;
  provider: string;
  defaultBranch: string;
  branch: string;
  isActive: boolean;
  isPrivate: boolean;
  lastSyncedAt: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalContracts: number;
  totalDeployments: number;
  successfulDeployments: number;
  activeDeployments: number;
  totalMembers: number;
  activities24h: number;
}

export interface ActivityItem {
  id: string;
  organizationId: string;
  actorId: string;
  type: string;
  message: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, unknown>;
  timestamp: string;
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
