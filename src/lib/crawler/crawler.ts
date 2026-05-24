import * as cheerio from "cheerio";
import {
  cleanHtmlToText,
  extractCtas,
  extractHeadings
} from "@/lib/crawler/content-cleaner";
import { extractAssets } from "@/lib/crawler/asset-extractor";
import { extractColorsFromHtml } from "@/lib/crawler/colour-extractor";
import { extractMetadata } from "@/lib/crawler/metadata-extractor";
import { classifyPage, isRelevantPublicPage } from "@/lib/crawler/page-classifier";
import {
  planNextCrawlTargets,
  planNextCrawlTargetsWithAgent
} from "@/lib/crawler/crawl-planner";
import { capturePageScreenshot } from "@/lib/crawler/screenshot-extractor";
import type { CrawlResult, CrawledPage } from "@/lib/crawler/types";

export type CrawlOptions = {
  maxPages?: number;
  timeoutMs?: number;
  screenshotPages?: "homepage" | "all" | "none";
  mode?: "agentic" | "fifo";
};

export function resolveScreenshotPages(
  value?: string
): NonNullable<CrawlOptions["screenshotPages"]> {
  if (value === "all" || value === "none" || value === "homepage") {
    return value;
  }

  return "homepage";
}

export function shouldUseBrowserForPage(
  url: string,
  homepageUrl: string,
  screenshotPages: NonNullable<CrawlOptions["screenshotPages"]>
) {
  const pageType = classifyPage(url, homepageUrl);

  return (
    screenshotPages === "all" ||
    (screenshotPages === "homepage" && pageType === "homepage")
  );
}

function normalizeWebsiteUrl(input: string) {
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  const parsed = new URL(withProtocol);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs are supported.");
  }

  parsed.hash = "";
  return parsed.toString();
}

function extractLinks(html: string, baseUrl: string) {
  const $ = cheerio.load(html);
  const links: string[] = [];

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    try {
      const url = new URL(href, baseUrl);
      url.hash = "";
      links.push(url.toString());
    } catch {
      // Ignore malformed URLs.
    }
  });

  return Array.from(new Set(links));
}

async function fetchPageWithBrowser(
  url: string,
  homepageUrl: string,
  timeoutMs: number
): Promise<CrawledPage> {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
    userAgent:
      "Mozilla/5.0 BetterYourAdsBot/0.1 (+https://betteryourads.local; Website DNA extraction)"
  });

  try {
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: timeoutMs
    });
    const html = await page.content();
    const screenshotPath = await capturePageScreenshot(page, url).catch(() => undefined);

    return buildCrawledPage(url, homepageUrl, html, screenshotPath);
  } finally {
    await browser.close();
  }
}

async function fetchPageWithoutBrowser(
  url: string,
  homepageUrl: string,
  timeoutMs: number
): Promise<CrawledPage> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 BetterYourAdsBot/0.1 (+https://betteryourads.local; Website DNA extraction)"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    return buildCrawledPage(url, homepageUrl, html);
  } finally {
    clearTimeout(timeout);
  }
}

function buildCrawledPage(
  url: string,
  homepageUrl: string,
  html: string,
  screenshotPath?: string
): CrawledPage {
  return {
    url,
    pageType: classifyPage(url, homepageUrl),
    html,
    text: cleanHtmlToText(html),
    headings: extractHeadings(html),
    ctas: extractCtas(html),
    links: extractLinks(html, url),
    metadata: extractMetadata(html, url),
    assets: extractAssets(html, url),
    colors: extractColorsFromHtml(html),
    screenshotPath
  };
}

function buildFailedCrawledPage(
  url: string,
  homepageUrl: string,
  crawlError: string
): CrawledPage {
  return {
    url,
    pageType: classifyPage(url, homepageUrl),
    html: "",
    text: "",
    headings: [],
    ctas: [],
    links: [],
    metadata: {
      title: "",
      description: "",
      canonicalUrl: url,
      openGraph: {},
      twitter: {},
      schemaTypes: []
    },
    assets: [],
    colors: [],
    crawlError
  };
}

async function crawlSinglePage(
  url: string,
  homepageUrl: string,
  timeoutMs: number,
  shouldUseBrowser: boolean
): Promise<CrawledPage> {
  if (!shouldUseBrowser) {
    try {
      return await fetchPageWithoutBrowser(url, homepageUrl, timeoutMs);
    } catch (fetchError) {
      return buildFailedCrawledPage(
        url,
        homepageUrl,
        fetchError instanceof Error ? fetchError.message : "fetch failed"
      );
    }
  }

  try {
    return await fetchPageWithBrowser(url, homepageUrl, timeoutMs);
  } catch (browserError) {
    try {
      return await fetchPageWithoutBrowser(url, homepageUrl, timeoutMs);
    } catch (fetchError) {
      return buildFailedCrawledPage(
        url,
        homepageUrl,
        `${browserError instanceof Error ? browserError.message : "browser failed"}; ${
          fetchError instanceof Error ? fetchError.message : "fetch failed"
        }`
      );
    }
  }
}

export async function crawlWebsite(
  websiteUrl: string,
  options: CrawlOptions = {}
): Promise<CrawlResult> {
  const maxPages = options.maxPages ?? Number(process.env.MAX_CRAWL_PAGES ?? 18);
  const timeoutMs = options.timeoutMs ?? Number(process.env.CRAWL_TIMEOUT_MS ?? 15000);
  const screenshotPages =
    options.screenshotPages ?? resolveScreenshotPages(process.env.CRAWL_SCREENSHOT_PAGES);
  const mode = options.mode ?? (process.env.CRAWL_MODE === "fifo" ? "fifo" : "agentic");
  const normalizedUrl = normalizeWebsiteUrl(websiteUrl);
  const queue = [normalizedUrl];
  const visited = new Set<string>();
  const pages: CrawledPage[] = [];
  const errors: string[] = [];

  while (queue.length > 0 && pages.length < maxPages) {
    const nextUrl = queue.shift();

    if (!nextUrl || visited.has(nextUrl)) {
      continue;
    }

    visited.add(nextUrl);

    if (!isRelevantPublicPage(nextUrl, normalizedUrl) && pages.length > 0) {
      continue;
    }

    const shouldUseBrowser = shouldUseBrowserForPage(
      nextUrl,
      normalizedUrl,
      screenshotPages
    );
    const page = await crawlSinglePage(
      nextUrl,
      normalizedUrl,
      timeoutMs,
      shouldUseBrowser
    );
    pages.push(page);

    if (page.crawlError) {
      errors.push(`${nextUrl}: ${page.crawlError}`);
      continue;
    }

    if (mode === "agentic") {
      const remainingSlots = maxPages - pages.length;
      const maxTargets = Math.min(remainingSlots, 8);
      const plannedTargets = (
        isOpenRouterPlannerEnabled()
          ? await planNextCrawlTargetsWithAgent(pages, normalizedUrl, visited, maxTargets)
          : planNextCrawlTargets(pages, normalizedUrl, visited, maxTargets)
      ).map((target) => target.url);

      queue.splice(0, queue.length, ...plannedTargets);
    } else {
      const relevantLinks = page.links
        .filter((link) => !visited.has(link))
        .filter((link) => isRelevantPublicPage(link, normalizedUrl));

      queue.push(...relevantLinks);
    }
  }

  return {
    requestedUrl: websiteUrl,
    normalizedUrl,
    pages,
    errors
  };
}

function isOpenRouterPlannerEnabled() {
  return process.env.CRAWL_AGENT_PLANNER === "openrouter";
}
