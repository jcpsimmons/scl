import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './scroll-area.css';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cx('scl-scroll-area', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="scl-scroll-area__viewport">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar orientation="vertical" />
    <ScrollBar orientation="horizontal" />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cx(
      'scl-scroll-area__scrollbar',
      orientation === 'vertical' && 'scl-scroll-area__scrollbar--vertical',
      orientation === 'horizontal' && 'scl-scroll-area__scrollbar--horizontal',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="scl-scroll-area__thumb" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
