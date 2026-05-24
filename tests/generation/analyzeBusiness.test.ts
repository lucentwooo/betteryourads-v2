import { describe, expect, it } from 'vitest';
import { sampleSaasInput } from '../../src/data/sampleInputs';
import { analyzeBusiness } from '../../src/generation/analyzeBusiness';

describe('analyzeBusiness', () => {
  it('creates a specific strategy snapshot from business context', () => {
    const strategy = analyzeBusiness(sampleSaasInput);
    expect(strategy.businessSummary).toContain(sampleSaasInput.productName);
    expect(strategy.customerSegment).toContain('Seed-stage B2B SaaS');
    expect(strategy.messageHierarchy.join(' ')).toContain(sampleSaasInput.offer);
    expect(strategy.painPoints).toHaveLength(3);
    expect(strategy.desiredOutcomes).toHaveLength(3);
    expect(strategy.positioningAngles).toHaveLength(3);
  });
});
