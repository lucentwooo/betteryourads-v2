# BetterYourAds Website DNA Extraction

BetterYourAds extracts structured Website DNA from a B2B SaaS company website and returns one clean `BRAND_EXTRACTION_JSON` object.

This repository intentionally does not include:

- Reference ad analysis
- Image generation
- Render prompt generation
- Prisma

## What It Does

- Accepts a SaaS website URL.
- Crawls relevant public pages such as homepage, pricing, product, features, integrations, docs, testimonials, case studies, security, comparison, about, and FAQ pages.
- Extracts brand, product, offer, messaging, customer, proof, competitor, claim, and static ad recommendation data.
- Produces one schema-valid JSON object.
- Marks missing strings as `"unknown"` and missing arrays as `[]`.
- Adds missing fields to `missing_information`.
- Keeps external research conservative by returning research targets and queries unless real external evidence is supplied.
- Prevents unsupported claims from being marked as allowed claims.

## Stack

- Next.js frontend and API routes
- Node.js backend modules
- PostgreSQL helper with raw SQL, no Prisma
- Zod schema validation
- Homepage screenshot capture with Playwright
- Agentic crawl planning for the rest of the website
- Fast HTML fetching for selected non-homepage pages
- Cheerio HTML parsing
- OpenRouter extraction agent when `OPENROUTER_API_KEY` is configured
- DeepSeek V4 Flash as the default OpenRouter model
- Deterministic fallback extraction when OpenRouter is unavailable
- In-memory background job runner for the MVP
- Pino structured logging

## Project Structure

```text
src/
  app/
    api/extractions/
    page.tsx
  lib/
    agents/
    crawler/
    db/
    logging/
    pipeline/
    schema/
    validators/
  prompts/
  schemas/
docs/
examples/
tests/
```

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

```text
OPENROUTER_API_KEY=
OPENROUTER_MODEL=deepseek/deepseek-v4-flash
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_APP_NAME=BetterYourAds
DATABASE_URL=postgres://postgres:postgres@localhost:5432/betteryourads
MAX_CRAWL_PAGES=18
CRAWL_TIMEOUT_MS=15000
CRAWL_SCREENSHOT_PAGES=homepage
CRAWL_MODE=agentic
CRAWL_AGENT_PLANNER=deterministic
```

`OPENROUTER_API_KEY` is optional. Without it, the deterministic fallback extractor still returns valid JSON, but the extraction will be less nuanced.

`CRAWL_SCREENSHOT_PAGES` controls screenshot cost:

- `homepage`: screenshot only the homepage, then crawl the rest with fast HTML fetch. This is the default.
- `all`: use Playwright screenshots for every crawled page. Slower.
- `none`: skip screenshots and use HTML fetch only. Fastest, but weaker visual extraction.

`CRAWL_MODE` controls page discovery:

- `agentic`: fetch the homepage first, score discovered links by extraction value, then crawl the best pricing, product, proof, security, comparison, FAQ, integration, and about pages. This is the default.
- `fifo`: older queue behaviour that crawls relevant links in discovery order.

`CRAWL_AGENT_PLANNER` controls whether the crawl planner itself calls a model:

- `deterministic`: use local scoring for speed and predictable cost. This is the default.
- `openrouter`: ask the Website Research Planner Agent, via the configured OpenRouter model, to choose from the locally discovered candidate URLs. The agent cannot invent URLs.

Recommended OpenRouter models:

- Main: `deepseek/deepseek-v4-flash`
- Higher quality: `deepseek/deepseek-v4-pro`
- Budget alternative: `inclusionai/ling-2.6-flash`
- Free fallback for testing: `nvidia/nemotron-3-super-120b-a12b:free`

See `docs/model-selection.md` for the current reasoning.

## API

Start an extraction:

```http
POST /api/extractions
content-type: application/json

{
  "websiteUrl": "https://example.com"
}
```

Read job status:

```http
GET /api/extractions/{id}
```

## Validation

The runtime schema is `src/lib/schema/brand-extraction.ts`.

Validation rejects:

- Missing required top-level sections
- Extra keys inside strict objects
- Non-string values for string fields
- Invalid confidence values
- Malformed `source_map` entries

Claim safety enforcement moves unsupported allowed claims into `claims_requiring_proof`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run typecheck
```

## Notes

The MVP job runner is in-memory. For production, persist job state and extraction results in PostgreSQL using the raw SQL helper in `src/lib/db/postgres.ts`.
