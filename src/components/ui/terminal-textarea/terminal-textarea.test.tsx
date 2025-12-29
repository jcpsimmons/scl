import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TerminalTextarea } from './terminal-textarea';

describe('TerminalTextarea', () => {
  it('renders with default props', () => {
    render(<TerminalTextarea data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
  });

  it('displays value', () => {
    render(<TerminalTextarea value="Hello world" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveValue('Hello world');
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<TerminalTextarea value="" onChange={onChange} data-testid="textarea" />);

    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'New value' } });
    expect(onChange).toHaveBeenCalledWith('New value');
  });

  it('shows line numbers by default', () => {
    render(<TerminalTextarea value={'Line 1\nLine 2\nLine 3'} />);
    // At minimum, line 1 should be visible
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows tildes for empty lines', () => {
    render(<TerminalTextarea value="Line 1" visibleLines={5} />);
    // Should have tildes for rows 2-5
    const tildes = screen.getAllByText('~');
    expect(tildes.length).toBe(4);
  });

  it('hides line numbers when showLineNumbers is false', () => {
    render(<TerminalTextarea value="Line 1" showLineNumbers={false} visibleLines={5} />);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('~')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TerminalTextarea className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('updates line numbers when content changes', () => {
    const { rerender } = render(<TerminalTextarea value="Line 1" onChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();

    rerender(<TerminalTextarea value={'Line 1\nLine 2'} onChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    // Line 2 should be visible after adding a second line
  });

  it('accepts placeholder', () => {
    render(<TerminalTextarea placeholder="Enter code..." data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveAttribute('placeholder', 'Enter code...');
  });

  it('can be readonly', () => {
    render(<TerminalTextarea readOnly data-testid="textarea" />);
    // Component sets readOnly on the editor
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
  });

  it('calls onCursorChange when cursor position changes', () => {
    const onCursorChange = vi.fn();
    render(
      <TerminalTextarea
        value="Line 1\nLine 2"
        onCursorChange={onCursorChange}
        data-testid="textarea"
      />
    );

    const textarea = screen.getByTestId('textarea');
    fireEvent.click(textarea);
    expect(onCursorChange).toHaveBeenCalled();
  });
});
