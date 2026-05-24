import type { ReactNode } from 'react';
import type { WorkflowStep } from '../types/adWorkflow';
import { ProgressSteps } from './ProgressSteps';

export function AppShell({ step, children }: { step: WorkflowStep; children: ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-2xl border border-black/10 bg-white/82 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded border border-black/10 bg-[#f6f5f4] text-sm font-semibold">BYA</div>
                <span className="text-sm font-medium text-[#615d59]">BetterYourAds</span>
              </div>
              <h1 className="max-w-3xl text-2xl font-semibold leading-9 tracking-[-0.02em] text-black/95">
                Turn SaaS context into Meta ad strategy and static creative previews.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-5 text-[#615d59]">
                A focused MVP for founders and growth teams: business brief, ad angles, selectable concepts, and demo-ready creative direction.
              </p>
            </div>
            <ProgressSteps current={step} />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
