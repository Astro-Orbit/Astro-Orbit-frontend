'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Appearance</h2>
        <p className="text-sm text-muted-foreground">Customize the interface theme</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Select your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.value;
              return (
                <Button
                  key={t.value}
                  variant="outline"
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    'flex h-24 flex-col items-center justify-center gap-2',
                    isActive && 'border-primary ring-1 ring-primary',
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{t.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
