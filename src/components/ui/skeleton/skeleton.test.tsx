import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders with default styles', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('scl-skeleton');
  });

  it('merges custom className', () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('accepts additional HTML attributes', () => {
    render(<Skeleton data-testid="skeleton" aria-label="Loading" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-label', 'Loading');
  });
});
