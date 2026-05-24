import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn('rounded-xl border border-black/10 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]', className)} {...props}>
      {children}
    </div>
  );
}
