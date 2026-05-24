import type { AdConcept } from '../types/adWorkflow';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ConceptCard } from './ConceptCard';

export function ConceptGallery({ concepts, selectedIds, onToggle, onCreate }: { concepts: AdConcept[]; selectedIds: string[]; onToggle: (id: string) => void; onCreate: () => void }) {
  return (
    <div className="space-y-5">
      <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a8580]">Ad concepts</p>
          <h2 className="mt-1 text-xl font-semibold">Choose up to three concepts</h2>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-[#615d59]">Six deterministic Meta static ad angles. Select the concepts you want to turn into preview cards.</p>
        </div>
        <Button disabled={selectedIds.length === 0} onClick={onCreate}>Create static ads ({selectedIds.length}/3)</Button>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} selected={selectedIds.includes(concept.id)} disabled={selectedIds.length >= 3} onToggle={() => onToggle(concept.id)} />
        ))}
      </div>
    </div>
  );
}
