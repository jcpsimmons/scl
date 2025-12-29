import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="checkbox" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('can be checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="checkbox" />);
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('merges custom className', () => {
    render(<Checkbox className="custom-class" aria-label="checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('can be controlled', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox checked={true} onCheckedChange={onCheckedChange} aria-label="checkbox" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('can be disabled', () => {
    render(<Checkbox disabled aria-label="checkbox" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
