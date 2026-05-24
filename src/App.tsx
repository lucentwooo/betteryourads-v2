import { useMemo, useState } from 'react';
import { emptyIntakeInput, sampleSaasInput } from './data/sampleInputs';
import { analyzeBusiness } from './generation/analyzeBusiness';
import { generateConcepts } from './generation/generateConcepts';
import { generateCreatives } from './generation/generateCreatives';
import { validateIntake, type ValidationErrors } from './lib/validation';
import type { AdConcept, CreativeVariant, StrategySnapshot, WorkflowState } from './types/adWorkflow';
import { AppShell } from './components/AppShell';
import { IntakeForm } from './components/IntakeForm';
import { StrategySnapshot as StrategySnapshotScreen } from './components/StrategySnapshot';
import { ConceptGallery } from './components/ConceptGallery';
import { CreativeGallery } from './components/CreativeGallery';
import { ExportPanel } from './components/ExportPanel';

const initialState: WorkflowState = {
  step: 'intake',
  intake: emptyIntakeInput,
  concepts: [],
  selectedConceptIds: [],
  creatives: [],
};

export default function App() {
  const [state, setState] = useState<WorkflowState>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const selectedConcepts = useMemo(
    () => state.concepts.filter((concept) => state.selectedConceptIds.includes(concept.id)),
    [state.concepts, state.selectedConceptIds],
  );

  const analyze = () => {
    const nextErrors = validateIntake(state.intake);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const strategy = analyzeBusiness(state.intake);
    setState((current) => ({ ...current, step: 'strategy', strategy }));
  };

  const createConcepts = () => {
    if (!state.strategy) return;
    const concepts = generateConcepts(state.intake, state.strategy);
    setState((current) => ({ ...current, step: 'concepts', concepts, selectedConceptIds: [] }));
  };

  const toggleConcept = (id: string) => {
    setState((current) => {
      const selected = current.selectedConceptIds.includes(id);
      const selectedConceptIds = selected
        ? current.selectedConceptIds.filter((selectedId) => selectedId !== id)
        : current.selectedConceptIds.length < 3
          ? [...current.selectedConceptIds, id]
          : current.selectedConceptIds;
      return { ...current, selectedConceptIds };
    });
  };

  const createCreatives = () => {
    const creatives: CreativeVariant[] = generateCreatives(state.intake, selectedConcepts);
    setState((current) => ({ ...current, step: 'creatives', creatives }));
  };

  const prepareExport = () => setState((current) => ({ ...current, step: 'export' }));
  const reset = () => {
    setErrors({});
    setState(initialState);
  };

  return (
    <AppShell step={state.step}>
      {state.step === 'intake' ? (
        <IntakeForm
          value={state.intake}
          errors={errors}
          onChange={(intake) => setState((current) => ({ ...current, intake }))}
          onSubmit={analyze}
          onUseSample={() => {
            setErrors({});
            setState((current) => ({ ...current, intake: sampleSaasInput }));
          }}
        />
      ) : null}
      {state.step === 'strategy' && state.strategy ? <StrategySnapshotScreen strategy={state.strategy} onContinue={createConcepts} /> : null}
      {state.step === 'concepts' ? (
        <ConceptGallery concepts={state.concepts as AdConcept[]} selectedIds={state.selectedConceptIds} onToggle={toggleConcept} onCreate={createCreatives} />
      ) : null}
      {state.step === 'creatives' ? <CreativeGallery creatives={state.creatives} onExport={prepareExport} /> : null}
      {state.step === 'export' && state.strategy ? (
        <ExportPanel input={state.intake} strategy={state.strategy as StrategySnapshot} concepts={selectedConcepts} creatives={state.creatives} onReset={reset} />
      ) : null}
    </AppShell>
  );
}
