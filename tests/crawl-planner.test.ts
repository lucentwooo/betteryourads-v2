import { describe, expect, it } from "vitest";
import { planNextCrawlTargets } from "../src/lib/crawler/crawl-planner";
import type { CrawledPage } from "../src/lib/crawler/types";

function page(overrides: Partial<CrawledPage>): CrawledPage {
  return {
    url: "https://example.com/",
    pageType: "homepage",
    html: "",
    text: "",
    headings: [],
    ctas: [],
    links: [],
    metadata: {
      title: "",
      description: "",
      canonicalUrl: "https://example.com/",
      openGraph: {},
      twitter: {},
      schemaTypes: []
    },
    assets: [],
    colors: [],
    ...overrides
  };
}

describe("crawl planner", () => {
  it("prioritises high-value SaaS evidence pages over generic links", () => {
    const targets = planNextCrawlTargets(
      [
        page({
          links: [
            "https://example.com/blog/company-update",
            "https://example.com/pricing",
            "https://example.com/customers",
            "https://example.com/security",
            "https://example.com/careers"
          ]
        })
      ],
      "https://example.com/",
      new Set(["https://example.com/"]),
      3
    );

    expect(targets.map((target) => target.pageType)).toEqual([
      "pricing",
      "testimonials",
      "security"
    ]);
  });

  it("does not plan already visited links or static assets", () => {
    const targets = planNextCrawlTargets(
      [
        page({
          links: [
            "https://example.com/pricing",
            "https://example.com/logo.svg",
            "https://example.com/features"
          ]
        })
      ],
      "https://example.com/",
      new Set(["https://example.com/", "https://example.com/pricing"]),
      10
    );

    expect(targets.map((target) => target.url)).toEqual([
      "https://example.com/features"
    ]);
  });
});
