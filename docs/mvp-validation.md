# BetterYourAds MVP validation

This MVP implements the official guided strategy-to-creative workflow for SaaS/startup Meta static ad creatives.

## Implemented scope

- React + TypeScript + Tailwind app entrypoint and base styles.
- Domain model for intake, strategy snapshots, ad concepts, creative variants, and workflow state.
- Realistic fictional B2B SaaS sample input.
- Field-level intake validation with tests.
- Deterministic local generation modules:
  - `analyzeBusiness`
  - `generateConcepts` returning exactly six concepts
  - `generateCreatives` returning up to three static variants
  - provider seam without SDKs, secrets, or external calls
- Warm minimal UI primitives, app shell, progress steps, intake form, strategy snapshot, concept gallery, creative previews, and export panel.
- Export helpers for markdown strategy, markdown concepts, and JSON creative specs.

## Validation commands

Run before handoff:

```sh
npm test
npm run lint
npm run build
```

## Manual demo path

1. Start the app with `npm run dev`.
2. Click `Use sample SaaS input`.
3. Click `Analyze business context`.
4. Review the strategy snapshot and generate concepts.
5. Select up to three concepts.
6. Create static ads and inspect the preview cards.
7. Prepare export and copy the generated handoff content.

## Scope boundaries

- No ecommerce workflow.
- No video or non-Meta platform UI.
- No auth, billing, database, provider SDK, or API key usage.
- No fake performance metrics, campaign launch actions, or provider-generated image claims.
