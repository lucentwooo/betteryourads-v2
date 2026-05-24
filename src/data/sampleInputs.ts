import type { IntakeInput } from '../types/adWorkflow';

export const emptyIntakeInput: IntakeInput = {
  websiteUrl: '',
  productName: '',
  valueProposition: '',
  targetCustomer: '',
  offer: '',
  differentiators: '',
  competitors: '',
  brandTone: 'calm',
  primaryColor: '#1f5f8b',
  secondaryColor: '#f2ede4',
  logoText: '',
  visualCues: '',
};

export const sampleSaasInput: IntakeInput = {
  websiteUrl: 'https://northstarops.example',
  productName: 'Northstar Ops',
  valueProposition:
    'Northstar Ops gives seed-stage SaaS teams one calm workspace for weekly priorities, customer feedback, launch tasks, and founder updates so work stays visible without adding project-management overhead.',
  targetCustomer:
    'Seed-stage B2B SaaS founders and first operations hires managing a 6-25 person team across product, sales, and customer success.',
  offer:
    'Start a free 14-day workspace audit and leave with a cleaner operating rhythm for the next weekly meeting.',
  differentiators:
    'Built for startup operating cadence, combines customer feedback with team priorities, creates investor-ready weekly updates, lighter than Jira or Asana.',
  competitors: 'Asana, Linear, Notion templates, spreadsheets, status meetings',
  brandTone: 'direct',
  primaryColor: '#205f73',
  secondaryColor: '#f1e8d9',
  logoText: 'Northstar Ops',
  visualCues:
    'Warm off-white workspace, crisp blue-green accents, structured weekly brief cards, no charts unless tied to real operating data.',
};
