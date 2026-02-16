import * as React from 'react';
import { cx } from '@/lib/utils';
import './input.css';

/** Props for the Input component. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Whether the input is in an error/invalid state. */
  error?: boolean;
}

/** A styled text input with terminal aesthetics. Supports error state via the `error` prop. */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cx('scl-input', error && 'scl-input--error', className)}
        ref={ref}
        aria-invalid={ariaInvalid ?? error}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
