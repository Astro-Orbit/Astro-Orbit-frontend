'use client';

import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/use-projects';
import { useContracts } from '@/hooks/use-contracts';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, Globe, FileCode, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: project, isLoading: projectLoading } = useProject(params.id);
  const { data: contracts, isLoading: contractsLoading } = useContracts(params.id);

  if (projectLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!project) return <p className="text-muted-foreground">Project not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-lg p-2">
          <FolderKanban className="text-primary h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <Badge variant="secondary">{project.network}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">{project.description ?? 'No description'}</p>
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Globe className="h-4 w-4" />
        <span>
          Network: <Badge variant="outline">{project.network}</Badge>
        </span>
        <span className="mx-2">|</span>
        <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <FileCode className="h-5 w-5" /> Contracts
        </h3>
        {contractsLoading ? (
          <Skeleton className="h-24 rounded-xl" />
        ) : contracts?.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {contracts.map((contract) => (
              <Link key={contract.id} href={ROUTES.CONTRACT(contract.id)}>
                <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{contract.name}</p>
                      <p className="text-muted-foreground text-sm">{contract.contractType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{contract.version}</Badge>
                      <ArrowRight className="text-muted-foreground h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-muted-foreground p-8 text-center">
              No contracts deployed yet.
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Rocket className="h-5 w-5" /> Recent Deployments
        </h3>
        <Card>
          <CardContent className="text-muted-foreground p-8 text-center">
            No deployments yet.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
