import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono font-bold uppercase tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border-2 border-primary hover:bg-transparent hover:text-primary active:bg-primary active:text-primary-foreground active:border-primary-foreground',
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-transparent hover:text-secondary active:bg-secondary active:text-secondary-foreground active:border-secondary-foreground',
        outline:
          'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground active:bg-transparent active:text-primary active:border-primary-foreground',
        'secondary-outline':
          'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground active:bg-transparent active:text-secondary active:border-secondary-foreground',
        ghost:
          'bg-transparent text-primary border-2 border-transparent hover:border-primary hover:bg-primary hover:text-primary-foreground active:bg-transparent active:border-primary-foreground active:text-primary',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline border-none active:no-underline',
        destructive:
          'bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-transparent hover:text-destructive active:bg-destructive active:text-destructive-foreground active:border-destructive-foreground',
        'destructive-outline':
          'bg-transparent text-destructive border-2 border-destructive hover:bg-destructive hover:text-destructive-foreground active:bg-transparent active:text-destructive active:border-destructive-foreground',
      },
      size: {
        default: 'h-11 px-6 py-3 text-sm',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-14 px-10 py-4 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
