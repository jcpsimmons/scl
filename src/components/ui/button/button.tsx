import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './button.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'secondary-outline'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'destructive-outline';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

/** Props for the Button component. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. */
  variant?: ButtonVariant;
  /** Size preset. */
  size?: ButtonSize;
  /** Render as child element (Radix Slot pattern). */
  asChild?: boolean;
  /** Show a loading spinner and disable the button. */
  loading?: boolean;
}

/** A styled button with multiple variants, sizes, and loading state. */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cx(
          'scl-button',
          `scl-button--${variant}`,
          `scl-button--${size}`,
          loading && 'scl-button--loading',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? children : <>{loading ? <span className="scl-button__spinner" aria-hidden="true">⟳</span> : null}{children}</>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
