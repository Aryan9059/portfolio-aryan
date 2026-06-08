import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest',
  {
    variants: {
      variant: {
        default: 'bg-[var(--accent)] text-[var(--paper)] shadow hover:bg-[var(--accent-2)]',
        outline: 'border border-[var(--ink)] text-[var(--ink)] bg-transparent hover:bg-[var(--ink)] hover:text-[var(--paper)]',
        ghost: 'hover:bg-[var(--rule)] text-[var(--ink)]',
      },
      size: {
        default: 'h-12 px-6 py-2',
        sm: 'h-10 rounded-full px-4 text-xs',
        lg: 'h-14 rounded-full px-10 text-base',
        icon: 'h-12 w-12',
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
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
