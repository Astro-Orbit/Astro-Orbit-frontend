'use client';

import { useOrganizations } from '@/hooks/use-orgs';
import { useContracts } from '@/hooks/use-contracts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { FileCode, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function ContractsPage() {
  const { data: orgs } = useOrganizations();
  const activeOrg = orgs?.[0];
  const { data: contracts, isLoading } = useContracts(activeOrg?.id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contracts</h2>
        <p className="text-muted-foreground text-sm">Smart contracts across all projects</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contracts?.map((contract) => (
          <Link key={contract.id} href={ROUTES.CONTRACT(contract.id)}>
            <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{contract.name}</CardTitle>
                <FileCode className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">{contract.contractType}</p>
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="secondary">v{contract.version}</Badge>
                  <Badge variant={contract.status === 'verified' ? 'default' : 'outline'}>
                    {contract.status}
                  </Badge>
                  <ArrowRight className="text-muted-foreground h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
