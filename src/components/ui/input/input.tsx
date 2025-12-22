import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full border border-[#00ff00] bg-black px-3 py-1 text-base text-[#00ff00] transition-colors file:-ml-3 file:-my-1 file:mr-4 file:h-10 file:px-3 file:border-0 file:border-r file:border-[#00ff00] file:bg-[#00ff00] file:text-black file:text-sm file:font-medium file:cursor-pointer hover:file:bg-black hover:file:text-[#00ff00] placeholder:text-[#00ff00]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff00] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
