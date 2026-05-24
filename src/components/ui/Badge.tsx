import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border border-black/10 bg-[#f6f5f4] px-2 py-1 text-xs text-[#615d59]', className)} {...props}>
      {children}
    </span>
  );
}
