import Link from 'next/link';
import { Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <Orbit className="h-16 w-16 text-primary" />
      <h1 className="mt-6 text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Orbit lost?</p>
      <p className="mt-2 text-sm text-muted-foreground">
        This page doesn&apos;t exist.
      </p>
      <Button className="mt-8" render={<Link href="/" />}>Go Home</Button>
    </div>
  );
}
