# Official BetterYourAds MVP Execution Plan

> **For Hermes:** Use `subagent-driven-development` to execute this plan task-by-task. Do not implement from the controller session. Every implementation task gets a fresh subagent, then a spec review subagent, then a code quality/design review subagent.

**Goal:** Build a polished SaaS/startup Meta static ad creative MVP that turns business context into a strategy snapshot, Meta ad concepts, and static creative previews.

**Chosen MVP shape:** Guided strategy-to-creative web app.

**UI standard:** High-polish product UI is not optional. Use the `claude-design` skill during execution for the frontend design direction, with Notion-inspired warm minimalism as the baseline visual vocabulary. The app should feel calm, sharp, useful, and commercially credible — not like a generic AI prompt wrapper, Canva clone, or template gallery.

**Assumed stack:** Vite + React + TypeScript + Tailwind CSS + Vitest + React Testing Library. The repo is currently a clean scaffold with only `AGENTS.md`, so confirm this stack before executing if the user wants a different one.

---

## Repo Review

Inspected repo state:
- Root: `/Users/lucentwu/Documents/Projects/betteryourads-v2`
- Branch: `main`
- Current files: `AGENTS.md` only, plus `.git/`
- No app scaffold, `package.json`, source files, tests, or build system exist yet.

Existing plan reviewed:
- `.hermes/plans/2026-05-24_165051-betteryourads-mvp.md`

My assessment of that plan:
- The chosen MVP shape is right: a guided strategy-to-creative app is the best balance of speed, UX, polish, scalability, and strategic fit.
- The scope is appropriately narrow: SaaS/startups, Meta ads, static image creatives.
- The technical architecture is sensible: deterministic/local generation first, with provider seams for future AI/image integrations.
- The main weakness is that the UI/design bar needs to be made more explicit and enforced during execution, not treated as a final polish pass.
- This official plan therefore promotes design into Phase 1 and adds explicit design review gates after frontend tasks.

---

## Product Direction

The MVP should help a founder or small growth team move through this workflow:

1. Enter SaaS/startup business context.
2. Review a strategy snapshot that explains customer, pain, offer, positioning, and competitor gaps.
3. Review 6 distinct Meta ad concepts.
4. Select up to 3 concepts.
5. See 1-3 polished static creative previews.
6. Export/copy strategy, ad copy, and creative specs.

Non-goals:
- No ecommerce workflows.
- No video ads.
- No multi-platform ad expansion beyond Meta.
- No campaign launch.
- No performance feedback loop.
- No auth, billing, database, or account system.
- No real AI/image provider integration unless explicitly approved later.

---

## UI / Design Direction

Execution must use the `claude-design` approach:
- Start from context, not vibes.
- Define a small design system before building screens.
- Avoid generic SaaS cards, vague AI copy, excessive gradients, emoji, fake metrics, and decorative dashboard slop.
- Verify the design visually, not just with tests.

Baseline visual vocabulary:
- Inspired by Notion, but original to BetterYourAds.
- Warm white page background: `#ffffff`.
- Warm surface: `#f6f5f4`.
- Near-black text: `rgba(0,0,0,0.95)`.
- Muted text: `#615d59`.
- Whisper borders: `1px solid rgba(0,0,0,0.1)`.
- Restrained card shadow: multi-layer, max opacity around `0.04`.
- Primary accent: Notion-like blue `#0075de`, used sparingly for CTAs and active states.
- Font: Inter/system sans.
- Rounded corners: 4px for inputs/buttons, 12-16px for cards/panels.
- Tone: calm, practical, product-focused.

Design principles:
- The workflow should feel obvious within 10 seconds.
- Strategy should feel considered and specific, not random.
- Creative previews should be visually credible enough to demo.
- UI density should be useful, not cluttered.
- Every section should help the user decide or act.
- Generated creative cards should feel like ad direction/spec previews, not final campaign launch artifacts.

Design review gate for every UI task:
- Does it look intentionally designed, not default Tailwind?
- Are hierarchy, spacing, alignment, and type scale strong?
- Does the copy avoid AI buzzwords and vague marketing language?
- Is the UI specific to SaaS/startup Meta static ads?
- Does it preserve the narrow MVP scope?
- Does it work at desktop and mobile widths?
- Are focus states and labels accessible?

---

## Files Likely To Be Created

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
src/generation/providers.ts
src/generation/analyzeBusiness.ts
src/generation/generateConcepts.ts
src/generation/generateCreatives.ts
src/design/designTokens.ts
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
docs/design/betteryourads-design-direction.md
docs/mvp-validation.md
```

`AGENTS.md` may be modified only to update canonical commands after the tooling is actually confirmed.

---

# Execution Phases

## Phase 0: Pre-flight

### Task 0.1: Confirm clean scaffold and stack

**Objective:** Confirm there is no existing app code and the chosen stack is acceptable.

**Files:**
- Read only: repo root files

**Steps:**
1. Run `git status --short`.
2. List files excluding `.git`.
3. Confirm no hidden scaffold exists.
4. Confirm Vite + React + TypeScript + Tailwind + Vitest with the user if needed.

**Validation:**
- No implementation files are created.
- User approval or no objection to stack is recorded before Phase 1.

**Acceptance criteria:**
- Safe to scaffold.

---

## Phase 1: Design Direction First

### Task 1.1: Create the BetterYourAds design direction document

**Objective:** Turn the Claude Design/Notion-inspired direction into concrete implementation rules before any UI is built.

**Files:**
- Create: `docs/design/betteryourads-design-direction.md`

**Required content:**
- Product UI personality.
- Color tokens.
- Type scale.
- Spacing/radius/shadow rules.
- Form patterns.
- Card patterns.
- Creative preview patterns.
- Interaction/focus states.
- Anti-slop rules.
- Mobile behavior.
- Design acceptance checklist.

**Subagent context:**
- Load/use `claude-design` principles.
- Use Notion-inspired warm minimalism, but do not clone Notion.
- Keep BetterYourAds SaaS/startup Meta static ad scope.

**Validation:**
- Design direction is specific enough that frontend subagents can implement without guessing.
- No fake claims, fake metrics, or unsupported marketing content.

**Review gates:**
- Spec review: document includes all required sections.
- Design quality review: direction is tasteful, concrete, and not generic.

### Task 1.2: Create design tokens module

**Objective:** Convert the design direction into reusable frontend tokens.

**Files:**
- Create: `src/design/designTokens.ts`

**Exports:**
- `colors`
- `spacing`
- `radii`
- `shadows`
- `typeScale`
- `layout`

**Validation:**
- Tokens align with `docs/design/betteryourads-design-direction.md`.
- No app behavior is added.

**Review gates:**
- Spec review: all token groups exist.
- Code quality/design review: values are cohesive and usable.

---

## Phase 2: Project Scaffold

### Task 2.1: Create package and TypeScript config

**Objective:** Add the minimum app build foundation.

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`

**Steps:**
1. Add scripts: `dev`, `build`, `preview`, `test`, `test:watch`, `lint`, `format`.
2. Add React dependencies.
3. Add Vite, TypeScript, Vitest, React Testing Library, jsdom, Tailwind, PostCSS, Autoprefixer, ESLint, Prettier.
4. Keep dependencies mainstream and minimal.

**Validation:**
- `npm install` succeeds.
- No source behavior is implemented yet.

### Task 2.2: Add Vite, Vitest, Tailwind, lint, and formatting config

**Files:**
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.eslintrc.cjs`
- Create: `.prettierrc`
- Create: `.env.example`

**Validation:**
- Config files parse.
- `.env.example` has no real secrets.

### Task 2.3: Add app entrypoint and base styles

**Files:**
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/index.css`
- Create: `src/App.test.tsx`

**Requirements:**
- Use the design direction from Phase 1.
- Render a minimal BetterYourAds shell and workflow placeholder.
- Add a smoke test.

**Validation:**
- `npm run test -- --run src/App.test.tsx` passes.
- `npm run build` passes.

---

## Phase 3: Domain Model and Validation

### Task 3.1: Define workflow types

**Files:**
- Create: `src/types/adWorkflow.ts`

**Types:**
- `BrandTone`
- `IntakeInput`
- `StrategySnapshot`
- `AdConcept`
- `CreativeVariant`
- `WorkflowState`

**Validation:**
- `npm run build` passes.

### Task 3.2: Add realistic sample SaaS input

**Files:**
- Create: `src/data/sampleInputs.ts`

**Requirements:**
- Fictional B2B SaaS company.
- Clear offer, target customer, differentiators, competitors, and visual cues.
- No ecommerce/video examples.

**Validation:**
- Build passes.

### Task 3.3: Implement intake validation with tests

**Files:**
- Create: `src/lib/validation.ts`
- Create: `tests/lib/validation.test.ts`

**Behavior:**
- Required: company/product name, value proposition, target customer, offer/CTA.
- Website URL optional but valid if present.
- Field-level errors.

**Validation:**
- `npm run test -- --run tests/lib/validation.test.ts` passes.

---

## Phase 4: Generation Modules

### Task 4.1: Add provider seam

**Files:**
- Create: `src/generation/providers.ts`

**Behavior:**
- Define provider contract for future AI/image generation.
- Do not add real external calls.

**Validation:**
- Build passes.
- No provider SDKs or API keys.

### Task 4.2: Implement strategy snapshot generation

**Files:**
- Create: `src/generation/analyzeBusiness.ts`
- Create: `tests/generation/analyzeBusiness.test.ts`

**Behavior:**
- Generate business summary, customer segment, pain points, outcomes, positioning angles, competitor gaps, and message hierarchy.

**Validation:**
- Test confirms output references company/product, target customer, and offer.
- Test confirms at least 3 pain points, outcomes, and positioning angles.

### Task 4.3: Implement Meta ad concept generation

**Files:**
- Create: `src/generation/generateConcepts.ts`
- Create: `tests/generation/generateConcepts.test.ts`

**Behavior:**
- Return exactly 6 concepts:
  1. Pain-led
  2. Outcome-led
  3. Proof-led
  4. Alternative/comparison-led
  5. Speed/workflow-led
  6. Founder/team empathy-led

Each concept includes:
- Angle name
- Target insight
- Hook
- Primary text
- Headline
- CTA
- Visual direction
- Why it should work
- Risk/avoid note

**Validation:**
- Tests confirm count, required fields, distinct hooks/headlines, and SaaS/startup relevance.

### Task 4.4: Implement creative variant generation

**Files:**
- Create: `src/generation/generateCreatives.ts`
- Create: `tests/generation/generateCreatives.test.ts`

**Behavior:**
- Return up to 3 static creative variants.
- Layouts: `editorial-card`, `split-proof`, `outcome-checklist`.
- Include visual tokens and ad card copy.

**Validation:**
- Tests confirm 3 selected concepts produce 3 distinct layouts.
- Tests confirm fallback colors.

---

## Phase 5: UI Primitives and App Shell

### Task 5.1: Build UI primitives

**Files:**
- Create: `src/lib/cn.ts`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Field.tsx`
- Create: `src/components/ui/Textarea.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/EmptyState.tsx`

**Requirements:**
- Use tokens and design direction.
- Native accessible elements first.
- Strong focus states.
- No external component library.

**Validation:**
- Build passes.
- Design review confirms primitives do not look default/generic.

### Task 5.2: Build app shell and progress steps

**Files:**
- Create: `src/components/AppShell.tsx`
- Create: `src/components/ProgressSteps.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Requirements:**
- Calm, polished workflow container.
- Header with concise product positioning.
- Progress steps: Intake, Strategy, Concepts, Creatives, Export.
- Responsive layout.

**Validation:**
- App smoke test passes.
- Build passes.
- Design review checks hierarchy, spacing, and mobile layout.

---

## Phase 6: Intake and Strategy Flow

### Task 6.1: Build intake form

**Files:**
- Create: `src/components/IntakeForm.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Requirements:**
- Fields for website URL, product name, value prop, target customer, offer/CTA, differentiators, competitors, tone, primary color, secondary color, logo/text mark.
- `Use sample SaaS input` action.
- Helpful validation errors.
- Clean form hierarchy; no wall of inputs.

**Validation:**
- Tests cover rendering and sample fill if practical.
- Manual check: empty submit shows useful errors.
- Design review checks the form feels guided and not bureaucratic.

### Task 6.2: Build strategy snapshot screen

**Files:**
- Create: `src/components/StrategySnapshot.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Requirements:**
- Show business summary, customer, pain points, outcomes, positioning angles, competitor gaps, and message hierarchy.
- Include action to continue to concepts.
- Present strategy as considered briefing, not random cards.

**Validation:**
- Sample flow reaches strategy.
- Strategy content references sample product/customer/offer.
- Design review checks scannability and specificity.

---

## Phase 7: Concept Gallery

### Task 7.1: Build concept card

**Files:**
- Create: `src/components/ConceptCard.tsx`

**Requirements:**
- Display angle, insight, hook, primary text, headline, CTA, visual direction, why it works, and risk note.
- Selected/unselected state.
- Strong hierarchy; not a dense unreadable wall.

**Validation:**
- Build passes.
- Design review checks concept cards feel premium and actionable.

### Task 7.2: Build concept gallery and selection

**Files:**
- Create: `src/components/ConceptGallery.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Requirements:**
- Show exactly 6 generated concepts.
- Select up to 3 concepts.
- Continue enabled when at least 1 selected.
- Clear helper copy explaining selection.

**Validation:**
- Tests cover generated count and selection behavior if practical.
- Design review checks selected states and responsive grid.

---

## Phase 8: Static Creative Previews

### Task 8.1: Build creative preview card

**Files:**
- Create: `src/components/CreativePreviewCard.tsx`

**Requirements:**
- Square static ad preview.
- Layouts: editorial card, split proof, outcome checklist.
- Brand color variables.
- Text hierarchy: hook, support line, proof/offer, CTA.
- Label outside card: static Meta feed creative preview.

**Validation:**
- Build passes.
- Design review is mandatory and should be strict. The previews are the product payoff.

### Task 8.2: Build creative gallery

**Files:**
- Create: `src/components/CreativeGallery.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Requirements:**
- Render 1-3 preview cards from selected concepts.
- Responsive grid.
- Back to concepts action.
- Continue to export action.

**Validation:**
- Sample flow reaches creative previews.
- Manual visual check at desktop and mobile sizes.

---

## Phase 9: Export and Handoff

### Task 9.1: Add export utilities

**Files:**
- Create: `src/lib/export.ts`
- Create: `tests/export.test.ts`

**Behavior:**
- `buildStrategyExport(snapshot, concepts, creatives)` returns readable Markdown.
- `buildCreativeSpecJson(input, concepts, creatives)` returns JSON-safe output.

**Validation:**
- Tests confirm Markdown includes selected hooks and CTAs.
- Tests confirm JSON parseability.

### Task 9.2: Build export panel

**Files:**
- Create: `src/components/ExportPanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Requirements:**
- Copyable Markdown export.
- Copyable JSON creative spec.
- Print/save guidance.
- Next-step checklist.
- Clipboard fallback if unavailable.

**Validation:**
- Tests cover export labels/content if practical.
- Manual copy/export check.
- Design review checks the final screen feels useful, not like an afterthought.

---

## Phase 10: Polish, QA, and Documentation

### Task 10.1: Full visual polish pass using Claude Design standards

**Files:**
- Modify as needed: `src/styles/index.css`, `src/components/**/*.tsx`

**Requirements:**
- Improve hierarchy, spacing, type scale, states, and responsive behavior.
- Remove generic copy and visual clutter.
- Preserve scope.

**Validation:**
- Browser visual check at desktop and mobile.
- No console errors.
- Keyboard navigation works.
- Focus states visible.

### Task 10.2: Document validation and commands

**Files:**
- Create: `docs/mvp-validation.md`
- Modify: `AGENTS.md` Commands section only if commands are confirmed.

**Requirements:**
- Include canonical commands.
- Include manual validation script from intake to export.
- Include known limitations: deterministic generation, no live scraping, no real AI/image provider.

**Validation:**
- `npm test` passes.
- `npm run lint` passes.
- `npm run build` passes.

### Task 10.3: Final integration review

**Files:**
- All created/modified files.

**Requirements:**
- Final reviewer checks product scope, UX quality, code quality, tests, accessibility, and docs.
- Controller verifies final test/build output.

**Validation:**
- `npm test`
- `npm run lint`
- `npm run build`
- Manual sample workflow from intake to export.

---

## Subagent Execution Protocol

For every task:

1. Controller marks task `in_progress` in todo list.
2. Controller dispatches implementation subagent with:
   - Full task text.
   - Relevant product context from `AGENTS.md`.
   - Design direction if frontend-related.
   - Exact files to create/modify.
   - Required tests/validation.
3. Implementation subagent completes only that task.
4. Controller dispatches spec compliance reviewer.
5. If spec reviewer fails, dispatch fix subagent, then re-review spec.
6. Once spec passes, dispatch code quality/design reviewer.
7. If quality/design reviewer fails, dispatch fix subagent, then re-review quality/design.
8. Controller runs targeted validation if needed.
9. Controller marks task `completed`.
10. Proceed to next dependent task.

Never:
- Skip review gates.
- Let the implementation subagent self-approve.
- Execute multiple subagents touching `src/App.tsx` at once.
- Add real providers, auth, billing, persistence, or campaign launching.
- Broaden to ecommerce/video/multi-platform.

---

## Required Automated Validation

Targeted tests:
- `npm run test -- --run src/App.test.tsx`
- `npm run test -- --run tests/lib/validation.test.ts`
- `npm run test -- --run tests/generation/analyzeBusiness.test.ts`
- `npm run test -- --run tests/generation/generateConcepts.test.ts`
- `npm run test -- --run tests/generation/generateCreatives.test.ts`
- `npm run test -- --run tests/export.test.ts`

Final checks:
- `npm test`
- `npm run lint`
- `npm run build`

Manual product validation:
1. Start with `npm run dev`.
2. Open the local app.
3. Use sample SaaS input.
4. Submit intake.
5. Confirm strategy snapshot is specific to the sample company/customer/offer.
6. Continue to concepts.
7. Confirm exactly 6 distinct Meta ad concepts.
8. Select 3.
9. Continue to creative previews.
10. Confirm 3 polished static ad preview cards with distinct layouts.
11. Continue to export.
12. Copy Markdown and JSON exports.
13. Resize to mobile width and repeat key navigation.
14. Navigate the core flow by keyboard.
15. Confirm no console errors.

---

## Acceptance Criteria

Product:
- User can complete intake -> strategy -> concepts -> creative previews -> export.
- Output is specific to SaaS/startup business context.
- The app is scoped to Meta static ad creatives.
- The app feels polished, calm, practical, and commercially credible.
- UI does not feel like default Tailwind, generic AI SaaS, Canva, or a prompt wrapper.

Technical:
- `npm install` works from clean checkout.
- `npm test` passes.
- `npm run lint` passes.
- `npm run build` passes.
- No secrets or credentials are committed.
- Generation logic is separated from UI.
- Provider seam exists but no real provider is integrated.

Design:
- Design direction doc exists and is followed.
- Tokens are centralized.
- Components have accessible labels/focus states.
- Layout is responsive.
- Creative previews are visually strong enough to be the product payoff.

Subagent process:
- Every task receives implementation, spec review, and quality/design review.
- Final integration review passes.

---

## Risks

1. **UI quality slips if treated as polish at the end.**
   - Mitigation: design direction is Phase 1; frontend tasks require design review gates.

2. **Deterministic output may feel less powerful than real AI.**
   - Mitigation: make copy specific and strategic; keep provider seam for later.

3. **Creative previews may look like templates.**
   - Mitigation: use layout variety, brand colors, strategy-specific copy, and strict design review.

4. **Scope creeps into full ad platform.**
   - Mitigation: explicitly block ecommerce, video, campaign launch, and performance loop.

5. **Stack choice becomes accidental architecture.**
   - Mitigation: confirm stack before implementation; keep dependencies minimal.

---

## Open Questions Before Execution

Recommended defaults are included so execution can move quickly after approval.

1. **Stack:** Is Vite + React + TypeScript + Tailwind + Vitest acceptable?
   - Recommended default: yes.

2. **Generation:** Deterministic local generation first, or real AI immediately?
   - Recommended default: deterministic local generation first.

3. **Export:** Browser copy/print export first, or PNG export now?
   - Recommended default: copy/print first; PNG later.

4. **Logo/assets:** Text-mark placeholder first, or upload support now?
   - Recommended default: text-mark placeholder first.

5. **Design artifact:** Should execution create a standalone HTML design prototype before React implementation?
   - Recommended default: no separate prototype unless desired; instead create `docs/design/betteryourads-design-direction.md` and enforce design review gates inside implementation.
