'use client';

import { useParams } from 'next/navigation';
import { useDeployment } from '@/hooks/use-deployments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Rocket, Clock, Hash, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export default function DeploymentDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: deployment, isLoading } = useDeployment(params.id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!deployment) return <p className="text-muted-foreground">Deployment not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={ROUTES.DEPLOYMENTS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="bg-primary/10 rounded-lg p-2">
          <Rocket className="text-primary h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{deployment.contractName}</h2>
            <Badge variant="secondary">v{deployment.version}</Badge>
            <Badge className={`${statusColor[deployment.status] ?? 'bg-gray-500'} text-white`}>
              {deployment.status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            <Clock className="mr-1 inline h-3 w-3" />
            {new Date(deployment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">Network</CardTitle>
          </CardHeader>
          <CardContent>{deployment.network}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">Environment</CardTitle>
          </CardHeader>
          <CardContent className="capitalize">{deployment.environment}</CardContent>
        </Card>
      </div>

      {deployment.contractId && (
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Deployed Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 font-mono text-sm">
            <Hash className="text-muted-foreground h-4 w-4" />
            {deployment.contractId}
          </CardContent>
        </Card>
      )}

      {deployment.logs && (
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted max-h-64 overflow-x-auto rounded-lg p-4 text-xs">
              {deployment.logs}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
