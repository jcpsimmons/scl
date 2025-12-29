import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Combobox, ComboboxMulti } from './combobox';

const testOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('Combobox', () => {
  it('renders with placeholder', () => {
    render(<Combobox options={testOptions} placeholder="Select fruit..." />);

    expect(screen.getByRole('combobox')).toHaveTextContent('Select fruit...');
  });

  it('renders selected value', () => {
    render(<Combobox options={testOptions} value="apple" placeholder="Select fruit..." />);

    expect(screen.getByRole('combobox')).toHaveTextContent('Apple');
  });

  it('opens popover on click', async () => {
    const user = userEvent.setup();

    render(<Combobox options={testOptions} placeholder="Select fruit..." />);

    await user.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
  });

  it('shows all options when opened', async () => {
    const user = userEvent.setup();

    render(<Combobox options={testOptions} placeholder="Select fruit..." />);

    await user.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });
  });

  it('calls onValueChange when option is selected', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Combobox options={testOptions} onValueChange={onValueChange} placeholder="Select fruit..." />
    );

    await user.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Banana'));

    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('shows empty state when no matches', async () => {
    const user = userEvent.setup();

    render(
      <Combobox options={testOptions} placeholder="Select fruit..." emptyText="No fruits found." />
    );

    await user.click(screen.getByRole('combobox'));

    const searchInput = await screen.findByPlaceholderText('Search...');
    await user.type(searchInput, 'xyz');

    await waitFor(() => {
      expect(screen.getByText('No fruits found.')).toBeInTheDocument();
    });
  });

  it('respects disabled state', () => {
    render(<Combobox options={testOptions} placeholder="Select fruit..." disabled />);

    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});

describe('ComboboxMulti', () => {
  it('renders with placeholder', () => {
    render(<ComboboxMulti options={testOptions} placeholder="Select fruits..." />);

    expect(screen.getByRole('combobox')).toHaveTextContent('Select fruits...');
  });

  it('renders selected values', () => {
    render(
      <ComboboxMulti
        options={testOptions}
        value={['apple', 'banana']}
        placeholder="Select fruits..."
      />
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Apple, Banana');
  });

  it('toggles selection', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <ComboboxMulti
        options={testOptions}
        value={['apple']}
        onValueChange={onValueChange}
        placeholder="Select fruits..."
      />
    );

    await user.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Banana'));

    expect(onValueChange).toHaveBeenCalledWith(['apple', 'banana']);
  });

  it('removes selection when clicked again', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <ComboboxMulti
        options={testOptions}
        value={['apple', 'banana']}
        onValueChange={onValueChange}
        placeholder="Select fruits..."
      />
    );

    await user.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Apple'));

    expect(onValueChange).toHaveBeenCalledWith(['banana']);
  });

  it('respects maxSelected limit', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <ComboboxMulti
        options={testOptions}
        value={['apple', 'banana']}
        onValueChange={onValueChange}
        maxSelected={2}
        placeholder="Select up to 2..."
      />
    );

    await user.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Cherry'));

    // Should not add third item when at max
    expect(onValueChange).toHaveBeenCalledWith(['apple', 'banana']);
  });
});
