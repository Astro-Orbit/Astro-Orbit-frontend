'use client';

import { useOrganizations } from '@/hooks/use-orgs';
import { useRepos } from '@/hooks/use-repos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { GitBranch } from 'lucide-react';

export default function RepositoriesPage() {
  const { data: orgs } = useOrganizations();
  const activeOrg = orgs?.[0];
  const { data: repos, isLoading } = useRepos(activeOrg?.id);

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
        <h2 className="text-2xl font-bold">Repositories</h2>
        <p className="text-muted-foreground text-sm">Linked git repositories</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos?.map((repo) => (
          <Card key={repo.id} className="hover:bg-accent/50 transition-colors">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <CardTitle className="text-lg">{repo.name}</CardTitle>
              <GitBranch className="text-muted-foreground mt-1 h-5 w-5" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3 text-sm">{repo.url}</p>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">{repo.provider}</Badge>
                <Badge variant="outline">{repo.defaultBranch}</Badge>
                {repo.isPrivate && <Badge>Private</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
        {!repos?.length && (
          <Card className="col-span-full">
            <CardContent className="text-muted-foreground p-8 text-center">
              No repositories linked yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
