import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import LoginPage from '../page';

describe('Login Page', () => {
  it('renders login heading', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('renders Connect Wallet button', () => {
    render(<LoginPage />);
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });
});
