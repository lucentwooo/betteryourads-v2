import { describe, expect, it } from 'vitest';
import { sampleSaasInput } from '../../src/data/sampleInputs';
import { analyzeBusiness } from '../../src/generation/analyzeBusiness';
import { generateConcepts } from '../../src/generation/generateConcepts';

describe('generateConcepts', () => {
  it('returns exactly six distinct SaaS Meta ad concepts', () => {
    const concepts = generateConcepts(sampleSaasInput, analyzeBusiness(sampleSaasInput));
    expect(concepts).toHaveLength(6);
    expect(new Set(concepts.map((concept) => concept.hook)).size).toBe(6);
    expect(new Set(concepts.map((concept) => concept.headline)).size).toBe(6);
    for (const concept of concepts) {
      expect(concept.angleName).toBeTruthy();
      expect(concept.primaryText).toContain(sampleSaasInput.productName);
      expect(concept.cta).toBeTruthy();
      expect(concept.visualDirection).toBeTruthy();
      expect(concept.whyItShouldWork).toBeTruthy();
      expect(concept.riskToAvoid).toBeTruthy();
    }
  });
});
