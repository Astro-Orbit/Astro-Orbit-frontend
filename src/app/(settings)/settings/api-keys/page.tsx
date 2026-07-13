'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Key, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const mockApiKeys = [
  { id: '1', name: 'Production', key: 'ao_prod_8f3a...', created: '2024-03-15', status: 'active' as const },
  { id: '2', name: 'Development', key: 'ao_dev_b2c1...', created: '2024-04-01', status: 'active' as const },
  { id: '3', name: 'Staging', key: 'ao_stg_d4e5...', created: '2024-05-10', status: 'revoked' as const },
];

export default function ApiKeysPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">API Keys</h2>
          <p className="text-sm text-muted-foreground">Manage API keys for programmatic access</p>
        </div>
        <Button onClick={() => toast.info('API key creation coming soon')}>
          <Plus className="mr-2 h-4 w-4" /> Create API Key
        </Button>
      </div>

      {mockApiKeys.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Key className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No API keys</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first API key to get started.
            </p>
            <Button className="mt-4" onClick={() => toast.info('API key creation coming soon')}>
              Create API Key
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell className="font-mono text-sm">{apiKey.key}</TableCell>
                  <TableCell>{apiKey.created}</TableCell>
                  <TableCell>
                    <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => toast.info('API key deletion coming soon')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
