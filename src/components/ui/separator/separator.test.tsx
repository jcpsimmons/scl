import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Separator } from './separator';

describe('Separator', () => {
  it('renders horizontal separator by default', () => {
    render(<Separator data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveClass('h-[2px]', 'w-full');
  });

  it('renders vertical separator', () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveClass('h-full', 'w-[3px]');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('merges custom className', () => {
    render(<Separator className="my-4" data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveClass('my-4');
  });

  it('is decorative by default', () => {
    render(<Separator data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveAttribute('data-orientation', 'horizontal');
  });
});
