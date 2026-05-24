import { classifyPage } from "@/lib/crawler/page-classifier";
import type { CrawledPage, PageType } from "@/lib/crawler/types";
import {
  inferJsonSchema,
  isOpenRouterConfigured,
  requestStructuredJson
} from "@/lib/agents/openrouter-json";
import { logger } from "@/lib/logging/logger";

export type PlannedCrawlTarget = {
  url: string;
  pageType: PageType;
  score: number;
  reason: string;
};

type AgentPlannerOutput = {
  targets: Array<{
    url: string;
    reason: string;
    priority: string;
  }>;
};

const PAGE_TYPE_PRIORITY: Record<PageType, number> = {
  homepage: 100,
  pricing: 95,
  product: 90,
  feature: 86,
  integrations: 80,
  testimonials: 78,
  case_study: 78,
  security: 74,
  comparison: 72,
  faq: 68,
  about: 62,
  landing: 58,
  docs: 48,
  other: 18
};

const HIGH_VALUE_PATH_PATTERNS: Array<[RegExp, number, string]> = [
  [/pricing|plans|price/i, 30, "pricing and offer evidence"],
  [/customers?|testimonials?|reviews?|case-stud/i, 28, "proof and customer evidence"],
  [/features?|product|platform|solutions?|use-cases?/i, 24, "product and feature evidence"],
  [/integrations?|apps?|marketplace/i, 20, "integration evidence"],
  [/security|trust|privacy|compliance/i, 18, "trust and compliance evidence"],
  [/compare|versus|vs|alternatives?/i, 18, "competitor and positioning evidence"],
  [/faq|questions/i, 14, "objection and FAQ evidence"],
  [/about|company|team/i, 10, "company context evidence"],
  [/docs?|developers?|api|help|support/i, 6, "technical product evidence"]
];

function normalizeUrl(url: string) {
  const parsed = new URL(url);
  parsed.hash = "";
  parsed.search = "";
  return parsed.toString();
}

function isCrawlableInternalPage(url: string, homepageUrl: string) {
  const parsed = new URL(url);
  const homepage = new URL(homepageUrl);

  if (parsed.origin !== homepage.origin) {
    return false;
  }

  return !/\.(pdf|zip|png|jpe?g|gif|webp|svg|mp4|mov|avi|css|js|ico|woff2?)$/i.test(
    parsed.pathname
  );
}

function scoreUrl(url: string, homepageUrl: string) {
  const parsed = new URL(url);
  const pageType = classifyPage(url, homepageUrl);
  let score = PAGE_TYPE_PRIORITY[pageType];
  const reasons: string[] = [];

  if (parsed.pathname.split("/").filter(Boolean).length <= 2) {
    score += 8;
    reasons.push("shallow URL");
  }

  for (const [pattern, value, reason] of HIGH_VALUE_PATH_PATTERNS) {
    if (pattern.test(parsed.pathname)) {
      score += value;
      reasons.push(reason);
    }
  }

  if (parsed.search) {
    score -= 10;
  }

  return {
    pageType,
    score,
    reason: reasons[0] ?? `${pageType} page candidate`
  };
}

export function planNextCrawlTargets(
  pages: CrawledPage[],
  homepageUrl: string,
  visited: Set<string>,
  maxTargets: number
): PlannedCrawlTarget[] {
  const candidates = new Map<string, PlannedCrawlTarget>();
  const crawledPageTypes = new Set(pages.map((page) => page.pageType));

  for (const page of pages) {
    for (const rawLink of page.links) {
      let url: string;

      try {
        url = normalizeUrl(rawLink);
      } catch {
        continue;
      }

      if (visited.has(url) || !isCrawlableInternalPage(url, homepageUrl)) {
        continue;
      }

      const scored = scoreUrl(url, homepageUrl);
      const diversityBoost = crawledPageTypes.has(scored.pageType) ? 0 : 35;
      const target = {
        url,
        pageType: scored.pageType,
        score: scored.score + diversityBoost,
        reason: diversityBoost > 0 ? `new ${scored.pageType} evidence` : scored.reason
      };
      const existing = candidates.get(url);

      if (!existing || target.score > existing.score) {
        candidates.set(url, target);
      }
    }
  }

  return Array.from(candidates.values())
    .sort((a, b) => b.score - a.score || a.url.localeCompare(b.url))
    .slice(0, maxTargets);
}

export async function planNextCrawlTargetsWithAgent(
  pages: CrawledPage[],
  homepageUrl: string,
  visited: Set<string>,
  maxTargets: number
): Promise<PlannedCrawlTarget[]> {
  const fallback = planNextCrawlTargets(pages, homepageUrl, visited, maxTargets);

  if (!isOpenRouterConfigured() || fallback.length === 0) {
    return fallback;
  }

  const agentSchema = inferJsonSchema({
    targets: [
      {
        url: "https://example.com/pricing",
        reason: "pricing and offer evidence",
        priority: "high"
      }
    ]
  });
  const prompt = [
    "You are the BetterYourAds Website Research Planner Agent.",
    "Choose the next website pages to crawl for B2B SaaS Website DNA extraction.",
    "Use only the candidate URLs provided. Do not invent URLs.",
    "Prefer pages that reveal pricing, product, features, integrations, proof, customers, case studies, security, comparison, FAQ, and about/company context.",
    "Avoid low-value pages like blog posts, careers pages, press archives, legal boilerplate, assets, and duplicate pages unless there is no better evidence.",
    "Return only selected targets in priority order."
  ].join("\n");
  const aiOutput = await requestStructuredJson(
    prompt,
    {
      homepage_url: homepageUrl,
      already_crawled_pages: pages.map((page) => ({
        url: page.url,
        page_type: page.pageType,
        headings: page.headings.slice(0, 8)
      })),
      candidates: fallback.map((target) => ({
        url: target.url,
        page_type: target.pageType,
        deterministic_score: target.score,
        deterministic_reason: target.reason
      })),
      max_targets: maxTargets
    },
    "WEBSITE_RESEARCH_PLANNER_JSON",
    agentSchema
  ).catch((error) => {
    logger.warn(
      { error: error instanceof Error ? error.message : String(error) },
      "website research planner agent failed; using deterministic crawl plan"
    );
    return null;
  });

  const targets =
    aiOutput && typeof aiOutput === "object" && "targets" in aiOutput
      ? (aiOutput as AgentPlannerOutput).targets
      : [];
  const fallbackByUrl = new Map(fallback.map((target) => [target.url, target]));
  const selected: PlannedCrawlTarget[] = [];

  for (const target of targets) {
    const fallbackTarget = fallbackByUrl.get(target.url);

    if (!fallbackTarget || selected.some((item) => item.url === target.url)) {
      continue;
    }

    selected.push({
      ...fallbackTarget,
      reason: target.reason || fallbackTarget.reason
    });
  }

  if (selected.length === 0) {
    return fallback;
  }

  return selected.slice(0, maxTargets);
}
