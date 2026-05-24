import type { AdConcept } from '../types/adWorkflow';
import { cn } from '../lib/cn';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function ConceptCard({ concept, selected, disabled, onToggle }: { concept: AdConcept; selected: boolean; disabled: boolean; onToggle: () => void }) {
  return (
    <Card className={cn('flex h-full flex-col transition-colors', selected && 'border-[#0075de] bg-[rgba(0,117,222,0.06)]', disabled && 'opacity-70')}>
      <div className="flex items-start justify-between gap-3">
        <Badge>{concept.type}</Badge>
        {selected ? <Badge className="border-[#0075de] bg-white text-[#0075de]">Selected</Badge> : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-6 tracking-[-0.01em]">{concept.angleName}</h3>
      <p className="mt-2 text-sm leading-5 text-[#615d59]">{concept.targetInsight}</p>
      <div className="mt-4 rounded-xl border border-black/10 bg-white p-3">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#8a8580]">Hook</p>
        <p className="mt-1 text-base font-semibold leading-6">“{concept.hook}”</p>
      </div>
      <dl className="mt-4 space-y-3 text-sm leading-5">
        <div><dt className="font-medium">Visual direction</dt><dd className="mt-1 text-[#615d59]">{concept.visualDirection}</dd></div>
        <div><dt className="font-medium">Why it fits</dt><dd className="mt-1 text-[#615d59]">{concept.whyItShouldWork}</dd></div>
        <div><dt className="font-medium">Avoid</dt><dd className="mt-1 text-[#615d59]">{concept.riskToAvoid}</dd></div>
      </dl>
      <Button className="mt-auto w-full" type="button" variant={selected ? 'secondary' : 'primary'} disabled={disabled && !selected} onClick={onToggle}>
        {selected ? 'Remove concept' : 'Select concept'}
      </Button>
    </Card>
  );
}
