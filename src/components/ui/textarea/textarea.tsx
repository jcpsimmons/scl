import * as React from 'react';
import { cx } from '@/lib/utils';
import './textarea.css';

/** Props for the Textarea component. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Whether the textarea is in an error/invalid state. */
  error?: boolean;
}

/** A styled textarea with terminal aesthetics. Supports error state via the `error` prop. */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    return (
      <textarea
        className={cx('scl-textarea', error && 'scl-textarea--error', className)}
        ref={ref}
        aria-invalid={ariaInvalid ?? error}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
