import { describe, expect, it } from 'vitest';
import { sampleSaasInput } from '../../src/data/sampleInputs';
import { analyzeBusiness } from '../../src/generation/analyzeBusiness';
import { generateConcepts } from '../../src/generation/generateConcepts';
import { generateCreatives } from '../../src/generation/generateCreatives';

describe('generateCreatives', () => {
  it('creates up to three variants with distinct layouts', () => {
    const concepts = generateConcepts(sampleSaasInput, analyzeBusiness(sampleSaasInput));
    const creatives = generateCreatives(sampleSaasInput, concepts.slice(0, 3));
    expect(creatives).toHaveLength(3);
    expect(creatives.map((creative) => creative.layout)).toEqual(['editorial-card', 'split-proof', 'outcome-checklist']);
    expect(creatives.every((creative) => creative.format === '1:1 feed')).toBe(true);
  });

  it('uses fallback colors when supplied colors are invalid', () => {
    const concepts = generateConcepts(sampleSaasInput, analyzeBusiness(sampleSaasInput));
    const [creative] = generateCreatives({ ...sampleSaasInput, primaryColor: 'blue', secondaryColor: 'tan' }, concepts.slice(0, 1));
    expect(creative.colors.primary).toBe('#205f73');
    expect(creative.colors.secondary).toBe('#f1e8d9');
  });
});
