# BetterYourAds Agent Context

## Product Context

BetterYourAds is an AI advertising creative platform for startups and SaaS companies that need better paid-ad creatives without relying entirely on slow agencies, generic AI tools, or manual guesswork.

The product should help a business move from website and business context to strategic Meta ad concepts and polished static ad creatives. The long-term vision is a self-improving advertising system that learns from real campaign performance data, but that optimization loop is not part of the immediate product context unless the user explicitly asks for it.

The durable product idea is:

> BetterYourAds helps startups create better paid-ad creatives faster by combining business research, AI creative generation, and eventually performance-data-driven self-optimization.

## Current Scope

Assume the current focus is an MVP for SaaS and startup customers.

In-scope product direction:

- Business and website understanding.
- Customer, competitor, offer, and positioning analysis.
- High-quality Meta ad concept generation.
- Static image ad creative generation.
- On-brand, polished creative output that feels specific to the customer.

Out of scope unless the user explicitly changes direction:

- Ecommerce workflows.
- Non-SaaS customer segments.
- Video ads.
- Multi-platform ad support beyond Meta.
- Automated campaign launch and performance feedback loops.
- Detailed technical architecture or stack decisions.

Do not invent or lock in implementation plans, vendor choices, data models, APIs, or stack decisions unless the user asks. The execution plan may live elsewhere and should take precedence over assumptions in this file.

## Ideal Customer

The primary customer is a founder, small growth team, or early marketing hire at a SaaS or startup company that:

- Has a live product and website.
- Has a clear offer or value proposition.
- Wants to test or improve Meta ads.
- Needs more high-quality ad concepts and variations.
- Is not ready to rely on a full traditional creative agency.
- Finds generic AI output too shallow or off-brand.

Later customer segments may include marketing teams, agencies, growth consultants, paid media freelancers, and ecommerce brands, but do not broaden the product toward them during early MVP work without explicit direction.

## Product Principles

Prioritize all of the following together:

- Speed to MVP.
- High product polish.
- Strong UX and UI.
- Scalable architecture.
- High-quality ad strategy and creative output.

Do not treat these as permission to ship sloppy work. When tradeoffs are unavoidable, explain the tradeoff clearly and choose the option that best protects the user-facing MVP.

BetterYourAds should not feel like:

- A generic AI image generator.
- A prompt wrapper.
- A Canva template library.
- A simple ad copy generator.
- A traditional ad agency website.

BetterYourAds should feel like a focused, practical product that makes ad creative work more systematic, specific, and easier to improve.

## Brand And UX Direction

Take broad inspiration from Notion as a company: clear, useful, calm, modern, and polished without feeling flashy or overdesigned.

Use straightforward product language. Prefer clarity over hype. The product should feel founder-friendly and practical, while still looking credible enough for serious growth teams.

When designing screens or copy:

- Make the core workflow obvious.
- Avoid vague AI buzzwords unless they explain a real capability.
- Keep interfaces clean and purposeful.
- Favor specific outputs, examples, and actionable next steps.
- Make generated ad strategy feel considered, not random.
- Make generated creatives feel on-brand and commercially usable.

## Messaging Pillars

Use these pillars when creating product copy, UI text, or positioning:

- Better ad strategy: stronger angles based on the customer, offer, competitors, and positioning.
- Faster creative production: more testable ad creatives without slow manual workflows.
- Less generic AI output: output should use business context, strategy, and references.
- Continuous improvement: eventually, performance data should make each new creative cycle better.

The MVP should emphasize the first three pillars. Mention continuous improvement as future-facing unless the user asks to build that loop.

## Working Rules For Agents

- Preserve the narrow early focus: SaaS/startups, Meta ads, static image creatives.
- Do not add ecommerce, video, agency, or broad marketing-platform assumptions by default.
- Do not overwrite future product or technical plans with guesses from this context.
- Ask before introducing major dependencies, third-party services, or architectural commitments.
- Keep changes tightly scoped to the user request.
- Prefer concrete, product-aware copy and UX over generic startup language.
- When building UI, favor polished usable product screens over landing-page-only work unless the user asks for marketing pages.
- When uncertain, make the smallest assumption needed to keep moving and state it clearly.

## Repository Structure

This repository is currently a clean scaffold. As code is added, keep the layout predictable:

- `src/` for production source code and feature modules.
- `tests/` or colocated `*.test.*` files for automated tests.
- `public/` or `assets/` for static images, fonts, and bundled media.
- `docs/` for design notes, product notes, and integration guides.
- Root-level tooling files such as `package.json`, `Makefile`, and formatter configs.

Prefer small, cohesive modules. Name directories by feature or domain, such as `src/audits/`, `src/ad-concepts/`, or `src/creatives/`.

## Commands

No build system is configured yet. When tooling is introduced, document the canonical commands here and keep them stable:

- `npm install`: install project dependencies.
- `npm run dev`: start the local development server.
- `npm test`: run the full automated test suite.
- `npm run lint`: run static analysis and format checks.
- `npm run build`: create a production-ready build.

If a different package manager is adopted, update this section in the same change.

## Coding Style

Use the repository formatter and linter once configured. Until then:

- Use 2-space indentation for JavaScript, TypeScript, JSON, YAML, and CSS.
- Use descriptive file names.
- Use `PascalCase` for components and classes.
- Use `camelCase` for functions and variables.
- Use `UPPER_SNAKE_CASE` for environment variable names.
- Keep functions focused.
- Avoid unrelated refactors.

## Testing Guidance

Add tests with new user-facing behavior or shared logic. Keep test names behavior-oriented, for example `generates_distinct_ad_angles_from_business_context`.

Before opening a pull request, run the documented test command. If tests are not configured yet, state that and include manual verification steps.

## Security And Configuration

Do not commit secrets, API keys, local credentials, or generated private files. Use `.env.local` for local-only configuration and commit a sanitized `.env.example` when environment variables are required.
