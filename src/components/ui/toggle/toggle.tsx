import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './toggle.css';

export type ToggleSize = 'default' | 'sm' | 'lg';

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  size?: ToggleSize;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, size = 'default', ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cx('scl-toggle', `scl-toggle--${size}`, className)}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
