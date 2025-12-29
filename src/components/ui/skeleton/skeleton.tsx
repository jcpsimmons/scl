import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  blink?: boolean;
}

function Skeleton({ className, blink = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('border border-primary/30 bg-primary/10', blink && 'animate-blink', className)}
      {...props}
    />
  );
}

export { Skeleton };
