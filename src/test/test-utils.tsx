import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function render(ui: ReactElement, options?: Parameters<typeof rtlRender>[1]) {
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
  };
}

export * from '@testing-library/react';
