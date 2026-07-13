import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { Repository } from '@/types';

export interface CreateRepositoryRequest {
  name: string;
  url: string;
  provider: string;
  branch?: string;
}

export interface UpdateRepositoryRequest {
  name?: string;
  branch?: string;
  isActive?: boolean;
}

export class RepoService extends BaseService {
  static async create(projectId: string, data: CreateRepositoryRequest): Promise<Repository> {
    return this.post<Repository>(API_ENDPOINTS.REPOS.BY_PROJECT(projectId), data);
  }

  static async list(projectId: string): Promise<Repository[]> {
    return this.get<Repository[]>(API_ENDPOINTS.REPOS.BY_PROJECT(projectId));
  }

  static async getById(id: string): Promise<Repository> {
    return this.get<Repository>(API_ENDPOINTS.REPOS.BY_ID(id));
  }

  static async update(id: string, data: UpdateRepositoryRequest): Promise<Repository> {
    return this.patch<Repository>(API_ENDPOINTS.REPOS.BY_ID(id), data);
  }

  static async remove(id: string): Promise<void> {
    await this.delete(API_ENDPOINTS.REPOS.BY_ID(id));
  }

  static async sync(id: string): Promise<Repository> {
    return this.post<Repository>(API_ENDPOINTS.REPOS.SYNC(id));
  }
}
