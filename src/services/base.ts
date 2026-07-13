import { apiClient } from '@/lib/api-client';

export abstract class BaseService {
  protected static async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const response = await apiClient.get<{ data: T }>(path, { params });
    return response.data.data;
  }

  protected static async post<T>(path: string, body?: unknown): Promise<T> {
    const response = await apiClient.post<{ data: T }>(path, body);
    return response.data.data;
  }

  protected static async put<T>(path: string, body?: unknown): Promise<T> {
    const response = await apiClient.put<{ data: T }>(path, body);
    return response.data.data;
  }

  protected static async patch<T>(path: string, body?: unknown): Promise<T> {
    const response = await apiClient.patch<{ data: T }>(path, body);
    return response.data.data;
  }

  protected static async delete<T>(path: string): Promise<T> {
    const response = await apiClient.delete<{ data: T }>(path);
    return response.data.data;
  }
}
