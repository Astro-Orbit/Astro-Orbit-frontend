import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { Deployment } from '@/types';

export interface CreateDeploymentRequest {
  environment?: string;
  contractIds: string[];
  branch?: string;
  commitSha?: string;
  commitMessage?: string;
  version?: string;
}

export interface DeploymentLog {
  timestamp: string;
  level: string;
  message: string;
}

export class DeploymentService extends BaseService {
  static async create(projectId: string, data: CreateDeploymentRequest): Promise<Deployment> {
    return this.post<Deployment>(API_ENDPOINTS.DEPLOYMENTS.BY_PROJECT(projectId), data);
  }

  static async list(projectId: string): Promise<Deployment[]> {
    return this.get<Deployment[]>(API_ENDPOINTS.DEPLOYMENTS.BY_PROJECT(projectId));
  }

  static async getById(id: string): Promise<Deployment> {
    return this.get<Deployment>(API_ENDPOINTS.DEPLOYMENTS.BY_ID(id));
  }

  static async rollback(id: string): Promise<Deployment> {
    return this.post<Deployment>(API_ENDPOINTS.DEPLOYMENTS.ROLLBACK(id));
  }

  static async cancel(id: string): Promise<void> {
    return this.post<void>(API_ENDPOINTS.DEPLOYMENTS.CANCEL(id));
  }

  static async logs(id: string): Promise<DeploymentLog[]> {
    return this.get<DeploymentLog[]>(API_ENDPOINTS.DEPLOYMENTS.LOGS(id));
  }
}
