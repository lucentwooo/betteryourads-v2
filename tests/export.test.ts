import { describe, expect, it } from 'vitest';
import { sampleSaasInput } from '../src/data/sampleInputs';
import { analyzeBusiness } from '../src/generation/analyzeBusiness';
import { generateConcepts } from '../src/generation/generateConcepts';
import { generateCreatives } from '../src/generation/generateCreatives';
import { exportConceptsMarkdown, exportCreativesJson, exportStrategyMarkdown } from '../src/lib/export';

describe('export utilities', () => {
  it('exports strategy, selected concepts, and creative specs', () => {
    const strategy = analyzeBusiness(sampleSaasInput);
    const concepts = generateConcepts(sampleSaasInput, strategy).slice(0, 2);
    const creatives = generateCreatives(sampleSaasInput, concepts);
    expect(exportStrategyMarkdown(sampleSaasInput, strategy)).toContain('# BetterYourAds strategy brief: Northstar Ops');
    expect(exportConceptsMarkdown(concepts)).toContain('Hook:');
    expect(JSON.parse(exportCreativesJson(creatives))).toHaveLength(2);
  });
});
