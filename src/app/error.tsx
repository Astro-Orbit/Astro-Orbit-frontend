'use client';

import { Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <Orbit className="h-16 w-16 text-destructive" />
      <h1 className="mt-6 text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button className="mt-8" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
