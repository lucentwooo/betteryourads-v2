import type { CreativeVariant } from '../types/adWorkflow';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

export function CreativePreviewCard({ creative }: { creative: CreativeVariant }) {
  const isSplit = creative.layout === 'split-proof';
  const isChecklist = creative.layout === 'outcome-checklist';
  return (
    <Card className="overflow-hidden p-0">
      <div className="bg-[#f6f5f4] p-5">
        <div className="mx-auto aspect-square max-w-[420px] rounded-2xl border border-black/10 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]" style={{ background: creative.colors.background }}>
          <div className="flex h-full flex-col rounded-xl border border-black/10 bg-white p-5" style={{ boxShadow: `inset 0 0 0 8px ${creative.colors.secondary}` }}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold" style={{ color: creative.colors.primary }}>BetterYourAds preview</span>
              <span className="rounded-full px-2 py-1 text-[11px] font-medium" style={{ background: creative.colors.secondary, color: creative.colors.primary }}>{creative.eyebrow}</span>
            </div>
            <div className={isSplit ? 'mt-8 grid flex-1 grid-cols-[1.05fr_0.95fr] gap-4' : 'mt-8 flex flex-1 flex-col'}>
              <div>
                <p className="text-[28px] font-semibold leading-[1.08] tracking-[-0.04em] text-black/95">{creative.headline}</p>
                <p className="mt-4 line-clamp-5 text-[13px] leading-5 text-[#615d59]">{creative.body}</p>
              </div>
              {isSplit ? (
                <div className="rounded-xl p-4" style={{ background: creative.colors.secondary }}>
                  <p className="text-xs font-medium uppercase tracking-[0.1em]" style={{ color: creative.colors.primary }}>Why this matters</p>
                  <p className="mt-3 text-sm font-medium leading-5 text-black/85">{creative.proofLine}</p>
                </div>
              ) : null}
              {isChecklist ? (
                <ul className="mt-5 space-y-2">
                  {creative.checklist.map((item) => <li key={item} className="rounded-lg border border-black/10 bg-[#fbfaf8] px-3 py-2 text-sm text-black/85">✓ {item}</li>)}
                </ul>
              ) : null}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
              <span className="text-xs text-[#615d59]">{creative.format}</span>
              <span className="rounded px-3 py-2 text-sm font-semibold text-white" style={{ background: creative.colors.primary }}>{creative.cta}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap items-center gap-2"><Badge>{creative.layout}</Badge><Badge>{creative.format}</Badge></div>
        <p className="text-sm leading-5 text-[#615d59]">{creative.visualNotes}</p>
      </div>
    </Card>
  );
}
