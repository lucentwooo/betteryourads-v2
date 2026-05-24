# BetterYourAds MVP Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a polished SaaS/startup-focused MVP that turns a company website/business brief into strategic Meta static ad concepts and exportable static ad creative previews.

**Architecture:** Start with a self-contained web app that proves the product workflow end-to-end before adding production AI/image-provider complexity. Keep generation logic behind small domain modules and provider seams so later subagents can replace deterministic/mock generation with real LLM/image services without rewriting the UI.

**Tech Stack:** Assumption for execution: Vite + React + TypeScript + Tailwind CSS + Vitest + React Testing Library. This repo is currently a clean scaffold with only `AGENTS.md`; confirm this stack before executing if the user has a hidden preference.

---

## Repo Inspection Summary

Inspected on 2026-05-24.

Current repository state:
- Branch: `main`
- Root: `/Users/lucentwu/Documents/Projects/betteryourads-v2`
- Existing project files: `AGENTS.md` only, plus `.git/`
- No `package.json`, app source, test setup, or build system exists yet.

Relevant product constraints from `AGENTS.md`:
- Focus on SaaS/startups, Meta ads, static image creatives.
- In scope: business/website understanding, customer/competitor/offer/positioning analysis, high-quality Meta ad concepts, static image ad creative generation, on-brand polished output.
- Out of scope by default: ecommerce, video ads, non-Meta platforms, automated campaign launch, performance feedback loops.
- Product should feel clear, calm, modern, practical, Notion-inspired, not like a generic AI image generator or prompt wrapper.

---

## Brainstorm: 3 Possible MVP Shapes

### Shape 1: Guided Strategy-to-Creative Web App

A polished single-page app with a structured intake, generated brand/business analysis, 6 Meta ad concepts, and 3 static ad creative previews using a deterministic local generator. It emphasizes the product workflow and has clean seams for future AI providers.

**User flow:**
1. Enter website URL, business summary, target customer, offer, brand tone, and optional competitor/reference notes.
2. Review generated business snapshot: positioning, customer pain points, proof points, competitor angle gaps.
3. Choose from generated Meta ad concepts.
4. View static ad creative previews for selected concepts.
5. Export/copy strategy and creative specs.

**Speed to MVP:** High. Can ship with local generation and no external API keys.

**Product polish:** High if scoped to one focused workflow and a small set of well-designed screens.

**UX quality:** High. The workflow makes the product feel systematic rather than prompt-based.

**Scalability:** Medium-high. Domain modules and provider seams let real LLM/image generation be added later.

**Strategic fit:** Very high. Directly matches the SaaS/startup Meta static ad creative MVP.

### Shape 2: Creative Brief Generator + Static PDF/Markdown Output

A form produces a detailed ad strategy brief and creative directions, but not an interactive creative preview app. Outputs are copyable Markdown and optionally printable/exportable.

**User flow:**
1. Enter company context.
2. Generate ad strategy and concept list.
3. Copy/download brief.

**Speed to MVP:** Very high. Minimal UI and no design surface.

**Product polish:** Medium. Can look clean, but feels more like a document tool than a product.

**UX quality:** Medium. Useful, but not enough visual payoff for an ad creative platform.

**Scalability:** Medium. Good content modules, but creative-preview surface must be added later.

**Strategic fit:** Medium. Strong for strategy, weak for static creative generation.

### Shape 3: Visual Creative Studio First

A polished gallery/editor for ad creative layouts with manual inputs and template-style cards. Strategy generation is secondary or stubbed.

**User flow:**
1. Enter headline, offer, proof, CTA, and brand colors.
2. Browse static ad layout variants.
3. Export selected creatives.

**Speed to MVP:** Medium. Polished visual editor/layouts take time.

**Product polish:** Potentially high visually, but easy to drift into a Canva/template-library feel.

**UX quality:** Medium-high for editing, lower for strategy.

**Scalability:** Medium. Layout system can scale, but strategic differentiation is underbuilt.

**Strategic fit:** Medium. Risks missing the core promise: better ad strategy from business context.

## Comparison Matrix

| Criterion | Shape 1: Guided Strategy-to-Creative App | Shape 2: Brief Generator | Shape 3: Visual Studio First |
|---|---:|---:|---:|
| Speed to MVP | 4/5 | 5/5 | 3/5 |
| Product polish | 4/5 | 3/5 | 4/5 |
| UX quality | 5/5 | 3/5 | 4/5 |
| Scalability | 4/5 | 3/5 | 3/5 |
| Strategic fit | 5/5 | 3/5 | 3/5 |
| Risk | Medium | Low | High |

## Chosen Approach

Choose Shape 1: Guided Strategy-to-Creative Web App.

Rationale:
- It best balances speed, polish, UX, scalability, and strategic fit.
- It directly demonstrates the durable product idea: business context -> ad strategy -> static creative output.
- It avoids premature third-party commitments by starting with deterministic local generation while preserving provider boundaries.
- It avoids becoming a generic image generator by making strategy, specificity, and concept quality the center of the flow.

Key MVP scope:
- One polished web workflow.
- SaaS/startup-only copy and examples.
- Meta static ad concepts only.
- Deterministic generation modules with strong product-aware heuristics.
- Static HTML/CSS creative cards, not AI-generated bitmap images yet.
- Export as copyable text/JSON and browser screenshot/print-friendly creative previews. PNG export can be a later task unless explicitly requested.

Non-goals for this plan:
- Authentication.
- Database persistence.
- Billing.
- Real web scraping.
- Real LLM/image API integration.
- Video ads.
- Ecommerce-specific flows.
- Campaign launch or performance optimization loop.

---

## Proposed Product Workflow

### Screen 1: Intake

Fields:
- Website URL
- Company/product name
- One-line value proposition
- Target customer
- Main offer or CTA
- Key differentiators/proof points
- Competitors or alternatives
- Brand tone: calm, bold, technical, friendly, premium
- Visual cues: primary color, secondary color, optional logo URL/text mark

UX notes:
- Use practical helper text, not AI hype.
- Include a sample SaaS input to make the workflow obvious.
- Validation should guide users to provide enough context without feeling bureaucratic.

### Screen 2: Strategy Snapshot

Generated sections:
- Business context summary
- Best-fit customer segment
- Pain points and desired outcomes
- Positioning angles
- Competitor/alternative gaps
- Message hierarchy

UX notes:
- Present as an editable/reviewable briefing panel.
- Make it feel like considered strategy, not random text.

### Screen 3: Meta Ad Concepts

Generate 6 concepts, each with:
- Angle name
- Target insight
- Hook
- Primary text
- Headline
- CTA
- Visual direction
- Why it should work
- Risk/avoid note

UX notes:
- Let the user select 3 concepts for creative preview.
- Show concept variety: pain-led, outcome-led, proof-led, comparison-led, founder-friendly, urgency/test-led.

### Screen 4: Static Creative Previews

Generate 3 visual ad previews from selected concepts:
- Square 1:1 format by default.
- Brand color controls from intake.
- Text hierarchy: hook, supporting line, proof/offer, CTA.
- Layout variants: editorial card, split proof panel, checklist/outcome card.

UX notes:
- Use HTML/CSS visual cards that are polished enough for MVP demo.
- Include Meta placement note: static feed creative preview, not a launched campaign.

### Screen 5: Export/Next Steps

Outputs:
- Copy selected ad copy.
- Copy creative spec as JSON.
- Print/save browser page for review.
- Clear next-step checklist: refine concept, test variants, hand off to designer/media buyer.

---

## Target File Structure

Likely files to create:

```text
package.json
tsconfig.json
tsconfig.node.json
vite.config.ts
vitest.config.ts
index.html
postcss.config.js
tailwind.config.ts
.eslintrc.cjs
.prettierrc
.env.example
src/main.tsx
src/App.tsx
src/styles/index.css
src/types/adWorkflow.ts
src/data/sampleInputs.ts
src/lib/cn.ts
src/lib/validation.ts
src/lib/export.ts
src/generation/analyzeBusiness.ts
src/generation/generateConcepts.ts
src/generation/generateCreatives.ts
src/generation/providers.ts
src/components/AppShell.tsx
src/components/ProgressSteps.tsx
src/components/IntakeForm.tsx
src/components/StrategySnapshot.tsx
src/components/ConceptCard.tsx
src/components/ConceptGallery.tsx
src/components/CreativePreviewCard.tsx
src/components/CreativeGallery.tsx
src/components/ExportPanel.tsx
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/components/ui/Field.tsx
src/components/ui/Textarea.tsx
src/components/ui/Badge.tsx
src/components/ui/EmptyState.tsx
tests/lib/validation.test.ts
tests/generation/analyzeBusiness.test.ts
tests/generation/generateConcepts.test.ts
tests/generation/generateCreatives.test.ts
tests/export.test.ts
src/App.test.tsx
```

Likely files to modify:
- `AGENTS.md`: only if canonical commands change after stack setup. Keep changes minimal and only update the Commands section if execution confirms commands work.

---

## Implementation Phases

### Phase 0: Pre-flight and Stack Confirmation

**Objective:** Avoid hidden assumptions before creating the scaffold.

Tasks:
1. Confirm the repo still only has `AGENTS.md` and no existing hidden app code.
2. Confirm the user accepts Vite + React + TypeScript + Tailwind + Vitest.
3. If accepted, proceed. If not, update this plan before execution.

Validation:
- `git status --short` shows only intended plan file before implementation starts.
- No app code is created in plan mode.

Acceptance criteria:
- Stack and MVP shape are explicit.
- Execution has a clear go/no-go checkpoint.

### Phase 1: Project Scaffold and Tooling

**Objective:** Create the web app foundation and canonical commands.

#### Task 1.1: Create package and TypeScript config

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`

**Steps:**
1. Create `package.json` with scripts: `dev`, `build`, `preview`, `test`, `test:watch`, `lint`, `format`.
2. Add dependencies: React, React DOM.
3. Add dev dependencies: TypeScript, Vite, Vitest, React Testing Library, jsdom, Tailwind, PostCSS, Autoprefixer, ESLint, Prettier.
4. Create strict TypeScript configs.
5. Run `npm install`.
6. Run `npm run build` and expect scaffold-related missing files until later tasks, or defer build until Task 1.4 if source files do not exist yet.

**Tests/validation:**
- `npm install` completes.
- `npm run test -- --run` should be available after Vitest config is added in Task 1.2.

**Subagent note:** Do not add application behavior in this task.

#### Task 1.2: Add Vite, Vitest, Tailwind, and formatting config

**Files:**
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.eslintrc.cjs`
- Create: `.prettierrc`
- Create: `.env.example`

**Steps:**
1. Configure Vite React plugin.
2. Configure Vitest with `jsdom`, globals, and setup if needed.
3. Configure Tailwind content paths for `index.html` and `src/**/*.{ts,tsx}`.
4. Add `.env.example` with no secrets and comments for future optional providers.
5. Run `npm run lint` once script exists; expect pass after minimal source exists, or defer if no source.

**Tests/validation:**
- Config files parse.
- No secrets or real provider keys are committed.

#### Task 1.3: Create app entrypoint and base styles

**Files:**
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/index.css`

**Steps:**
1. Add root HTML with product title.
2. Mount React app in `src/main.tsx`.
3. Create a minimal `App` that renders product name and placeholder workflow text.
4. Add Tailwind base styles and CSS variables for a calm, Notion-inspired palette.
5. Run `npm run build`.

**Tests/validation:**
- `npm run build` passes.
- `npm run dev` starts locally if manually checked.

#### Task 1.4: Add app smoke test

**Files:**
- Create: `src/App.test.tsx`

**Steps:**
1. Test that the app renders `BetterYourAds` and the workflow placeholder.
2. Run `npm run test -- --run src/App.test.tsx`.
3. Run `npm run build`.

**Tests/validation:**
- Smoke test passes.
- Build passes.

### Phase 2: Domain Types, Sample Data, and Validation

**Objective:** Define the MVP data model before UI and generation logic.

#### Task 2.1: Define workflow types

**Files:**
- Create: `src/types/adWorkflow.ts`

**Types to include:**
- `BrandTone`
- `IntakeInput`
- `StrategySnapshot`
- `AdConcept`
- `CreativeVariant`
- `WorkflowState`

**Steps:**
1. Define narrow fields matching the screens above.
2. Keep types provider-agnostic.
3. Add comments only where they clarify product meaning.
4. Run `npm run build`.

**Tests/validation:**
- TypeScript build passes.

#### Task 2.2: Add realistic sample SaaS input

**Files:**
- Create: `src/data/sampleInputs.ts`

**Steps:**
1. Add one high-quality sample input for a fictional B2B SaaS product.
2. Keep sample narrow: startup/SaaS, Meta ads, static creative.
3. Avoid ecommerce/video/platform-general examples.
4. Export `sampleSaasInput`.

**Tests/validation:**
- TypeScript build passes.

#### Task 2.3: Implement validation utilities with tests

**Files:**
- Create: `src/lib/validation.ts`
- Create: `tests/lib/validation.test.ts`

**Behavior:**
- `validateIntakeInput(input)` returns field-level errors.
- Required fields: company/product name, value proposition, target customer, offer/CTA.
- Website URL is optional but must be valid if present.
- Proof points and competitors can be optional but should support arrays or newline text normalization.

**Steps:**
1. Write tests for valid sample input.
2. Write tests for missing required fields.
3. Write tests for invalid URL.
4. Implement the smallest validation utility.
5. Run `npm run test -- --run tests/lib/validation.test.ts`.

**Tests/validation:**
- Validation tests pass.
- Build passes.

### Phase 3: Generation Modules

**Objective:** Build deterministic generation that feels product-specific while keeping provider seams.

#### Task 3.1: Add provider interface seam

**Files:**
- Create: `src/generation/providers.ts`

**Behavior:**
- Export interfaces/functions that describe future generation providers without adding real external calls.
- Include a `LocalGenerationProvider` shape or object that calls deterministic local functions once they exist.

**Steps:**
1. Define provider contract methods: `analyzeBusiness`, `generateConcepts`, `generateCreatives`.
2. Keep provider input/output types imported from `src/types/adWorkflow.ts`.
3. Add TODO comments only for explicit future provider integration.
4. Run build.

**Tests/validation:**
- Build passes.
- No API keys or SDK dependencies added.

#### Task 3.2: Implement business analysis generator with tests

**Files:**
- Create: `src/generation/analyzeBusiness.ts`
- Create: `tests/generation/analyzeBusiness.test.ts`

**Behavior:**
- `analyzeBusiness(input)` returns a `StrategySnapshot` with:
  - concise business summary
  - customer segment
  - pain points
  - desired outcomes
  - positioning angles
  - competitor/alternative gaps
  - message hierarchy

**Steps:**
1. Write tests using `sampleSaasInput`.
2. Assert the output references the company/product, target customer, and offer.
3. Assert at least 3 pain points, 3 outcomes, 3 positioning angles.
4. Implement deterministic heuristics.
5. Run targeted tests.

**Tests/validation:**
- `npm run test -- --run tests/generation/analyzeBusiness.test.ts` passes.
- Output is SaaS/startup-specific and not ecommerce/video-oriented.

#### Task 3.3: Implement ad concept generator with tests

**Files:**
- Create: `src/generation/generateConcepts.ts`
- Create: `tests/generation/generateConcepts.test.ts`

**Behavior:**
- `generateConcepts(input, snapshot)` returns exactly 6 concepts.
- Concept angle types should include:
  1. Pain-led
  2. Outcome-led
  3. Proof-led
  4. Alternative/comparison-led
  5. Speed/workflow-led
  6. Founder/team empathy-led
- Each concept includes hook, primary text, headline, CTA, visual direction, why it should work, and risk/avoid note.

**Steps:**
1. Write tests for concept count and required fields.
2. Write tests that hooks/headlines are distinct.
3. Write tests that concepts mention the target customer or offer.
4. Implement deterministic templates with input interpolation.
5. Run targeted tests.

**Tests/validation:**
- `npm run test -- --run tests/generation/generateConcepts.test.ts` passes.
- Concepts feel like Meta static ad concepts, not generic ad copy.

#### Task 3.4: Implement creative variant generator with tests

**Files:**
- Create: `src/generation/generateCreatives.ts`
- Create: `tests/generation/generateCreatives.test.ts`

**Behavior:**
- `generateCreatives(input, selectedConcepts)` returns up to 3 `CreativeVariant` objects.
- Layout variants: `editorial-card`, `split-proof`, `outcome-checklist`.
- Include visual tokens: background color, accent color, text color, CTA style, layout ID.
- Include card copy: eyebrow, hero hook, support line, proof/offer, CTA.

**Steps:**
1. Write tests for 3 selected concepts -> 3 creative variants.
2. Write tests for fallback colors if user omits visual cues.
3. Write tests that variants use different layouts.
4. Implement deterministic creative mapping.
5. Run targeted tests.

**Tests/validation:**
- `npm run test -- --run tests/generation/generateCreatives.test.ts` passes.
- Variants are static-image-friendly.

### Phase 4: UI System and App Shell

**Objective:** Create polished reusable UI primitives and workflow layout.

#### Task 4.1: Add utility and base UI components

**Files:**
- Create: `src/lib/cn.ts`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Field.tsx`
- Create: `src/components/ui/Textarea.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/EmptyState.tsx`

**Steps:**
1. Implement `cn(...classes)` helper.
2. Create simple, accessible components with className overrides.
3. Use native HTML elements; avoid introducing a component library dependency.
4. Run build.

**Tests/validation:**
- Build passes.
- Components are small and readable.

#### Task 4.2: Add app shell and progress steps

**Files:**
- Create: `src/components/AppShell.tsx`
- Create: `src/components/ProgressSteps.tsx`
- Modify: `src/App.tsx`

**Steps:**
1. Build a calm app shell with header, main content, and right-side/summary panel if viewport allows.
2. Add progress steps: Intake, Strategy, Concepts, Creatives, Export.
3. Wire `App.tsx` to render shell with placeholder children.
4. Update smoke test to assert progress labels.
5. Run app test and build.

**Tests/validation:**
- `npm run test -- --run src/App.test.tsx` passes.
- `npm run build` passes.

### Phase 5: Intake and Strategy Screens

**Objective:** Let users enter context and see a generated strategy snapshot.

#### Task 5.1: Build intake form

**Files:**
- Create: `src/components/IntakeForm.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Behavior:**
- Renders all intake fields.
- Includes `Use sample SaaS input` action.
- Validates on submit.
- Calls `onSubmit(input)` when valid.

**Steps:**
1. Add test for rendering key fields.
2. Add test for sample input button if practical.
3. Implement controlled form state.
4. Use validation utility.
5. Run tests and build.

**Tests/validation:**
- App test passes.
- Manual validation: submit empty form shows helpful errors.

#### Task 5.2: Build strategy snapshot panel

**Files:**
- Create: `src/components/StrategySnapshot.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Behavior:**
- Shows generated business summary, customer, pain points, outcomes, positioning angles, competitor gaps, and message hierarchy.
- Has a clear action to continue to concepts.

**Steps:**
1. Add test that sample flow shows strategy section after generation.
2. Implement component with section cards.
3. Wire `analyzeBusiness` in `App.tsx` after valid intake submit.
4. Run tests and build.

**Tests/validation:**
- Sample input can progress to strategy.
- Strategy copy uses product-aware labels.

### Phase 6: Concept Gallery

**Objective:** Generate and select Meta ad concepts.

#### Task 6.1: Build concept card component

**Files:**
- Create: `src/components/ConceptCard.tsx`

**Behavior:**
- Displays concept angle, hook, primary text, headline, CTA, visual direction, why it works, risk note.
- Supports selected/unselected state.

**Steps:**
1. Implement presentational component.
2. Keep styling consistent with UI system.
3. Run build.

**Tests/validation:**
- Build passes.

#### Task 6.2: Build concept gallery and selection behavior

**Files:**
- Create: `src/components/ConceptGallery.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Behavior:**
- Generates 6 concepts from snapshot.
- Allows selecting up to 3 concepts.
- Shows helper text explaining why 3 are selected for preview.
- Continue button enabled only when at least 1 concept is selected.

**Steps:**
1. Add test for generated concept count using sample input.
2. Add test for selection limit if practical.
3. Implement gallery state.
4. Wire `generateConcepts` in `App.tsx`.
5. Run tests and build.

**Tests/validation:**
- Concepts appear after strategy.
- Selection behavior is clear and accessible.

### Phase 7: Static Creative Previews

**Objective:** Render selected concepts as polished static ad previews.

#### Task 7.1: Build creative preview card

**Files:**
- Create: `src/components/CreativePreviewCard.tsx`

**Behavior:**
- Renders square static ad creative preview with layout-specific styling.
- Supports `editorial-card`, `split-proof`, and `outcome-checklist`.
- Includes visible Meta static feed preview label outside the creative itself.

**Steps:**
1. Implement layout rendering based on `CreativeVariant.layout`.
2. Use inline CSS variables or style props for brand colors.
3. Keep text readable and not overcrowded.
4. Run build.

**Tests/validation:**
- Build passes.
- Manual visual check at desktop and mobile widths.

#### Task 7.2: Build creative gallery

**Files:**
- Create: `src/components/CreativeGallery.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Behavior:**
- Generates creative variants from selected concepts.
- Shows 1-3 preview cards.
- Allows returning to concept selection.
- Continues to export panel.

**Steps:**
1. Add app test that selected sample concepts can reach creative previews if practical.
2. Wire `generateCreatives` in `App.tsx`.
3. Render previews in a responsive grid.
4. Run tests and build.

**Tests/validation:**
- Static previews render from sample input.
- Visual output is polished and not generic template clutter.

### Phase 8: Export and Handoff

**Objective:** Make the MVP useful outside the app.

#### Task 8.1: Add export utilities with tests

**Files:**
- Create: `src/lib/export.ts`
- Create: `tests/export.test.ts`

**Behavior:**
- `buildStrategyExport(snapshot, concepts, creatives)` returns readable Markdown.
- `buildCreativeSpecJson(input, concepts, creatives)` returns JSON-safe object/string.

**Steps:**
1. Write tests for Markdown containing selected concept hooks and CTAs.
2. Write tests for JSON parseability.
3. Implement export utilities.
4. Run targeted tests.

**Tests/validation:**
- Export tests pass.
- No browser-only APIs in pure export functions.

#### Task 8.2: Build export panel

**Files:**
- Create: `src/components/ExportPanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Behavior:**
- Shows copyable Markdown strategy/export.
- Shows copyable JSON creative spec.
- Includes print/save guidance.
- Includes next-step checklist.

**Steps:**
1. Implement export panel using generated data.
2. Use `navigator.clipboard` with graceful fallback if unavailable.
3. Add tests for export panel labels/content if practical.
4. Run tests and build.

**Tests/validation:**
- Export content includes strategy, selected concepts, and creative variants.
- App remains usable without clipboard support.

### Phase 9: Polish, Accessibility, and Documentation

**Objective:** Raise UX quality and document canonical commands.

#### Task 9.1: Full responsive and accessibility pass

**Files:**
- Modify: `src/styles/index.css`
- Modify: relevant `src/components/**/*.tsx`

**Steps:**
1. Check keyboard navigation through the workflow.
2. Ensure form labels and buttons are accessible.
3. Ensure color contrast is acceptable.
4. Improve mobile layout for intake and creative previews.
5. Run tests and build.

**Tests/validation:**
- Manual keyboard-only flow works.
- `npm run build` passes.

#### Task 9.2: Update documentation for commands

**Files:**
- Modify: `AGENTS.md` Commands section only if needed.
- Create: `docs/mvp-validation.md`

**Steps:**
1. Document canonical commands confirmed during implementation.
2. Add MVP manual validation script in `docs/mvp-validation.md`.
3. Include sample input expected flow.
4. Run tests/build one final time.

**Tests/validation:**
- `npm install`
- `npm run dev`
- `npm test`
- `npm run lint`
- `npm run build`

#### Task 9.3: Final integration review

**Files:**
- All created/modified files.

**Steps:**
1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Review `git diff --stat`.
5. Verify no secrets, generated private files, or unrelated changes.
6. Dispatch final integration reviewer subagent.

**Tests/validation:**
- All tests pass.
- Build passes.
- Manual workflow passes from sample input to export.

---

## Subagent Execution Strategy

Use `subagent-driven-development` after this plan is approved.

Execution rules:
- Do not dispatch multiple implementation subagents that modify the same files at the same time.
- Use a fresh implementation subagent per task.
- After each task, run spec compliance review first.
- Run code quality review only after spec compliance passes.
- If either review requests changes, dispatch a fix subagent and repeat the same review.
- Mark tasks complete only after implementation, targeted validation, spec review, and quality review pass.

Suggested task grouping:
- Phase 1 tasks should be sequential.
- Phase 2 generation/data tasks can be partly parallel only after scaffolding is stable, but avoid conflicts around shared type files.
- UI component tasks can be delegated independently after UI primitives exist.
- App wiring tasks should be sequential because they touch `src/App.tsx`.

Reviewer checklists:

Spec compliance reviewer should check:
- Required fields and behavior match this plan.
- File paths match this plan.
- The app remains SaaS/startup Meta static ad focused.
- No ecommerce/video/multi-platform scope creep.
- No real API/provider integration was added without explicit approval.

Code quality reviewer should check:
- TypeScript is strict and readable.
- Components are small and cohesive.
- Tests cover behavior, not implementation details.
- UI copy is concrete and product-aware.
- No secrets or credentials.
- No unnecessary dependencies.

---

## Test Plan

Automated tests:
- `npm run test -- --run tests/lib/validation.test.ts`
- `npm run test -- --run tests/generation/analyzeBusiness.test.ts`
- `npm run test -- --run tests/generation/generateConcepts.test.ts`
- `npm run test -- --run tests/generation/generateCreatives.test.ts`
- `npm run test -- --run tests/export.test.ts`
- `npm run test -- --run src/App.test.tsx`
- Final: `npm test`

Build/static checks:
- `npm run lint`
- `npm run build`

Manual validation script:
1. Start app with `npm run dev`.
2. Open local Vite URL.
3. Click `Use sample SaaS input`.
4. Submit intake.
5. Confirm strategy snapshot references the sample company, target customer, offer, and differentiators.
6. Continue to concepts.
7. Confirm exactly 6 distinct Meta ad concepts appear.
8. Select 3 concepts.
9. Continue to creative previews.
10. Confirm 3 polished square static previews render with distinct layouts.
11. Continue to export.
12. Copy Markdown and JSON exports.
13. Confirm exports include selected concepts and creative specs.
14. Resize browser to mobile width and repeat key navigation.
15. Navigate by keyboard through the main flow.

---

## Risks and Tradeoffs

### Risk: Deterministic generation may feel less magical than real AI

Mitigation:
- Make the deterministic output unusually thoughtful and product-specific.
- Use provider seams so real AI can be added later.
- Do not pretend it is scraping or using live AI if it is not.

### Risk: Static HTML/CSS creative previews may be mistaken for final production ads

Mitigation:
- Label as static creative previews/specs.
- Make them polished enough for MVP validation but frame as testable concepts.
- Add future task for PNG export or image-provider rendering only after MVP direction is validated.

### Risk: Adding a full React/Tailwind stack is a major dependency choice

Mitigation:
- This plan makes the stack assumption explicit.
- Confirm before implementation.
- Keep dependencies mainstream and minimal.

### Risk: Scope creep toward broad marketing platform

Mitigation:
- Keep all copy and tests anchored on SaaS/startups, Meta, static creatives.
- Reject ecommerce/video/multi-platform additions unless explicitly requested.

### Risk: Overbuilding visual editor features

Mitigation:
- No drag-and-drop editor in MVP.
- No template library.
- Focus on generated previews and exportable specs.

---

## Acceptance Criteria

Product acceptance:
- A user can move from SaaS/startup business context to strategy snapshot to 6 Meta ad concepts to 1-3 static creative previews to export.
- Output is specific to the business context and does not feel like a generic prompt wrapper.
- The UX is clean, calm, practical, and founder-friendly.
- The MVP stays scoped to SaaS/startups, Meta ads, and static image creatives.

Technical acceptance:
- Repository has a working app scaffold with documented commands.
- `npm install` succeeds from a clean checkout.
- `npm test` passes.
- `npm run lint` passes.
- `npm run build` passes.
- No secrets are committed.
- Generation logic is separated from UI components.
- Provider seam exists for future LLM/image integration without requiring it now.

Subagent acceptance:
- Each implementation task has targeted tests or validation.
- Each task is reviewed for spec compliance and code quality before the next dependent task begins.
- Final integration reviewer approves the complete implementation.

---

## Open Questions Before Implementation

1. Is Vite + React + TypeScript + Tailwind + Vitest acceptable for this clean scaffold?
2. Should the MVP include real AI generation immediately, or keep deterministic local generation for the first polished product slice?
3. Is browser print/copy export enough for the first MVP, or is PNG export required?
4. Should the visual creative cards use user-provided logo uploads now, or a text-mark placeholder until asset handling is needed?

Recommended default answers:
1. Yes, use Vite + React + TypeScript + Tailwind + Vitest.
2. Start deterministic/local; add AI provider integration after the workflow is validated.
3. Browser print/copy export is enough for this MVP plan.
4. Use text-mark placeholder now; add uploads later.
