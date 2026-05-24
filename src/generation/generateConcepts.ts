import type { AdConcept, IntakeInput, StrategySnapshot } from '../types/adWorkflow';

export function generateConcepts(input: IntakeInput, strategy: StrategySnapshot): AdConcept[] {
  const product = input.productName.trim();
  const audience = input.targetCustomer.trim();
  const offer = input.offer.trim();
  const pain = strategy.painPoints[0];
  const outcome = strategy.desiredOutcomes[0];

  return [
    {
      id: 'pain-led-brief-sprawl',
      type: 'Pain-led',
      angleName: 'Stop running growth work from scattered notes',
      targetInsight: `${audience} feel the drag when launch work, feedback, and priorities live in separate places.`,
      hook: 'Your startup does not need another status meeting.',
      primaryText: `${pain} ${product} turns weekly priorities and customer signals into one clear operating brief. ${offer}`,
      headline: 'Replace scattered startup updates',
      cta: 'Start workspace audit',
      visualDirection: 'A quiet desk-style composition showing messy notes resolving into one clean weekly brief card.',
      whyItShouldWork: 'It names a familiar early-team pain before introducing the product as a practical operating fix.',
      riskToAvoid: 'Do not imply the product replaces strategy or leadership judgment.',
    },
    {
      id: 'outcome-led-weekly-clarity',
      type: 'Outcome-led',
      angleName: 'Weekly clarity for the whole SaaS team',
      targetInsight: `${audience} want alignment that feels lighter, not another process rollout.`,
      hook: 'Walk into Monday knowing what matters.',
      primaryText: `${product} helps early SaaS teams turn feedback, priorities, and updates into a clean weekly rhythm. ${outcome}`,
      headline: 'A calmer weekly operating rhythm',
      cta: 'Try the 14-day audit',
      visualDirection: 'Centered product-inspired brief with three crisp priority rows and generous off-white space.',
      whyItShouldWork: 'The ad sells the desired state rather than a feature list.',
      riskToAvoid: 'Avoid fake before/after numbers or productivity claims.',
    },
    {
      id: 'proof-led-built-for-seed-saas',
      type: 'Proof-led',
      angleName: 'Built around seed-stage operating cadence',
      targetInsight: 'Early teams trust tools that reflect their actual workflow and constraints.',
      hook: 'Built for the way seed-stage SaaS teams actually operate.',
      primaryText: `${product} connects customer feedback, team priorities, and founder updates so weekly planning becomes easier to review and act on. ${offer}`,
      headline: 'Purpose-built for seed-stage SaaS',
      cta: 'Review your workspace',
      visualDirection: 'Split composition: customer note, priority owner, and founder update aligned into one system.',
      whyItShouldWork: 'Specific audience fit creates credibility without fabricating customer logos or metrics.',
      riskToAvoid: 'Do not add testimonials, badges, or data that the user did not provide.',
    },
    {
      id: 'alternative-led-less-heavy',
      type: 'Alternative-led',
      angleName: 'The lighter alternative to heavyweight work tools',
      targetInsight: `${audience} may be using ${input.competitors || 'broad project tools'} but feel underserved by generic workflows.`,
      hook: 'If Asana feels too broad and spreadsheets feel too fragile.',
      primaryText: `${product} gives early SaaS teams an operating workspace shaped around launches, feedback, and weekly founder updates. ${offer}`,
      headline: 'A lighter operating workspace',
      cta: 'See the audit flow',
      visualDirection: 'Minimal comparison grid: heavy tool clutter on one side, focused operating brief on the other.',
      whyItShouldWork: 'It frames the product against familiar alternatives without attacking competitors.',
      riskToAvoid: 'Keep comparison factual and category-level; avoid legal or unsupported superiority claims.',
    },
    {
      id: 'speed-led-brief-in-hours',
      type: 'Speed-led',
      angleName: 'From scattered context to usable weekly brief fast',
      targetInsight: 'Small teams value implementation speed because process changes often fail when setup is heavy.',
      hook: 'Clean up next week’s operating rhythm before the next meeting.',
      primaryText: `${product} helps founders move from scattered customer notes and launch tasks to a reviewable weekly brief without rebuilding how the whole team works. ${offer}`,
      headline: 'Create a cleaner weekly brief',
      cta: 'Start the audit',
      visualDirection: 'Editorial card with a timeline from “scattered inputs” to “weekly brief ready”.',
      whyItShouldWork: 'It makes the CTA feel immediately achievable for busy founders.',
      riskToAvoid: 'Avoid promising exact setup times unless supplied by the company.',
    },
    {
      id: 'empathy-led-founder-load',
      type: 'Founder empathy-led',
      angleName: 'For founders tired of translating the same context twice',
      targetInsight: 'Founders often carry the burden of restating priorities to teams, customers, and investors.',
      hook: 'You should not have to rewrite the company’s priorities every Friday.',
      primaryText: `${product} keeps weekly priorities, customer signals, and founder updates in one clear operating layer for early SaaS teams. ${offer}`,
      headline: 'Less priority translation for founders',
      cta: 'Try a workspace audit',
      visualDirection: 'Founder note card turning into a polished internal update, restrained and human rather than cartoonish.',
      whyItShouldWork: 'It connects emotionally with the founder workload while staying concrete.',
      riskToAvoid: 'Do not overdramatize burnout or use manipulative founder imagery.',
    },
  ];
}
