import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/env';
import { useAuthStore } from '@/stores/auth-store';
import type { ApiError } from '@/types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeError(error: AxiosError<{ error?: ApiError }>): ApiError {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  return {
    code: error.code || 'UNKNOWN_ERROR',
    message: error.message || 'An unexpected error occurred',
    status: error.response?.status || 500,
  };
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: 15_000,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ error?: ApiError }>) => {
      const config = error.config as InternalAxiosRequestConfig & { _retry?: number };
      if (!config) return Promise.reject(normalizeError(error));

      config._retry = (config._retry ?? 0) + 1;

      if (
        config._retry <= MAX_RETRIES &&
        error.response &&
        isRetryable(error.response.status)
      ) {
        await delay(RETRY_DELAY * config._retry);
        return client(config);
      }

      if (error.response?.status === 401 && config._retry === 1) {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (refreshToken) {
          try {
            const res = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
              refreshToken,
            });
            const { token, refreshToken: newRefresh } = res.data.data;
            useAuthStore.getState().setTokens(token, newRefresh);
            config.headers.Authorization = `Bearer ${token}`;
            return client(config);
          } catch {
            useAuthStore.getState().logout();
          }
        }
      }

      return Promise.reject(normalizeError(error));
    },
  );

  return client;
}

export const apiClient = createApiClient();
