export type BrandTone = 'calm' | 'direct' | 'technical' | 'friendly' | 'premium';

export type IntakeInput = {
  websiteUrl: string;
  productName: string;
  valueProposition: string;
  targetCustomer: string;
  offer: string;
  differentiators: string;
  competitors: string;
  brandTone: BrandTone;
  primaryColor: string;
  secondaryColor: string;
  logoText: string;
  visualCues: string;
};

export type StrategySnapshot = {
  businessSummary: string;
  customerSegment: string;
  painPoints: string[];
  desiredOutcomes: string[];
  positioningAngles: string[];
  competitorGaps: string[];
  messageHierarchy: string[];
};

export type ConceptType =
  | 'Pain-led'
  | 'Outcome-led'
  | 'Proof-led'
  | 'Alternative-led'
  | 'Speed-led'
  | 'Founder empathy-led';

export type AdConcept = {
  id: string;
  type: ConceptType;
  angleName: string;
  targetInsight: string;
  hook: string;
  primaryText: string;
  headline: string;
  cta: string;
  visualDirection: string;
  whyItShouldWork: string;
  riskToAvoid: string;
};

export type CreativeLayout = 'editorial-card' | 'split-proof' | 'outcome-checklist';

export type CreativeVariant = {
  id: string;
  conceptId: string;
  layout: CreativeLayout;
  format: '1:1 feed';
  headline: string;
  eyebrow: string;
  body: string;
  cta: string;
  proofLine: string;
  checklist: string[];
  visualNotes: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
};

export type WorkflowStep = 'intake' | 'strategy' | 'concepts' | 'creatives' | 'export';

export type WorkflowState = {
  step: WorkflowStep;
  intake: IntakeInput;
  strategy?: StrategySnapshot;
  concepts: AdConcept[];
  selectedConceptIds: string[];
  creatives: CreativeVariant[];
};
