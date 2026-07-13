'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { useAnalyticsSummary, useActivityFeed } from '@/hooks/use-analytics';
import { useOrganizations } from '@/hooks/use-orgs';
import { Plus, Rocket, FolderKanban, FileCode, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ROUTES } from '@/constants';

const iconMap = {
  deployment: Rocket,
  contract: FileCode,
  project: FolderKanban,
} as const;

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: orgs } = useOrganizations();
  const activeOrgId = orgs?.[0]?.id;
  const { data: stats, isLoading: statsLoading } = useAnalyticsSummary(activeOrgId);
  const { data: activity, isLoading: activityLoading } = useActivityFeed();

  const statCards = stats
    ? [
        { label: 'Projects', value: stats.totalProjects, icon: FolderKanban },
        { label: 'Contracts', value: stats.totalContracts, icon: FileCode },
        { label: 'Deployments', value: stats.totalDeployments, icon: Rocket },
        { label: 'Successful Deployments', value: stats.successfulDeployments, icon: BarChart3 },
      ]
    : [];

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {user?.displayName || 'Astronaut'}</h2>
          <p className="text-muted-foreground text-sm">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Link href={ROUTES.PROJECTS}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : activity?.length ? (
              <div className="space-y-4">
                {activity.map((item) => {
                  const Icon = iconMap[item.type as keyof typeof iconMap] ?? FolderKanban;
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-1.5">
                        <Icon className="text-primary h-3 w-3" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{item.message}</p>
                        <p className="text-muted-foreground text-xs">
                          {format(new Date(item.timestamp), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground py-8 text-center text-sm">No recent activity</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href={ROUTES.PROJECTS}>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </Link>
            <Link href={ROUTES.CONTRACTS}>
              <Button variant="outline" className="w-full justify-start">
                <FileCode className="mr-2 h-4 w-4" /> New Contract
              </Button>
            </Link>
            <Link href={ROUTES.DEPLOYMENTS}>
              <Button variant="outline" className="w-full justify-start">
                <Rocket className="mr-2 h-4 w-4" /> View Deployments
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
