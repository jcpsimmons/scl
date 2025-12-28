import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border border-primary/30 bg-primary/10',
        // Scanline animation effect
        'after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-primary/20 after:to-transparent after:animate-scanline',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
