'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { Plus, Rocket, FolderKanban, FileCode, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const stats = [
  { label: 'Projects', value: '12', icon: FolderKanban, color: 'text-blue-500' },
  { label: 'Contracts', value: '8', icon: FileCode, color: 'text-emerald-500' },
  { label: 'Deployments', value: '23', icon: Rocket, color: 'text-violet-500' },
  { label: 'Security Score', value: 'A (92)', icon: Shield, color: 'text-amber-500' },
];

const recentActivity = [
  { action: 'Deployed soroban-contract-v2 to testnet', time: '2 hours ago' },
  { action: 'Updated grant-management permissions', time: '5 hours ago' },
  { action: 'Added API key ao_prod_8f3a... to project', time: '1 day ago' },
  { action: 'New member accepted invitation: alice@stellar.org', time: '2 days ago' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
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
          <h2 className="text-2xl font-bold">
            Welcome back, {user?.displayName || 'Astronaut'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Button render={<Link href="#" />}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
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
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" render={<Link href="#" />}>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
            <Button variant="outline" className="w-full justify-start" render={<Link href="#" />}>
              <FileCode className="mr-2 h-4 w-4" /> New Contract
            </Button>
            <Button variant="outline" className="w-full justify-start" render={<Link href="#" />}>
              <Rocket className="mr-2 h-4 w-4" /> View Deployments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
