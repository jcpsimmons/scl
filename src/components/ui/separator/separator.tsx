import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './separator.css';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cx(
      'scl-separator',
      orientation === 'horizontal' ? 'scl-separator--horizontal' : 'scl-separator--vertical',
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
