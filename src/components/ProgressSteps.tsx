import type { WorkflowStep } from '../types/adWorkflow';
import { cn } from '../lib/cn';

const steps: Array<{ id: WorkflowStep; label: string }> = [
  { id: 'intake', label: 'Intake' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'creatives', label: 'Creatives' },
  { id: 'export', label: 'Export' },
];

export function ProgressSteps({ current }: { current: WorkflowStep }) {
  const currentIndex = steps.findIndex((step) => step.id === current);
  return (
    <ol className="grid grid-cols-5 gap-1 rounded-xl border border-black/10 bg-[#f6f5f4] p-1 text-xs">
      {steps.map((step, index) => {
        const active = index === currentIndex;
        const done = index < currentIndex;
        return (
          <li
            key={step.id}
            className={cn(
              'rounded-lg px-2 py-2 text-center text-[#615d59]',
              active && 'bg-white font-semibold text-[#0075de] shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
              done && 'text-black/80',
            )}
          >
            {step.label}
          </li>
        );
      })}
    </ol>
  );
}
