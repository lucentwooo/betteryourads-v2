# Implementation Plan

## Phase 1: Extraction Core

- Build strict `BRAND_EXTRACTION_JSON` schema.
- Implement crawler modules:
  - crawler
  - page classifier
  - content cleaner
  - screenshot extractor
  - metadata extractor
  - colour extractor
  - asset extractor
  - source mapper
- Implement JSON validator.
- Implement claim validator.
- Implement schema compiler.

Status: implemented.

## Phase 2: Agents

- Website Brand DNA Agent:
  - Extracts direct website information.
  - Uses OpenRouter when configured.
  - Defaults to DeepSeek V4 Flash.
  - Falls back to deterministic extraction when OpenRouter is unavailable.
- External Research Agent:
  - Recommends research targets and search queries.
  - Does not invent external findings.

Status: implemented.

## Phase 3: Product Surface

- Next.js form for URL submission.
- Background job creation.
- Job status polling.
- JSON result display.
- JSON export.

Status: implemented.

## Phase 4: Persistence

- Add raw PostgreSQL job and extraction persistence.
- Keep Prisma out of the project.
- Add migrations or SQL scripts.

Status: prepared with raw SQL helper, not wired into job runner yet.

## Phase 5: Production Hardening

- Add queue backend for long crawls.
- Add crawl rate limiting and robots policy handling.
- Add source-level confidence scoring improvements.
- Add browser screenshot storage in object storage.
- Add authentication and user-level extraction history.
- Add e2e tests against controlled fixture websites.

Status: planned.
