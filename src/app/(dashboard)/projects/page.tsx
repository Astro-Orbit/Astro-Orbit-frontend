'use client';

import { useOrganizations } from '@/hooks/use-orgs';
import { useProjects } from '@/hooks/use-projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderKanban, Plus, Globe, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ProjectsPage() {
  const { data: orgs } = useOrganizations();
  const activeOrg = orgs?.[0];
  const { data: projects, isLoading } = useProjects(activeOrg?.id);

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground text-sm">All projects across your organizations</p>
        </div>
        <Link href={ROUTES.PROJECTS}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Link key={project.id} href={ROUTES.PROJECT(project.id)}>
            <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <FolderKanban className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                  {project.description ?? 'No description'}
                </p>
                <div className="flex items-center gap-2">
                  <Globe className="text-muted-foreground h-4 w-4" />
                  <Badge variant="secondary" className="text-xs">
                    {project.network}
                  </Badge>
                  <ArrowRight className="text-muted-foreground ml-auto h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
