'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants';
import { User, Palette, Key, Bell } from 'lucide-react';

const settingsNav = [
  { href: ROUTES.SETTINGS, label: 'Profile', icon: User },
  { href: ROUTES.SETTINGS_APPEARANCE, label: 'Appearance', icon: Palette },
  { href: ROUTES.SETTINGS_API_KEYS, label: 'API Keys', icon: Key },
  { href: '#', label: 'Notifications', icon: Bell, disabled: true },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r bg-card p-4">
      <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Settings
      </h2>
      <nav className="space-y-1">
        {settingsNav.map((item) => {
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
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
