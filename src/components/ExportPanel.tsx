import type { AdConcept, CreativeVariant, IntakeInput, StrategySnapshot } from '../types/adWorkflow';
import { exportConceptsMarkdown, exportCreativesJson, exportStrategyMarkdown } from '../lib/export';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function ExportPanel({ input, strategy, concepts, creatives, onReset }: { input: IntakeInput; strategy: StrategySnapshot; concepts: AdConcept[]; creatives: CreativeVariant[]; onReset: () => void }) {
  const strategyMd = exportStrategyMarkdown(input, strategy);
  const conceptsMd = exportConceptsMarkdown(concepts);
  const specsJson = exportCreativesJson(creatives);
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="p-5">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a8580]">Export</p>
        <h2 className="mt-1 text-xl font-semibold">Copy the brief, concepts, and creative specs</h2>
        <ExportBlock title="Strategy markdown" value={strategyMd} />
        <ExportBlock title="Selected concept copy" value={conceptsMd} />
        <ExportBlock title="Creative specs JSON" value={specsJson} />
      </Card>
      <Card className="h-fit bg-[#f6f5f4]">
        <h3 className="text-base font-semibold">MVP export notes</h3>
        <p className="mt-2 text-sm leading-5 text-[#615d59]">This export is designed for manual handoff to a founder, designer, or paid social operator. It does not create campaigns or call external services.</p>
        <Button className="mt-5 w-full" variant="secondary" onClick={onReset}>Start another brief</Button>
      </Card>
    </div>
  );
}

function ExportBlock({ title, value }: { title: string; value: string }) {
  return (
    <section className="mt-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Button type="button" variant="secondary" onClick={() => void navigator.clipboard?.writeText(value)}>Copy</Button>
      </div>
      <textarea readOnly value={value} className="focus-ring min-h-[180px] w-full rounded border border-black/10 bg-[#fbfaf8] p-3 font-mono text-xs leading-5 text-black/80" />
    </section>
  );
}
