# BetterYourAds Design Direction

This document translates the Claude Design / Notion-inspired direction into implementation rules for the BetterYourAds MVP. It is intentionally specific so frontend work can proceed without inventing visual language screen by screen.

## Product UI Personality

BetterYourAds should feel calm, useful, precise, and commercially serious. The interface should help SaaS and startup teams move from business context to Meta static ad concepts and polished creative previews without feeling like a generic AI toy, template marketplace, or agency landing page.

Use these personality rules:

- Calm before clever: prioritize legibility, clear hierarchy, and obvious next steps over visual novelty.
- Warm minimalism: use warm whites, soft surfaces, restrained borders, and quiet typography. Do not clone Notion layouts or iconography directly.
- High-trust product workspace: the app should feel like a serious creative strategy tool, not a decorative dashboard.
- Strategy-first: screens should make business context, audience, offer, positioning, concept rationale, and creative output easy to inspect.
- Specific over magical: avoid vague AI language. Show what the product is doing in practical terms: analyzing website context, identifying angles, drafting concepts, generating static Meta ad creative.
- Polished but not flashy: no loud gradients, over-saturated illustrations, fake analytics, or ornamental cards that do not support the workflow.

## Color Tokens

Use a restrained warm-neutral palette with one clear primary accent. Tokens should map to semantic usage, not arbitrary component colors.

### Core Colors

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | Main app background, primary content surfaces. |
| `--color-surface` | `#f6f5f4` | App shell background, secondary panels, grouped form areas. |
| `--color-surface-raised` | `#ffffff` | Cards, dialogs, popovers, creative canvases. |
| `--color-surface-hover` | `#f0efed` | Subtle hover state on neutral rows/buttons. |
| `--color-text` | `rgba(0, 0, 0, 0.95)` | Primary text, headings, key labels. |
| `--color-text-muted` | `#615d59` | Supporting copy, metadata, helper text. |
| `--color-text-subtle` | `#8a8580` | Placeholder text, low-emphasis metadata. |
| `--color-border` | `rgba(0, 0, 0, 0.10)` | Default borders and dividers. |
| `--color-border-strong` | `rgba(0, 0, 0, 0.18)` | Focused structural borders, selected cards. |
| `--color-primary` | `#0075de` | Primary actions, selected navigation, focus accents. |
| `--color-primary-hover` | `#0068c7` | Primary action hover. |
| `--color-primary-soft` | `rgba(0, 117, 222, 0.10)` | Selected surfaces, soft status backgrounds. |
| `--color-danger` | `#c83f31` | Destructive actions, blocking errors. |
| `--color-danger-soft` | `rgba(200, 63, 49, 0.10)` | Error backgrounds. |
| `--color-success` | `#257a4f` | Success confirmations only. Do not use as fake performance signal. |
| `--color-warning` | `#9a6518` | Warnings requiring review. |

### Color Rules

- Primary blue is an accent, not a brand wash. Most screens should be neutral with blue used for action, selection, and focus.
- Do not use gradients as default UI decoration. Gradients are allowed only inside generated ad previews if the creative itself requires them.
- Do not use red/green KPI colors unless there is real user-provided or system-derived data behind them.
- Keep contrast high enough for body text and controls. Muted text should not be used for important instructions.
- Use borders and spacing before using background color to create hierarchy.

## Type Scale

Use Inter if available; otherwise use the system sans stack. Do not introduce decorative display fonts into the product UI.

Recommended font stack:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

| Token | Size / Line Height / Weight | Usage |
| --- | --- | --- |
| `--text-xs` | `12px / 16px / 400` | Metadata, timestamps, compact labels. |
| `--text-sm` | `13px / 18px / 400` | Secondary body text, helper text, table cells. |
| `--text-base` | `14px / 20px / 400` | Default UI body text, form controls. |
| `--text-md` | `16px / 24px / 400` | Intro copy, empty-state body, larger form prompts. |
| `--text-lg` | `18px / 26px / 500` | Section titles, card titles when prominent. |
| `--text-xl` | `22px / 30px / 600` | Page titles and major workflow steps. |
| `--text-2xl` | `28px / 36px / 650` | Product hero title or major generated-output title. Use sparingly. |

Type rules:

- Default app text is 14px, not 16px, to preserve workspace density without feeling cramped.
- Use sentence case for headings and labels.
- Keep headings short and functional: “Business context”, “Ad concepts”, “Creative preview”.
- Avoid marketing hype in product UI: no unsupported claims such as “10x performance” or “guaranteed winning ads”.
- Use tabular numbers only where comparing real numeric values. Do not invent metrics.

## Spacing, Radius, And Shadow Rules

### Spacing Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | `4px` | Tight icon/text gaps, compact offsets. |
| `--space-2` | `8px` | Control internals, related labels. |
| `--space-3` | `12px` | Card internals, grouped elements. |
| `--space-4` | `16px` | Standard panel padding, form gaps. |
| `--space-5` | `20px` | Larger sections, modal internals. |
| `--space-6` | `24px` | Page sections, major card groups. |
| `--space-8` | `32px` | Page-level rhythm. |
| `--space-10` | `40px` | Top-level page separation only. |

### Radius Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-control` | `4px` | Inputs, buttons, selects, pills. |
| `--radius-card` | `12px` | Standard cards and panels. |
| `--radius-panel` | `16px` | Large containers, modal shells, preview stages. |
| `--radius-full` | `999px` | Avatars, circular icon buttons, status pills. |

### Shadow Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-subtle` | `0 1px 2px rgba(0, 0, 0, 0.06)` | Raised controls and small popovers. |
| `--shadow-card` | `0 8px 24px rgba(0, 0, 0, 0.06)` | Important cards, dialogs, creative preview surfaces. |
| `--shadow-focus` | `0 0 0 3px rgba(0, 117, 222, 0.16)` | Focus ring paired with border color. |

Spacing/radius/shadow rules:

- Controls use 4px radius. Panels and cards use 12-16px radius.
- Standard card padding is 16px on desktop and 14-16px on mobile.
- Avoid heavy shadows. Use subtle borders first; add shadow only to clarify layering.
- Preserve whitespace around generated creative. Previews should never touch panel edges.
- Use 1px borders for structure, not thick outlines.

## Form Patterns

Forms are central to BetterYourAds because the product depends on business context quality. They should feel guided, calm, and reviewable.

### Form Layout

- Use single-column forms for core input flows unless a field pair is clearly related.
- Group fields by workflow stage: Business, Website, Audience, Offer, Competitors, Brand guidance, Creative preferences.
- Each group should have a short title and one sentence of helper text when needed.
- Use progressive disclosure for advanced options rather than showing everything at once.
- Preserve entered context visibly; users should feel they are building a useful brief, not filling a black box.

### Field Rules

- Label every input. Do not rely on placeholder text as the only label.
- Put helper text below labels and above inputs when it guides what to write.
- Use placeholders as examples, not instructions.
- Textareas should be comfortable: minimum 120px height for strategic inputs; 180px+ for long context.
- Website URL input should be visually prominent in onboarding because it is a primary source of context.
- Required fields should be clear in copy, not with noisy asterisk-heavy UI.

### Button Rules

- Primary button: filled blue, white text, 4px radius, 36-40px height.
- Secondary button: white or warm surface, near-black text, whisper border.
- Tertiary button: transparent, muted text, visible hover surface.
- Destructive button: use red only for real destructive actions.
- Button labels should describe the action: “Analyze website”, “Generate concepts”, “Create static ads”, “Save brief”.

### Validation And Empty States

- Inline validation appears below the field in 13px text.
- Error text should state the fix: “Enter a valid website URL” rather than “Invalid input”.
- Empty states should explain the next step and avoid fake examples that imply unavailable features.
- Loading states should be specific: “Analyzing website copy”, “Drafting ad angles”, “Preparing creative preview”.

## Card Patterns

Cards should support review, comparison, and selection of strategic and creative output.

### Standard Card

- Background: `--color-surface-raised`.
- Border: `1px solid --color-border`.
- Radius: `--radius-card`.
- Padding: `16px`.
- Optional shadow: `--shadow-subtle` only when cards sit above a colored surface.
- Header: concise title, optional muted metadata or status pill.
- Body: structured bullets or short paragraphs, not walls of text.
- Footer: one primary next action or a compact action group.

### Selectable Cards

- Default: border neutral, white background.
- Hover: slightly stronger border and warm hover surface.
- Selected: `--color-primary` border or blue left accent plus `--color-primary-soft` background.
- Include a visible selected indicator beyond color alone.
- Do not use fake confidence scores or performance projections.

### Generated Concept Cards

Each ad concept card should include, when available:

- Concept name.
- Target audience or pain point.
- Core angle / promise.
- Suggested visual direction.
- Primary copy direction.
- Why it fits the business context.
- CTA suggestion.

Keep concept cards practical. Avoid empty “AI rationale” filler.

## Creative Preview Patterns

Creative previews are the highest-polish area of the app. They should make generated static Meta ad creative feel commercially usable and easy to evaluate.

### Preview Stage

- Use a warm surface stage (`#f6f5f4`) around the creative to separate workspace from output.
- Center the creative with generous padding: 24px desktop, 16px mobile.
- Use a white or transparent checkerless background unless the creative itself has a defined background.
- Keep the preview canvas crisp with 12-16px surrounding panel radius.
- Show aspect ratio labels plainly: “1:1 feed”, “4:5 feed”, “9:16 story” only if those variants exist.

### Creative Canvas Rules

- Static Meta ad previews should prioritize clarity at small sizes.
- Use strong hierarchy: one primary message, one supporting line, one CTA area if included.
- Avoid tiny unreadable legal-style text unless the user supplied it as required copy.
- Brand colors and typography can appear inside the creative, but the surrounding app chrome stays neutral.
- Do not make output look like a generic template gallery. Each preview should be tied to the selected concept and business context.

### Preview Metadata

Place metadata in a quiet side panel or footer:

- Selected concept.
- Intended audience or angle.
- Format / aspect ratio.
- Editable copy fields, if available.
- Generation status.

Do not display fabricated performance metrics, predicted ROAS, CTR, CPC, or “winner” labels.

## Interaction And Focus States

Interactions should feel immediate, restrained, and accessible.

### Hover

- Neutral hover: warm surface shift plus slightly stronger border.
- Primary hover: darken blue from `#0075de` to `#0068c7`.
- Do not use large movement or scaling on cards. Max transform, if used, is `translateY(-1px)`.

### Active / Pressed

- Buttons may darken or compress visually by 1px.
- Avoid springy or playful animation. This is a practical creative tool.

### Focus

- Every interactive element must have a visible keyboard focus state.
- Focus style: blue border plus `--shadow-focus`.
- Do not remove outlines without replacing them.
- Focus order must match visual order.

### Loading

- Use skeletons for structured content that is about to appear.
- Use small spinners only inside buttons or compact status rows.
- Loading copy should describe the current step without overpromising.
- Long AI-generation steps should preserve the previous screen state and show progress context, not blank the page.

### Motion

- Use short transitions: 120-180ms ease for hover/focus; 180-240ms for panels/modals.
- Respect reduced-motion preferences.
- Avoid animated gradients, particle effects, and attention-grabbing decorative motion.

## Anti-Slop Rules

The following patterns are not allowed unless explicitly requested later:

- Fake metrics, fake charts, fake dashboards, fake campaign results, or unsupported performance claims.
- Generic AI buzzwords as primary UI copy: “supercharge”, “10x”, “magic”, “autopilot”, “growth engine”.
- Decorative gradients used as the main design solution.
- Stock SaaS illustrations that do not explain the workflow.
- Template-library browsing as the core experience.
- Ecommerce-oriented flows such as SKU selection, product catalog imports, cart recovery, or discount ad templates.
- Video, TikTok, Google, LinkedIn, or multi-platform campaign UI in the MVP unless a task explicitly adds it.
- Agency-style landing-page sections inside the app workspace.
- Excessive badges, pills, icons, or status colors that create noise.
- Overly dense sidebars with features not in scope.
- Placeholder customer logos, testimonials, or case studies unless real and provided.

Quality bar:

- Every visible UI element must either help the user provide context, review strategy, generate concepts, inspect creative, or take the next workflow step.
- If a component exists only to make the screen look busy, remove it.
- If copy could fit any AI SaaS product, rewrite it to be specific to BetterYourAds and Meta static ad creative.

## Mobile Behavior

The MVP should be fully usable on mobile even if desktop is the primary creation environment.

### Layout

- Use a single-column layout below 768px.
- Collapse side panels below the main content or into clearly labeled drawers.
- Keep page gutters at 16px on mobile.
- Stack form groups; do not use cramped two-column fields.
- Keep primary actions reachable at the end of each section. Sticky bottom actions are allowed for long flows if they do not hide content.

### Navigation

- Use compact top navigation or a drawer. Do not preserve a desktop sidebar if it squeezes content.
- Breadcrumbs may collapse to the current step plus back action.
- Workflow step labels should remain understandable when truncated.

### Creative Preview On Mobile

- Creative preview should scale to viewport width while preserving aspect ratio.
- Provide a tap target to open a larger preview if side-by-side review is impossible.
- Metadata and edit controls stack below the preview.
- Avoid horizontal scrolling except for intentionally scrollable variant strips.

### Touch Targets

- Minimum interactive target size: 44px height/width where practical.
- Maintain at least 8px between adjacent touch targets.
- Inline icon-only actions require accessible labels and a visible pressed/focus state.

## Design Acceptance Checklist

Use this checklist before accepting any frontend implementation:

### Foundation

- [ ] Uses the defined warm-neutral palette and primary blue accent.
- [ ] Uses Inter/system sans and the documented type scale.
- [ ] Uses 4px radius for controls and 12-16px radius for cards/panels.
- [ ] Uses borders, spacing, and restrained shadows instead of decorative effects.
- [ ] Maintains clear contrast for primary text, muted text, controls, and focus states.

### Product Fit

- [ ] Interface stays focused on SaaS/startup Meta static ad creative workflows.
- [ ] No ecommerce, video, broad campaign-launch, billing, auth, or performance-loop UI appears unless explicitly scoped.
- [ ] Product copy is concrete and practical, not generic AI SaaS language.
- [ ] No fake metrics, unsupported claims, fake charts, fake testimonials, or placeholder logos are used.

### Workflow Clarity

- [ ] The next action is obvious on every screen.
- [ ] Forms are grouped by meaningful business-context stages.
- [ ] Generated concepts are reviewable with rationale tied to the supplied business context.
- [ ] Creative previews are visually prominent, readable, and not presented as generic templates.
- [ ] Loading and empty states explain what is happening or what the user should do next.

### Interaction And Accessibility

- [ ] All interactive elements have visible hover, active, disabled, and keyboard focus states.
- [ ] Focus order follows visual order.
- [ ] Buttons use action-specific labels.
- [ ] Errors are inline, specific, and tell the user how to fix the issue.
- [ ] Motion is restrained and respects reduced-motion preferences.

### Responsive Quality

- [ ] Mobile layouts use one column below 768px.
- [ ] Creative previews scale without cropping important content.
- [ ] Touch targets are large enough and not crowded.
- [ ] Side panels, metadata, and edit controls remain accessible on small screens.

If an implementation fails any checklist item, revise the UI before building additional screens on top of it.
