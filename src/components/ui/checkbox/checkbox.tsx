import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './checkbox.css';

const CheckIcon = () => (
  <svg
    className="scl-checkbox__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cx('scl-checkbox', className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="scl-checkbox__indicator">
      <CheckIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
