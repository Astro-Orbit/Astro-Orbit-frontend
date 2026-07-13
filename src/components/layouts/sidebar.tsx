'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES, APP_NAME } from '@/constants';
import {
  LayoutDashboard,
  FolderKanban,
  FileCode,
  Rocket,
  BarChart3,
  Settings,
  ChevronLeft,
  Orbit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';

const navItems = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'Projects', icon: FolderKanban, disabled: true },
  { href: '#', label: 'Contracts', icon: FileCode, disabled: true },
  { href: '#', label: 'Deployments', icon: Rocket, disabled: true },
  { href: '#', label: 'Analytics', icon: BarChart3, disabled: true },
  { href: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Orbit className="h-6 w-6 text-primary" />
        {!collapsed && (
          <span className="font-semibold">{APP_NAME}</span>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                item.disabled && 'opacity-40 pointer-events-none',
                collapsed && 'justify-center px-2',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-2">
        <div className={cn('flex items-center', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && <ThemeSwitcher />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
          </Button>
        </div>
      </div>
    </aside>
  );
}
