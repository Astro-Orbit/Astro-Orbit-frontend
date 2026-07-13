import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import NotFound from '../not-found';

describe('404 Page', () => {
  it('renders 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders "Go Home" button', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });
});
