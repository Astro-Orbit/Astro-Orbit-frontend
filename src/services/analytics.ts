import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { DashboardStats, ActivityItem } from '@/types';

export interface AnalyticsOverview {
  totalTransactions: number;
  totalContracts: number;
  totalDeployments: number;
  activeUsers24h: number;
  gasUsed24h: string;
}

export class AnalyticsService extends BaseService {
  static async overview(orgId: string): Promise<AnalyticsOverview> {
    return this.get<AnalyticsOverview>(API_ENDPOINTS.ANALYTICS.OVERVIEW(orgId));
  }

  static async dashboardStats(orgId: string): Promise<DashboardStats> {
    return this.get<DashboardStats>(API_ENDPOINTS.ANALYTICS.DASHBOARD_STATS(orgId));
  }

  static async activityFeed(limit?: number): Promise<ActivityItem[]> {
    const params: Record<string, string> = {};
    if (limit) params.limit = String(limit);
    return this.get<ActivityItem[]>(API_ENDPOINTS.ANALYTICS.ACTIVITY, params);
  }
}
