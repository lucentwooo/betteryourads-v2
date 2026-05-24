import type { Confidence } from "@/lib/schema/brand-extraction";

export type PageType =
  | "homepage"
  | "landing"
  | "pricing"
  | "product"
  | "feature"
  | "integrations"
  | "docs"
  | "testimonials"
  | "case_study"
  | "security"
  | "comparison"
  | "about"
  | "faq"
  | "other";

export type PageAsset = {
  type: "image" | "logo" | "favicon" | "script" | "stylesheet";
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  confidence: Confidence;
};

export type PageMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
  schemaTypes: string[];
};

export type ExtractedColor = {
  hex: string;
  role: "primary" | "secondary" | "accent" | "neutral" | "background" | "text" | "cta";
  source: string;
  confidence: Confidence;
};

export type CrawledPage = {
  url: string;
  pageType: PageType;
  html: string;
  text: string;
  headings: string[];
  ctas: string[];
  links: string[];
  metadata: PageMetadata;
  assets: PageAsset[];
  colors: ExtractedColor[];
  screenshotPath?: string;
  crawlError?: string;
};

export type CrawlResult = {
  requestedUrl: string;
  normalizedUrl: string;
  pages: CrawledPage[];
  errors: string[];
};
