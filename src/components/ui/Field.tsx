import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Field({
  label,
  helper,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; helper?: ReactNode; error?: string }) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-black/95">{label}</span>
      {helper ? <span className="block text-[13px] leading-5 text-[#615d59]">{helper}</span> : null}
      <input
        className={cn(
          'focus-ring min-h-10 w-full rounded border border-black/10 bg-white px-3 py-2 text-sm text-black/95 placeholder:text-[#8a8580]',
          error && 'border-[#c83f31] bg-[rgba(200,63,49,0.04)]',
          className,
        )}
        {...props}
      />
      {error ? <span className="block text-[13px] text-[#c83f31]">{error}</span> : null}
    </label>
  );
}
