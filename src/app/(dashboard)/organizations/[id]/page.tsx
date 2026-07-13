'use client';

import { useParams } from 'next/navigation';
import { useOrganization } from '@/hooks/use-orgs';
import { useProjects } from '@/hooks/use-projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, FolderKanban, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function OrganizationDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: org, isLoading: orgLoading } = useOrganization(params.id);
  const { data: projects, isLoading: projectsLoading } = useProjects(params.id);

  if (orgLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!org) return <p className="text-muted-foreground">Organization not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Building2 className="text-primary h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{org.name}</h2>
              <Badge variant="outline" className="capitalize">
                {org.role}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">{org.description ?? 'No description'}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-2xl font-bold">{org.memberCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              <span className="text-2xl font-bold">{projects?.length ?? 0}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Role</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold capitalize">{org.role}</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Link href={ROUTES.PROJECTS}>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      {projectsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : projects?.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.id} href={ROUTES.PROJECT(project.id)}>
              <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-muted-foreground text-sm">{project.network}</p>
                  </div>
                  <ArrowRight className="text-muted-foreground h-4 w-4" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-muted-foreground p-8 text-center">
            No projects yet. Create your first project.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
