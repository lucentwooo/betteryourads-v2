import type { CreativeVariant } from '../types/adWorkflow';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CreativePreviewCard } from './CreativePreviewCard';

export function CreativeGallery({ creatives, onExport }: { creatives: CreativeVariant[]; onExport: () => void }) {
  return (
    <div className="space-y-5">
      <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a8580]">Creative previews</p>
          <h2 className="mt-1 text-xl font-semibold">Static Meta ad directions</h2>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-[#615d59]">Preview cards are intentionally local and deterministic: no provider calls, no fake performance claims, and no campaign launch UI.</p>
        </div>
        <Button onClick={onExport}>Prepare export</Button>
      </Card>
      <div className="grid gap-5 xl:grid-cols-3">
        {creatives.map((creative) => <CreativePreviewCard key={creative.id} creative={creative} />)}
      </div>
    </div>
  );
}
