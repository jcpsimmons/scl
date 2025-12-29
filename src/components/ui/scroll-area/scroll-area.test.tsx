import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { ScrollArea } from './scroll-area';

describe('ScrollArea', () => {
  it('renders children', () => {
    render(
      <ScrollArea className="h-[200px]">
        <div>Content</div>
      </ScrollArea>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ScrollArea ref={ref}>
        <div>Content</div>
      </ScrollArea>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('merges custom className', () => {
    render(
      <ScrollArea className="h-[200px] w-[350px]" data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>
    );
    expect(screen.getByTestId('scroll-area')).toHaveClass('h-[200px]', 'w-[350px]');
  });
});
