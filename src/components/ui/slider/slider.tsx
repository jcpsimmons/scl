import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './slider.css';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, defaultValue, value, ...props }, ref) => {
  const thumbCount = value?.length ?? defaultValue?.length ?? 1;

  return (
    <SliderPrimitive.Root
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      className={cx('scl-slider', className)}
      {...props}
    >
      <SliderPrimitive.Track className="scl-slider__track">
        <SliderPrimitive.Range className="scl-slider__range" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb key={i} className="scl-slider__thumb" />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
