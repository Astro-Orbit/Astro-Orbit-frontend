import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { Organization } from '@/types';

export interface CreateOrgRequest {
  name: string;
  description?: string;
}

export class OrgService extends BaseService {
  static async create(data: CreateOrgRequest): Promise<Organization> {
    return this.post<Organization>(API_ENDPOINTS.ORGS.BASE, data);
  }

  static async list(): Promise<Organization[]> {
    return this.get<Organization[]>(API_ENDPOINTS.ORGS.BASE);
  }

  static async getById(id: string): Promise<Organization> {
    return this.get<Organization>(API_ENDPOINTS.ORGS.BY_ID(id));
  }
}
