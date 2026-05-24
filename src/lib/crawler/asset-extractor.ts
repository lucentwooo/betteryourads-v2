import * as cheerio from "cheerio";
import type { PageAsset } from "@/lib/crawler/types";

function safeAbsoluteUrl(value: string | undefined, baseUrl: string) {
  if (!value || value.startsWith("data:")) {
    return null;
  }

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return null;
  }
}

export function extractAssets(html: string, baseUrl: string): PageAsset[] {
  const $ = cheerio.load(html);
  const assets: PageAsset[] = [];

  $("img,source").each((_, element) => {
    const src =
      $(element).attr("src") ??
      $(element).attr("srcset")?.split(",")[0]?.trim().split(" ")[0];
    const url = safeAbsoluteUrl(src, baseUrl);
    if (!url) {
      return;
    }

    const alt = $(element).attr("alt")?.trim();
    const lower = `${url} ${alt ?? ""}`.toLowerCase();
    assets.push({
      type: lower.includes("logo") ? "logo" : "image",
      url,
      alt,
      width: Number($(element).attr("width")) || undefined,
      height: Number($(element).attr("height")) || undefined,
      confidence: lower.includes("logo") ? "high" : "medium"
    });
  });

  $("link[rel*='icon']").each((_, element) => {
    const url = safeAbsoluteUrl($(element).attr("href"), baseUrl);
    if (url) {
      assets.push({ type: "favicon", url, confidence: "high" });
    }
  });

  $("link[rel='stylesheet']").each((_, element) => {
    const url = safeAbsoluteUrl($(element).attr("href"), baseUrl);
    if (url) {
      assets.push({ type: "stylesheet", url, confidence: "medium" });
    }
  });

  return assets.filter(
    (asset, index, all) => all.findIndex((other) => other.url === asset.url) === index
  );
}
