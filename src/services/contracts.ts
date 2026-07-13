import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { Contract } from '@/types';

export interface CreateContractRequest {
  name: string;
  contractId: string;
  wasmHash?: string;
  sourceLanguage?: string;
}

export interface UpdateContractRequest {
  name?: string;
}

export interface ContractVersion {
  id: string;
  contractId: string;
  version: string;
  wasmHash: string;
  createdAt: string;
}

export interface CreateVersionRequest {
  wasmHash: string;
  version: string;
}

export class ContractService extends BaseService {
  static async create(projectId: string, data: CreateContractRequest): Promise<Contract> {
    return this.post<Contract>(API_ENDPOINTS.CONTRACTS.BY_PROJECT(projectId), data);
  }

  static async list(projectId: string): Promise<Contract[]> {
    return this.get<Contract[]>(API_ENDPOINTS.CONTRACTS.BY_PROJECT(projectId));
  }

  static async getById(id: string): Promise<Contract> {
    return this.get<Contract>(API_ENDPOINTS.CONTRACTS.BY_ID(id));
  }

  static async update(id: string, data: UpdateContractRequest): Promise<Contract> {
    return this.patch<Contract>(API_ENDPOINTS.CONTRACTS.BY_ID(id), data);
  }

  static async createVersion(id: string, data: CreateVersionRequest): Promise<ContractVersion> {
    return this.post<ContractVersion>(API_ENDPOINTS.CONTRACTS.VERSIONS(id), data);
  }

  static async listVersions(id: string): Promise<ContractVersion[]> {
    return this.get<ContractVersion[]>(API_ENDPOINTS.CONTRACTS.VERSIONS(id));
  }
}
