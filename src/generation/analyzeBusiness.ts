import type { IntakeInput, StrategySnapshot } from '../types/adWorkflow';

export function analyzeBusiness(input: IntakeInput): StrategySnapshot {
  const product = input.productName.trim();
  const audience = input.targetCustomer.trim();
  const offer = input.offer.trim();
  const differentiators = splitList(input.differentiators);
  const competitors = splitList(input.competitors);

  return {
    businessSummary: `${product} helps ${audience} by ${lowerFirst(input.valueProposition.trim())}`,
    customerSegment: audience,
    painPoints: [
      'Important launch and customer work gets scattered across meetings, documents, and project boards.',
      'Founders need clearer weekly operating rhythm without introducing heavy process.',
      `The team is comparing options like ${competitors.slice(0, 3).join(', ') || 'generic tools'} but needs a SaaS-specific workflow.`,
    ],
    desiredOutcomes: [
      'A clearer weekly view of priorities, ownership, and customer signals.',
      'Less time translating internal work into founder, team, or investor updates.',
      `Enough confidence to take the next step: ${offer}.`,
    ],
    positioningAngles: [
      `${product} as the lightweight operating layer for early SaaS teams.`,
      `A calmer alternative to ${competitors[0] || 'heavy project-management suites'} for founder-led teams.`,
      differentiators[0]
        ? `Lead with ${lowerFirst(differentiators[0])}.`
        : 'Lead with practical specificity rather than generic productivity promises.',
    ],
    competitorGaps: [
      'Generic work-management tools rarely connect customer feedback to weekly priorities.',
      'Template-based systems require ongoing manual upkeep before teams see value.',
      'Heavy project tools can make early teams feel slower rather than more aligned.',
    ],
    messageHierarchy: [
      `Primary promise: ${input.valueProposition.trim()}`,
      `Audience proof: built for ${audience}.`,
      `Action: ${offer}.`,
    ],
  };
}

export function splitList(value: string): string[] {
  return value
    .split(/,|\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function lowerFirst(value: string) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}
