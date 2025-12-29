import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </Alert>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Heads up!')).toBeInTheDocument();
    expect(screen.getByText(/You can add components/)).toBeInTheDocument();
  });

  it('applies default variant', () => {
    render(<Alert>Default Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-primary');
  });

  it('applies destructive variant', () => {
    render(<Alert variant="destructive">Error Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-destructive');
  });

  it('forwards ref to Alert', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Alert</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    render(<Alert className="custom-class">Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });
});
