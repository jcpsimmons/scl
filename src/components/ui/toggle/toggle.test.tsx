import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './toggle';

describe('Toggle', () => {
  it('renders toggle button', () => {
    render(<Toggle aria-label="Toggle">B</Toggle>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Toggle">B</Toggle>);
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('data-state', 'off');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('data-state', 'on');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Toggle ref={ref}>B</Toggle>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('calls onPressedChange when toggled', async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(
      <Toggle onPressedChange={onPressedChange} aria-label="Toggle">
        B
      </Toggle>
    );
    await user.click(screen.getByRole('button'));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('can be disabled', () => {
    render(
      <Toggle disabled aria-label="Toggle">
        B
      </Toggle>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
