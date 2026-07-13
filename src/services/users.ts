import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { User } from '@/types';

export interface UpdateUserRequest {
  displayName?: string;
  avatarUrl?: string;
  email?: string;
}

export class UserService extends BaseService {
  static async getMe(): Promise<User> {
    return this.get<User>(API_ENDPOINTS.USERS.ME);
  }

  static async getById(id: string): Promise<User> {
    return this.get<User>(API_ENDPOINTS.USERS.BY_ID(id));
  }

  static async update(data: UpdateUserRequest): Promise<User> {
    return this.patch<User>(API_ENDPOINTS.USERS.ME, data);
  }
}
