import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import HomePage from '../page';

describe('Home Page', () => {
  it('renders the hero heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Stellar')).toBeInTheDocument();
  });

  it('renders Get Started button', () => {
    render(<HomePage />);
    const buttons = screen.getAllByText('Get Started');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders feature cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Smart Contract Management')).toBeInTheDocument();
    expect(screen.getByText('One-Click Deployments')).toBeInTheDocument();
  });
});
