import type { AdConcept, CreativeVariant, IntakeInput, StrategySnapshot } from '../types/adWorkflow';

export function exportStrategyMarkdown(input: IntakeInput, strategy: StrategySnapshot) {
  return `# BetterYourAds strategy brief: ${input.productName}\n\n## Business summary\n${strategy.businessSummary}\n\n## Customer\n${strategy.customerSegment}\n\n## Pain points\n${bullets(strategy.painPoints)}\n\n## Desired outcomes\n${bullets(strategy.desiredOutcomes)}\n\n## Positioning angles\n${bullets(strategy.positioningAngles)}\n\n## Competitor gaps\n${bullets(strategy.competitorGaps)}\n\n## Message hierarchy\n${bullets(strategy.messageHierarchy)}\n`;
}

export function exportConceptsMarkdown(concepts: AdConcept[]) {
  return concepts
    .map(
      (concept) =>
        `## ${concept.angleName}\n- Hook: ${concept.hook}\n- Primary text: ${concept.primaryText}\n- Headline: ${concept.headline}\n- CTA: ${concept.cta}\n- Visual direction: ${concept.visualDirection}\n- Why it should work: ${concept.whyItShouldWork}\n- Risk to avoid: ${concept.riskToAvoid}`,
    )
    .join('\n\n');
}

export function exportCreativesJson(creatives: CreativeVariant[]) {
  return JSON.stringify(creatives, null, 2);
}

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}
