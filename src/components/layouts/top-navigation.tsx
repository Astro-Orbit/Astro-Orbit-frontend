'use client';

import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { Search, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/auth-provider';
import { ROUTES } from '@/constants';
import Link from 'next/link';

const pathLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/settings/profile': 'Settings',
  '/settings/appearance': 'Appearance',
  '/settings/api-keys': 'API Keys',
  '/profile': 'Profile',
};

export function TopNavigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const segments = pathname.split('/').filter(Boolean);
  const currentLabel = pathLabels[pathname] || segments[segments.length - 1] || 'Dashboard';

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{currentLabel}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {user?.displayName?.charAt(0)?.toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              {user?.displayName || 'User'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href={ROUTES.PROFILE} />}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={ROUTES.SETTINGS} />}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
