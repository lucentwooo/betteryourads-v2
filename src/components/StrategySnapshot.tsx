import type { StrategySnapshot as Strategy } from '../types/adWorkflow';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function StrategySnapshot({ strategy, onContinue }: { strategy: Strategy; onContinue: () => void }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="p-5">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a8580]">Strategy snapshot</p>
        <h2 className="mt-1 text-xl font-semibold tracking-[-0.01em]">A focused Meta ad brief</h2>
        <p className="mt-3 text-base leading-6 text-black/90">{strategy.businessSummary}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Section title="Customer segment" items={[strategy.customerSegment]} />
          <Section title="Message hierarchy" items={strategy.messageHierarchy} />
          <Section title="Pain points" items={strategy.painPoints} />
          <Section title="Desired outcomes" items={strategy.desiredOutcomes} />
          <Section title="Positioning angles" items={strategy.positioningAngles} />
          <Section title="Competitor gaps" items={strategy.competitorGaps} />
        </div>
      </Card>
      <Card className="h-fit bg-[#f6f5f4]">
        <h3 className="text-base font-semibold">Brief review</h3>
        <p className="mt-2 text-sm leading-5 text-[#615d59]">
          The next step turns this strategy into six practical Meta static ad concepts. Keep this narrow: audience, pain, offer, and visual direction.
        </p>
        <Button className="mt-5 w-full" onClick={onContinue}>Generate concepts</Button>
      </Card>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-black/10 bg-[#fdfcfb] p-4">
      <h3 className="text-sm font-semibold text-black/95">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-5 text-[#615d59]">
        {items.map((item) => <li key={item} className="pl-3 before:-ml-3 before:mr-2 before:content-['•']">{item}</li>)}
      </ul>
    </section>
  );
}
