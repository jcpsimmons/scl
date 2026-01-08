import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './accordion.css';

const Accordion = AccordionPrimitive.Root;

const ChevronIcon = () => (
  <svg
    className="scl-accordion-trigger__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cx('scl-accordion-item', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="scl-accordion-header">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cx('scl-accordion-trigger', className)}
      {...props}
    >
      {children}
      <ChevronIcon />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="scl-accordion-content"
    {...props}
  >
    <div className={cx('scl-accordion-content__inner', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
