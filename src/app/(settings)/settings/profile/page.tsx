'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '@/providers/auth-provider';

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
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatarUrl ?? undefined} />
              <AvatarFallback className="text-lg">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={() => toast.info('Avatar upload coming soon')}>
              Change Avatar
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue={user?.displayName || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ''} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Wallet Address</Label>
            <Input
              readOnly
              value={user?.walletAddress || 'No wallet connected'}
              className="bg-muted"
            />
          </div>

          <Button onClick={() => toast.success('Profile updated')}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
