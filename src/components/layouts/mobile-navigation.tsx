'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ROUTES, APP_NAME } from '@/constants';
import {
  LayoutDashboard,
  FolderKanban,
  FileCode,
  Rocket,
  BarChart3,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'Projects', icon: FolderKanban, disabled: true },
  { href: '#', label: 'Contracts', icon: FileCode, disabled: true },
  { href: '#', label: 'Deployments', icon: Rocket, disabled: true },
  { href: '#', label: 'Analytics', icon: BarChart3, disabled: true },
  { href: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        }
      />
      <SheetContent side="left" className="w-60 p-0">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <Orbit className="h-6 w-6 text-primary" />
          <span className="font-semibold">{APP_NAME}</span>
        </div>
        <nav className="space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.disabled ? '#' : item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  item.disabled && 'opacity-40 pointer-events-none',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
