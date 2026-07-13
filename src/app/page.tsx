import Link from 'next/link';
import { Orbit, Rocket, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Smart Contract Management',
    description: 'Build, deploy, and manage Soroban smart contracts with an intuitive interface.',
    icon: Shield,
  },
  {
    title: 'One-Click Deployments',
    description: 'Deploy to testnet or mainnet with a single click. Rollback instantly if something goes wrong.',
    icon: Rocket,
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Multi-signature requirements, audit logs, and granular permission controls.',
    icon: Shield,
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Track contract performance, gas usage, and transaction history in real time.',
    icon: Zap,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Orbit className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold">Astro Orbit</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" render={<Link href="/login" />}>Sign in</Button>
            <Button render={<Link href="/dashboard" />}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build on{' '}
              <span className="text-primary">Stellar</span>
              {' '}with confidence
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Astro Orbit is the developer platform for Soroban smart contracts.
              Deploy, monitor, and manage your blockchain applications with enterprise-grade tooling.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" render={<Link href="/dashboard" />}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="#features" />}>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold">Everything you need to ship on Stellar</h2>
            <p className="mt-4 text-center text-muted-foreground">
              A complete platform for Soroban smart contract development.
            </p>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 bg-card">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary" />
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} Astro Orbit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
