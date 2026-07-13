import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { Project } from '@/types';

export interface CreateProjectRequest {
  name: string;
  slug: string;
  description?: string;
  network?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export class ProjectService extends BaseService {
  static async create(orgId: string, data: CreateProjectRequest): Promise<Project> {
    return this.post<Project>(API_ENDPOINTS.PROJECTS.BY_ORG(orgId), data);
  }

  static async list(orgId: string): Promise<Project[]> {
    return this.get<Project[]>(API_ENDPOINTS.PROJECTS.BY_ORG(orgId));
  }

  static async getById(id: string): Promise<Project> {
    return this.get<Project>(API_ENDPOINTS.PROJECTS.BY_ID(id));
  }

  static async update(id: string, data: UpdateProjectRequest): Promise<Project> {
    return this.patch<Project>(API_ENDPOINTS.PROJECTS.BY_ID(id), data);
  }

  static async remove(id: string): Promise<void> {
    await this.delete(API_ENDPOINTS.PROJECTS.BY_ID(id));
  }
}
