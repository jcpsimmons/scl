import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Filled variants (color bg, black text)
        default:
          'border-primary bg-primary text-primary-foreground',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground',
        // Outline variants (transparent bg, color text/border)
        outline:
          'border-primary bg-transparent text-primary',
        'secondary-outline':
          'border-secondary bg-transparent text-secondary',
        'destructive-outline':
          'border-destructive bg-transparent text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
