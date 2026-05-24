import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
};

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-medium transition-colors',
        variant === 'primary' && 'border-[#0075de] bg-[#0075de] text-white hover:bg-[#0068c7]',
        variant === 'secondary' && 'border-black/10 bg-white text-black/95 hover:bg-[#f0efed]',
        variant === 'tertiary' && 'border-transparent bg-transparent text-[#615d59] hover:bg-[#f0efed] hover:text-black/95',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
