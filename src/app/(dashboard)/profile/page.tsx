'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/providers/auth-provider';
import { Wallet, Mail, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatarUrl ?? undefined} />
              <AvatarFallback className="text-lg">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user?.displayName || 'Unnamed User'}</CardTitle>
              <p className="text-sm text-muted-foreground">Developer</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user?.email || 'No email set'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined {format(new Date(), 'MMMM yyyy')}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Stellar</p>
              <p className="font-mono text-xs text-muted-foreground">
                {user?.walletAddress || 'No wallet connected'}
              </p>
            </div>
            {user?.walletAddress && <Badge>Primary</Badge>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
