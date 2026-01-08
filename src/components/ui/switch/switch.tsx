import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './switch.css';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cx('scl-switch', className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="scl-switch__thumb" />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
