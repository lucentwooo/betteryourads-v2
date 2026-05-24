import { describe, expect, it } from 'vitest';
import { emptyIntakeInput, sampleSaasInput } from '../../src/data/sampleInputs';
import { validateIntake } from '../../src/lib/validation';

describe('validateIntake', () => {
  it('returns field-level errors for required SaaS ad context', () => {
    const errors = validateIntake(emptyIntakeInput);
    expect(errors.productName).toContain('company or product');
    expect(errors.valueProposition).toContain('SaaS product');
    expect(errors.targetCustomer).toContain('SaaS/startup customer');
    expect(errors.offer).toContain('call to action');
  });

  it('accepts the sample SaaS input', () => {
    expect(validateIntake(sampleSaasInput)).toEqual({});
  });

  it('validates optional URL and brand colors when present', () => {
    const errors = validateIntake({ ...sampleSaasInput, websiteUrl: 'not-a-url', primaryColor: 'blue' });
    expect(errors.websiteUrl).toContain('valid website URL');
    expect(errors.primaryColor).toContain('hex color');
  });
});
