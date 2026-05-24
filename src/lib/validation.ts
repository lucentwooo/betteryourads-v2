import type { IntakeInput } from '../types/adWorkflow';

export type ValidationErrors = Partial<Record<keyof IntakeInput, string>>;

const required: Array<keyof IntakeInput> = ['productName', 'valueProposition', 'targetCustomer', 'offer'];

export function validateIntake(input: IntakeInput): ValidationErrors {
  const errors: ValidationErrors = {};
  for (const field of required) {
    if (!input[field].trim()) {
      errors[field] = fieldError(field);
    }
  }

  if (input.websiteUrl.trim()) {
    try {
      const parsed = new URL(input.websiteUrl.trim());
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        errors.websiteUrl = 'Enter a website URL that starts with http:// or https://.';
      }
    } catch {
      errors.websiteUrl = 'Enter a valid website URL, or leave it blank.';
    }
  }

  if (input.primaryColor && !isHex(input.primaryColor)) {
    errors.primaryColor = 'Use a hex color such as #205f73.';
  }
  if (input.secondaryColor && !isHex(input.secondaryColor)) {
    errors.secondaryColor = 'Use a hex color such as #f1e8d9.';
  }

  return errors;
}

export function isIntakeValid(input: IntakeInput) {
  return Object.keys(validateIntake(input)).length === 0;
}

function fieldError(field: keyof IntakeInput) {
  switch (field) {
    case 'productName':
      return 'Enter the company or product name.';
    case 'valueProposition':
      return 'Describe what the SaaS product helps customers do.';
    case 'targetCustomer':
      return 'Describe the SaaS/startup customer this ad should reach.';
    case 'offer':
      return 'Add the offer or call to action for the Meta ad.';
    default:
      return 'This field needs a value.';
  }
}

function isHex(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value.trim());
}
