'use client';

import { useOrganizations } from '@/hooks/use-orgs';
import { useDeployments } from '@/hooks/use-deployments';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Rocket, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-500',
  building: 'bg-blue-500',
  deploying: 'bg-purple-500',
  completed: 'bg-green-500',
  failed: 'bg-red-500',
  cancelled: 'bg-gray-500',
};

export default function DeploymentsPage() {
  const { data: orgs } = useOrganizations();
  const activeOrg = orgs?.[0];
  const { data: deployments, isLoading } = useDeployments(activeOrg?.id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Deployments</h2>
        <p className="text-muted-foreground text-sm">Track contract deployments</p>
      </div>

      <div className="space-y-3">
        {deployments?.map((deployment) => (
          <Link key={deployment.id} href={ROUTES.DEPLOYMENT(deployment.id)}>
            <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Rocket className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="font-medium">{deployment.contractName}</p>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3" />
                      {new Date(deployment.createdAt).toLocaleDateString()}
                      <span>v{deployment.version}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${statusColor[deployment.status] ?? 'bg-gray-500'} text-white`}
                  >
                    {deployment.status}
                  </Badge>
                  <ArrowRight className="text-muted-foreground h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {!deployments?.length && (
          <Card>
            <CardContent className="text-muted-foreground p-8 text-center">
              No deployments yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
