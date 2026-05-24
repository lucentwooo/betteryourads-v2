import type { AdConcept, CreativeVariant, IntakeInput, StrategySnapshot } from '../types/adWorkflow';

export type GenerationProvider = {
  analyzeBusiness(input: IntakeInput): Promise<StrategySnapshot> | StrategySnapshot;
  generateConcepts(input: IntakeInput, strategy: StrategySnapshot): Promise<AdConcept[]> | AdConcept[];
  generateCreatives(
    input: IntakeInput,
    concepts: AdConcept[],
  ): Promise<CreativeVariant[]> | CreativeVariant[];
};

export const localProviderNotice =
  'BetterYourAds MVP uses deterministic local generation only. No external provider calls are made.';
