import type { TextareaHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Textarea({
  label,
  helper,
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; helper?: ReactNode; error?: string }) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-black/95">{label}</span>
      {helper ? <span className="block text-[13px] leading-5 text-[#615d59]">{helper}</span> : null}
      <textarea
        className={cn(
          'focus-ring min-h-[120px] w-full resize-y rounded border border-black/10 bg-white px-3 py-2 text-sm leading-5 text-black/95 placeholder:text-[#8a8580]',
          error && 'border-[#c83f31] bg-[rgba(200,63,49,0.04)]',
          className,
        )}
        {...props}
      />
      {error ? <span className="block text-[13px] text-[#c83f31]">{error}</span> : null}
    </label>
  );
}
