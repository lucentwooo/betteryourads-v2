import { describe, expect, it } from "vitest";
import {
  crawlWebsite,
  resolveScreenshotPages,
  shouldUseBrowserForPage
} from "../src/lib/crawler/crawler";

describe("crawler screenshot mode", () => {
  const homepage = "https://example.com/";

  it("defaults invalid screenshot modes to homepage-only", () => {
    expect(resolveScreenshotPages(undefined)).toBe("homepage");
    expect(resolveScreenshotPages("")).toBe("homepage");
    expect(resolveScreenshotPages("pricing")).toBe("homepage");
  });

  it("uses browser only for the homepage in homepage mode", () => {
    expect(shouldUseBrowserForPage(homepage, homepage, "homepage")).toBe(true);
    expect(
      shouldUseBrowserForPage("https://example.com/pricing", homepage, "homepage")
    ).toBe(false);
  });

  it("supports all and none screenshot modes", () => {
    expect(shouldUseBrowserForPage("https://example.com/pricing", homepage, "all")).toBe(
      true
    );
    expect(
      shouldUseBrowserForPage("https://example.com/", homepage, "none")
    ).toBe(false);
  });

  it("records fetch-only failures instead of rejecting the crawl", async () => {
    const result = await crawlWebsite("http://127.0.0.1:1", {
      maxPages: 1,
      screenshotPages: "none",
      timeoutMs: 100
    });

    expect(result.pages).toHaveLength(1);
    expect(result.errors).toHaveLength(1);
    expect(result.pages[0].crawlError).toBeTruthy();
  });
});
