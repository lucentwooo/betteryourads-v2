import type { FormEvent } from 'react';
import type { IntakeInput, BrandTone } from '../types/adWorkflow';
import type { ValidationErrors } from '../lib/validation';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Field } from './ui/Field';
import { Textarea } from './ui/Textarea';

const tones: BrandTone[] = ['calm', 'direct', 'technical', 'friendly', 'premium'];

type Props = {
  value: IntakeInput;
  errors: ValidationErrors;
  onChange: (value: IntakeInput) => void;
  onSubmit: () => void;
  onUseSample: () => void;
};

export function IntakeForm({ value, errors, onChange, onSubmit, onUseSample }: Props) {
  const update = <K extends keyof IntakeInput>(key: K, next: IntakeInput[K]) => onChange({ ...value, [key]: next });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="p-5">
        <div className="mb-6 flex flex-col gap-3 border-b border-black/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a8580]">Business context</p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.01em]">Build the brief</h2>
            <p className="mt-2 max-w-2xl text-sm leading-5 text-[#615d59]">
              Give the generator enough SaaS-specific context to draft useful Meta static ad angles. The sample shows the expected level of detail.
            </p>
          </div>
          <Button type="button" variant="secondary" onClick={onUseSample}>Use sample SaaS input</Button>
        </div>

        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2">
            <Field label="Website URL" value={value.websiteUrl} onChange={(e) => update('websiteUrl', e.target.value)} error={errors.websiteUrl} placeholder="https://example.com" />
            <Field label="Company or product name" value={value.productName} onChange={(e) => update('productName', e.target.value)} error={errors.productName} placeholder="Northstar Ops" />
          </section>
          <Textarea label="Value proposition" helper="What does the product help a startup or SaaS team do?" value={value.valueProposition} onChange={(e) => update('valueProposition', e.target.value)} error={errors.valueProposition} placeholder="Helps seed-stage SaaS teams..." />
          <Textarea label="Target customer" value={value.targetCustomer} onChange={(e) => update('targetCustomer', e.target.value)} error={errors.targetCustomer} placeholder="Seed-stage B2B SaaS founders..." />
          <Textarea label="Offer / CTA" value={value.offer} onChange={(e) => update('offer', e.target.value)} error={errors.offer} placeholder="Start a free 14-day workspace audit..." />
          <section className="grid gap-4 sm:grid-cols-2">
            <Textarea label="Differentiators" value={value.differentiators} onChange={(e) => update('differentiators', e.target.value)} placeholder="Built for startup operating cadence, lighter than..." />
            <Textarea label="Competitors / alternatives" value={value.competitors} onChange={(e) => update('competitors', e.target.value)} placeholder="Asana, Notion templates, spreadsheets..." />
          </section>
          <section className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
            <h3 className="text-base font-semibold">Brand guidance</h3>
            <p className="mt-1 text-sm text-[#615d59]">Used for preview styling only. No external image generation is called.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="block text-sm font-medium">Brand tone</span>
                <select className="focus-ring min-h-10 w-full rounded border border-black/10 bg-white px-3 text-sm" value={value.brandTone} onChange={(e) => update('brandTone', e.target.value as BrandTone)}>
                  {tones.map((tone) => <option key={tone}>{tone}</option>)}
                </select>
              </label>
              <Field label="Logo / text mark" value={value.logoText} onChange={(e) => update('logoText', e.target.value)} placeholder="Northstar Ops" />
              <Field label="Primary color" value={value.primaryColor} onChange={(e) => update('primaryColor', e.target.value)} error={errors.primaryColor} placeholder="#205f73" />
              <Field label="Secondary color" value={value.secondaryColor} onChange={(e) => update('secondaryColor', e.target.value)} error={errors.secondaryColor} placeholder="#f1e8d9" />
            </div>
            <div className="mt-4">
              <Textarea label="Visual cues" value={value.visualCues} onChange={(e) => update('visualCues', e.target.value)} placeholder="Warm off-white workspace, crisp accents..." />
            </div>
          </section>
        </div>
      </Card>

      <aside className="space-y-4">
        <Card className="sticky top-5 bg-[#f6f5f4]">
          <h3 className="text-base font-semibold">What happens next</h3>
          <ol className="mt-3 space-y-3 text-sm leading-5 text-[#615d59]">
            <li><strong className="text-black/90">1.</strong> Generate a strategy snapshot.</li>
            <li><strong className="text-black/90">2.</strong> Review six distinct Meta ad concepts.</li>
            <li><strong className="text-black/90">3.</strong> Select up to three for static creative previews.</li>
          </ol>
          <Button className="mt-5 w-full" type="submit">Analyze business context</Button>
        </Card>
      </aside>
    </form>
  );
}
