'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
