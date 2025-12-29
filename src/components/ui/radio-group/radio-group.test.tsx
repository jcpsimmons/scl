import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from './radio-group';

describe('RadioGroup', () => {
  it('renders radio group with items', () => {
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1" id="option-1" />
        <RadioGroupItem value="option-2" id="option-2" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('selects the default value', () => {
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1" id="option-1" />
        <RadioGroupItem value="option-2" id="option-2" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio', { checked: true })).toHaveAttribute('value', 'option-1');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <RadioGroup ref={ref}>
        <RadioGroupItem value="1" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('calls onValueChange when selection changes', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup defaultValue="option-1" onValueChange={onValueChange}>
        <RadioGroupItem value="option-1" id="option-1" />
        <RadioGroupItem value="option-2" id="option-2" />
      </RadioGroup>
    );
    await user.click(screen.getAllByRole('radio')[1]);
    expect(onValueChange).toHaveBeenCalledWith('option-2');
  });

  it('can be disabled', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem value="option-1" id="option-1" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio')).toBeDisabled();
  });
});
