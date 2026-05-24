import type { ReactNode } from 'react';
import { Card } from './Card';

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="border-dashed bg-[#f6f5f4] text-center">
      <h3 className="text-base font-semibold text-black/95">{title}</h3>
      <div className="mx-auto mt-2 max-w-md text-sm leading-5 text-[#615d59]">{children}</div>
    </Card>
  );
}
