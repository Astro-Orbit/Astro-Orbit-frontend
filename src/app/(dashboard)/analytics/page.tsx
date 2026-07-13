'use client';

import { useAnalyticsSummary, useActivityFeed } from '@/hooks/use-analytics';
import { useOrganizations } from '@/hooks/use-orgs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, FolderKanban, FileCode, Rocket, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  const { data: orgs } = useOrganizations();
  const activeOrgId = orgs?.[0]?.id;
  const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary(activeOrgId);
  const { data: activity, isLoading: activityLoading } = useActivityFeed();

  const cards = summary
    ? [
        { label: 'Total Projects', value: summary.totalProjects, icon: FolderKanban },
        { label: 'Total Contracts', value: summary.totalContracts, icon: FileCode },
        { label: 'Total Deployments', value: summary.totalDeployments, icon: Rocket },
        { label: 'Successful Deployments', value: summary.successfulDeployments, icon: BarChart3 },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-muted-foreground text-sm">Overview of your Stellar ecosystem</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))
          : cards.map((card) => (
              <Card key={card.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-muted-foreground text-sm font-medium">
                    {card.label}
                  </CardTitle>
                  <card.icon className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" /> Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : activity?.length ? (
            <div className="space-y-3">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b pb-3 text-sm last:border-0"
                >
                  <div className="bg-primary/10 rounded-full p-1.5">
                    {item.type === 'deployment' ? (
                      <Rocket className="text-primary h-3 w-3" />
                    ) : item.type === 'contract' ? (
                      <FileCode className="text-primary h-3 w-3" />
                    ) : (
                      <FolderKanban className="text-primary h-3 w-3" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.message}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-muted-foreground text-xs capitalize">{item.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground py-8 text-center text-sm">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
