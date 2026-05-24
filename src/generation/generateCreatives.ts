import type { AdConcept, CreativeLayout, CreativeVariant, IntakeInput } from '../types/adWorkflow';

const layouts: CreativeLayout[] = ['editorial-card', 'split-proof', 'outcome-checklist'];

export function generateCreatives(input: IntakeInput, selectedConcepts: AdConcept[]): CreativeVariant[] {
  return selectedConcepts.slice(0, 3).map((concept, index) => ({
    id: `creative-${concept.id}`,
    conceptId: concept.id,
    layout: layouts[index],
    format: '1:1 feed',
    eyebrow: concept.type.replace('-led', ' angle'),
    headline: concept.hook,
    body: concept.primaryText,
    cta: concept.cta,
    proofLine: proofLine(input, concept),
    checklist: checklist(input, concept),
    visualNotes: concept.visualDirection,
    colors: {
      primary: validHex(input.primaryColor) ? input.primaryColor : '#205f73',
      secondary: validHex(input.secondaryColor) ? input.secondaryColor : '#f1e8d9',
      background: '#fffdf8',
    },
  }));
}

function proofLine(input: IntakeInput, concept: AdConcept) {
  if (concept.type === 'Proof-led') {
    return `${input.productName} is shaped around ${input.targetCustomer}.`;
  }
  return concept.whyItShouldWork;
}

function checklist(input: IntakeInput, concept: AdConcept) {
  return [
    `Built for ${input.targetCustomer.split(' ').slice(0, 5).join(' ')}`,
    concept.headline,
    input.offer,
  ];
}

function validHex(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value.trim());
}
