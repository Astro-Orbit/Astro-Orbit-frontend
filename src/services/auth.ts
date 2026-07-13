import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';

export interface ChallengeRequest {
  publicKey: string;
}

export interface ChallengeResponse {
  challenge: string;
  expiresAt: string;
}

export interface LoginRequest {
  publicKey: string;
  challenge: string;
  signature: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    displayName: string | null;
    walletAddress: string;
    email: string | null;
  };
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  token: string;
  refreshToken: string;
}

export class AuthService extends BaseService {
  static async challenge(data: ChallengeRequest): Promise<ChallengeResponse> {
    return this.post<ChallengeResponse>(API_ENDPOINTS.AUTH.CHALLENGE, data);
  }

  static async login(data: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
  }

  static async refresh(data: RefreshRequest): Promise<RefreshResponse> {
    return this.post<RefreshResponse>(API_ENDPOINTS.AUTH.REFRESH, data);
  }

  static async logout(): Promise<void> {
    return this.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
  }
}
