'use client';

import { useQuery } from '@tanstack/react-query';
import { AnalyticsService } from '@/services/analytics';
import type { DashboardStats, ActivityItem } from '@/types';

export function useDashboardStats(orgId: string | undefined) {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats', orgId],
    queryFn: () => AnalyticsService.dashboardStats(orgId!),
    enabled: !!orgId,
    refetchInterval: 60_000,
  });
}

export const useAnalyticsSummary = useDashboardStats;

export function useActivityFeed(limit?: number) {
  return useQuery<ActivityItem[]>({
    queryKey: ['activity-feed', limit],
    queryFn: () => AnalyticsService.activityFeed(limit),
    refetchInterval: 30_000,
  });
}
