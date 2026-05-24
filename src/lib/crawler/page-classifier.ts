import type { PageType } from "@/lib/crawler/types";

const pageTypePatterns: Array<[PageType, RegExp]> = [
  ["pricing", /(^|\/)(pricing|plans|price)(\/|$)/i],
  ["integrations", /(^|\/)(integrations?|apps?|marketplace)(\/|$)/i],
  ["docs", /(^|\/)(docs?|developers?|api|help|support|knowledge-base)(\/|$)/i],
  ["testimonials", /(^|\/)(testimonials?|customers|reviews)(\/|$)/i],
  ["case_study", /(^|\/)(case-studies|case-study|stories|customer-stories)(\/|$)/i],
  ["security", /(^|\/)(security|privacy|trust|compliance|legal)(\/|$)/i],
  ["comparison", /(^|\/)(compare|comparison|versus|vs|alternatives?)(\/|$)/i],
  ["about", /(^|\/)(about|company|team)(\/|$)/i],
  ["faq", /(^|\/)(faq|faqs|questions)(\/|$)/i],
  ["feature", /(^|\/)(features?|solutions?|use-cases?)(\/|$)/i],
  ["product", /(^|\/)(product|platform|software)(\/|$)/i],
  ["landing", /(^|\/)(lp|landing|campaign)(\/|$)/i]
];

export function classifyPage(url: string, homepageUrl: string): PageType {
  const parsed = new URL(url);
  const homepage = new URL(homepageUrl);
  const normalizedPath = parsed.pathname.replace(/\/+$/, "") || "/";

  if (
    parsed.origin === homepage.origin &&
    (normalizedPath === "/" || normalizedPath === "")
  ) {
    return "homepage";
  }

  for (const [type, pattern] of pageTypePatterns) {
    if (pattern.test(parsed.pathname)) {
      return type;
    }
  }

  return "other";
}

export function isRelevantPublicPage(url: string, homepageUrl: string): boolean {
  const parsed = new URL(url);
  const homepage = new URL(homepageUrl);

  if (parsed.origin !== homepage.origin) {
    return false;
  }

  if (/\.(pdf|zip|png|jpe?g|gif|webp|svg|mp4|mov|avi|css|js)$/i.test(parsed.pathname)) {
    return false;
  }

  return classifyPage(url, homepageUrl) !== "other" || parsed.pathname === "/";
}
