'use client';

import { useParams } from 'next/navigation';
import { useContract } from '@/hooks/use-contracts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { FileCode, Globe, Hash, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: contract, isLoading } = useContract(params.id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!contract) return <p className="text-muted-foreground">Contract not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={ROUTES.CONTRACTS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="bg-primary/10 rounded-lg p-2">
          <FileCode className="text-primary h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{contract.name}</h2>
            <Badge variant="secondary">v{contract.version}</Badge>
            <Badge variant={contract.status === 'verified' ? 'default' : 'outline'}>
              {contract.status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{contract.contractType}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">Contract ID</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 font-mono text-sm">
            <Hash className="text-muted-foreground h-4 w-4" />
            {contract.contractId}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">Network</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-sm">
            <Globe className="text-muted-foreground h-4 w-4" />
            {contract.network}
          </CardContent>
        </Card>
      </div>

      {contract.sourceHash && (
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">Source Hash</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm">{contract.sourceHash}</CardContent>
        </Card>
      )}
    </div>
  );
}
