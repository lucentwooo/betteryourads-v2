import * as cheerio from "cheerio";
import type { PageMetadata } from "@/lib/crawler/types";

function collectMeta($: cheerio.CheerioAPI, prefix: string) {
  const values: Record<string, string> = {};

  $(`meta[property^='${prefix}'],meta[name^='${prefix}']`).each((_, element) => {
    const key =
      $(element).attr("property")?.replace(`${prefix}:`, "") ??
      $(element).attr("name")?.replace(`${prefix}:`, "");
    const value = $(element).attr("content");

    if (key && value) {
      values[key] = value;
    }
  });

  return values;
}

export function extractMetadata(html: string, url: string): PageMetadata {
  const $ = cheerio.load(html);
  const title =
    $("title").first().text().trim() ||
    $("meta[property='og:title']").attr("content") ||
    "";
  const description =
    $("meta[name='description']").attr("content") ||
    $("meta[property='og:description']").attr("content") ||
    "";
  const canonical = $("link[rel='canonical']").attr("href");
  const schemaTypes: string[] = [];

  $("script[type='application/ld+json']").each((_, element) => {
    const raw = $(element).contents().text();
    try {
      const parsed = JSON.parse(raw) as unknown;
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (item && typeof item === "object" && "@type" in item) {
          const type = (item as Record<string, unknown>)["@type"];
          if (typeof type === "string") {
            schemaTypes.push(type);
          }
        }
      }
    } catch {
      // Invalid JSON-LD should not block extraction.
    }
  });

  return {
    title,
    description,
    canonicalUrl: canonical ? new URL(canonical, url).toString() : url,
    openGraph: collectMeta($, "og"),
    twitter: collectMeta($, "twitter"),
    schemaTypes: Array.from(new Set(schemaTypes))
  };
}
