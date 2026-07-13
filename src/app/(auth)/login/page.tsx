'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Connect your Stellar wallet to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => toast.info('Wallet connection coming soon')}
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => toast.info('Email sign-in coming soon')}
        >
          <Mail className="mr-2 h-4 w-4" />
          Sign in with Email
        </Button>
      </CardContent>
    </Card>
  );
}
