'use client';

import { useOrganizations } from '@/hooks/use-orgs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Building2, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function OrganizationsPage() {
  const { data: orgs, isLoading } = useOrganizations();

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
          <h2 className="text-2xl font-bold">Organizations</h2>
          <p className="text-muted-foreground text-sm">Manage your teams and projects</p>
        </div>
        <Link href={ROUTES.ORGANIZATION_NEW}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Organization
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orgs?.map((org) => (
          <Link key={org.id} href={ROUTES.ORGANIZATION(org.id)}>
            <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{org.name}</CardTitle>
                <Building2 className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                  {org.description ?? 'No description'}
                </p>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {org.memberCount} members
                  </span>
                  <span className="capitalize">{org.role}</span>
                  <ArrowRight className="ml-auto h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
