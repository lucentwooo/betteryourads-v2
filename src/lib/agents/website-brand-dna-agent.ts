import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CrawlResult, CrawledPage } from "@/lib/crawler/types";
import { truncateForModel } from "@/lib/crawler/content-cleaner";
import { appendSourceMapEntry } from "@/lib/crawler/source-mapper";
import {
  EMPTY_BRAND_EXTRACTION,
  type BrandExtractionJson
} from "@/lib/schema/brand-extraction";
import { requestBrandExtractionJson } from "@/lib/agents/openrouter-json";
import { validateBrandExtractionJson } from "@/lib/validators/json-validator";

function unique<T>(values: T[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function cloneEmpty(): BrandExtractionJson {
  return structuredClone(EMPTY_BRAND_EXTRACTION);
}

function getHomepage(crawl: CrawlResult) {
  return (
    crawl.pages.find((page) => page.pageType === "homepage") ??
    crawl.pages[0]
  );
}

function detectSalesMotion(ctas: string[]) {
  const text = ctas.join(" ").toLowerCase();
  if (/book|demo|talk to sales|contact sales/.test(text) && /start|trial|sign up|signup/.test(text)) {
    return "hybrid";
  }
  if (/book|demo|talk to sales|contact sales/.test(text)) {
    return "demo-led";
  }
  if (/start|trial|sign up|signup|try free/.test(text)) {
    return "self-serve";
  }
  return "unknown";
}

function extractPlans(pages: CrawledPage[]) {
  const pricingPage = pages.find((page) => page.pageType === "pricing");
  if (!pricingPage) {
    return [];
  }

  return pricingPage.headings
    .filter((heading) => heading.length <= 40)
    .filter((heading) => !/pricing|plans|choose|faq/i.test(heading))
    .slice(0, 8);
}

function extractFeatureHeadings(pages: CrawledPage[]) {
  return unique(
    pages
      .filter((page) => ["homepage", "feature", "product"].includes(page.pageType))
      .flatMap((page) => page.headings.slice(1))
      .filter((heading) => heading.length >= 4 && heading.length <= 120)
  ).slice(0, 18);
}

function extractExactPhrases(pages: CrawledPage[]) {
  const phrasePatterns = [
    /"([^"]{12,220})"/g,
    /“([^”]{12,220})”/g,
    /'([^']{12,220})'/g
  ];
  const phrases: string[] = [];

  for (const page of pages) {
    for (const pattern of phrasePatterns) {
      for (const match of page.text.matchAll(pattern)) {
        phrases.push(match[1].trim());
      }
    }
  }

  return unique(phrases).slice(0, 20);
}

function detectPricingModel(pages: CrawledPage[]) {
  const pricingPage = pages.find((page) => page.pageType === "pricing");
  if (!pricingPage) {
    return "unknown";
  }

  const text = pricingPage.text.toLowerCase();
  if (/per user|seat|member/.test(text)) {
    return "per-seat subscription";
  }
  if (/month|monthly|annual|year/.test(text)) {
    return "subscription";
  }
  if (/custom|contact sales/.test(text)) {
    return "custom pricing";
  }

  return "unknown";
}

function detectTrial(pages: CrawledPage[]) {
  const text = pages.map((page) => page.text).join(" ").toLowerCase();
  if (/free trial|try .* free|start free/.test(text)) {
    return "available";
  }
  return "unknown";
}

function detectDemo(ctas: string[]) {
  if (ctas.some((cta) => /demo|talk to sales|contact sales/i.test(cta))) {
    return "available";
  }
  return "unknown";
}

function buildFallbackExtraction(crawl: CrawlResult): BrandExtractionJson {
  const extraction = cloneEmpty();
  const homepage = getHomepage(crawl);
  const homepageUrl = homepage?.url ?? crawl.normalizedUrl;
  const homepageHeadings = homepage?.headings ?? [];
  const allCtas = unique(crawl.pages.flatMap((page) => page.ctas)).slice(0, 30);
  const allAssets = unique(crawl.pages.flatMap((page) => page.assets.map((asset) => asset.url)));
  const logos = crawl.pages
    .flatMap((page) => page.assets)
    .filter((asset) => asset.type === "logo" || asset.type === "favicon")
    .map((asset) => ({
      url: asset.url,
      alt: asset.alt ?? "",
      source_url: homepageUrl,
      confidence: asset.confidence
    }));
  const colors = crawl.pages.flatMap((page) => page.colors);
  const featureHeadings = extractFeatureHeadings(crawl.pages);
  const pricingPage = crawl.pages.find((page) => page.pageType === "pricing");
  const comparisonPages = crawl.pages
    .filter((page) => page.pageType === "comparison")
    .map((page) => page.url);

  extraction.brand_identity.website_url = crawl.normalizedUrl;
  extraction.brand_identity.landing_page_url = homepageUrl;
  extraction.brand_identity.brand_name =
    homepage?.metadata.openGraph.site_name ??
    homepage?.metadata.title.split(/[|-]/)[0]?.trim() ??
    "unknown";
  extraction.brand_identity.product_name = extraction.brand_identity.brand_name;
  extraction.brand_identity.one_line_description =
    homepage?.metadata.description || homepageHeadings[0] || "unknown";
  extraction.brand_identity.category = "unknown";
  extraction.brand_identity.positioning_statement = homepageHeadings[0] || "unknown";
  extraction.brand_identity.primary_outcome = homepageHeadings[0] || "unknown";
  extraction.brand_identity.confidence = homepage ? "medium" : "low";

  extraction.visual_brand_system.logos = logos;
  extraction.visual_brand_system.colors.primary = colors
    .filter((color) => color.role === "primary")
    .map((color) => color.hex);
  extraction.visual_brand_system.colors.secondary = colors
    .filter((color) => color.role === "secondary")
    .map((color) => color.hex);
  extraction.visual_brand_system.colors.accent = colors
    .filter((color) => color.role === "accent")
    .map((color) => color.hex);
  extraction.visual_brand_system.colors.neutral = colors
    .filter((color) => color.role === "neutral")
    .map((color) => color.hex);
  extraction.visual_brand_system.colors.background = colors
    .filter((color) => color.role === "background")
    .map((color) => color.hex);
  extraction.visual_brand_system.colors.text = colors
    .filter((color) => color.role === "text")
    .map((color) => color.hex);
  extraction.visual_brand_system.colors.cta = extraction.visual_brand_system.colors.accent.slice(0, 3);

  extraction.product_representation.screenshots = crawl.pages
    .filter((page) => page.screenshotPath)
    .map((page) => ({
      source_url: page.url,
      screenshot_path: page.screenshotPath,
      page_type: page.pageType
    }));
  extraction.product_representation.feature_visuals = allAssets
    .filter((url) => /product|dashboard|app|feature|screen|ui/i.test(url))
    .slice(0, 20);
  extraction.product_representation.integration_visuals = crawl.pages
    .filter((page) => page.pageType === "integrations")
    .flatMap((page) => page.assets.map((asset) => asset.url))
    .slice(0, 20);
  extraction.product_representation.recommended_ad_visuals =
    extraction.product_representation.feature_visuals.slice(0, 5);

  extraction.offer_dna.product = extraction.brand_identity.product_name;
  extraction.offer_dna.main_promise = homepageHeadings[0] || "unknown";
  extraction.offer_dna.key_features = featureHeadings;
  extraction.offer_dna.key_benefits = featureHeadings.slice(0, 8);
  extraction.offer_dna.pricing_model = detectPricingModel(crawl.pages);
  extraction.offer_dna.plans = extractPlans(crawl.pages);
  extraction.offer_dna.free_trial = detectTrial(crawl.pages);
  extraction.offer_dna.demo_available = detectDemo(allCtas);
  extraction.offer_dna.primary_cta = allCtas[0] ?? "unknown";
  extraction.offer_dna.secondary_cta = allCtas[1] ?? "unknown";
  extraction.offer_dna.sales_motion = detectSalesMotion(allCtas);
  extraction.offer_dna.integrations = crawl.pages
    .filter((page) => page.pageType === "integrations")
    .flatMap((page) => page.headings)
    .slice(0, 20);

  extraction.messaging_foundation.homepage_headline = homepageHeadings[0] ?? "unknown";
  extraction.messaging_foundation.homepage_subheadline =
    homepage?.metadata.description || homepageHeadings[1] || "unknown";
  extraction.messaging_foundation.value_props = featureHeadings.slice(0, 10);
  extraction.messaging_foundation.features = featureHeadings;
  extraction.messaging_foundation.cta_language = allCtas;
  extraction.messaging_foundation.headline_patterns = homepageHeadings
    .slice(0, 12)
    .map((heading) => heading.length < 55 ? "short benefit-led headline" : "detailed explanatory headline");
  extraction.messaging_foundation.tone_notes = [
    "Deterministic fallback: tone should be reviewed by OpenRouter extraction or a human analyst."
  ];

  extraction.proof_library.testimonials = extractExactPhrases(crawl.pages);
  extraction.proof_library.security_badges = crawl.pages
    .filter((page) => page.pageType === "security")
    .flatMap((page) => page.headings)
    .filter((heading) => /soc|iso|gdpr|hipaa|security|privacy|compliance/i.test(heading))
    .slice(0, 12);
  extraction.proof_library.safe_ad_proof_points = [
    ...extraction.proof_library.testimonials,
    ...extraction.proof_library.security_badges
  ].slice(0, 10);

  extraction.customer_dna_from_website.exact_phrases = extractExactPhrases(crawl.pages);
  extraction.customer_dna_from_website.real_customer_quotes =
    extraction.proof_library.testimonials;

  extraction.competitor_intelligence.comparison_pages = comparisonPages;
  extraction.competitor_intelligence.research_needed = [
    "Identify direct competitors from G2, Capterra, Product Hunt, comparison pages, and category searches.",
    "Extract customer complaints and decision criteria from competitor reviews."
  ];

  extraction.claim_constraints.allowed_claims = [
    homepageHeadings[0] ?? "",
    homepage?.metadata.description ?? ""
  ].filter(Boolean);
  extraction.claim_constraints.claims_requiring_proof = [
    "Any metric, ROI, customer-count, ranking, security certification, or comparative superiority claim not visible in source_map."
  ];
  extraction.claim_constraints.forbidden_claims = [
    "Do not invent customer logos, metrics, testimonials, pricing, guarantees, certifications, or competitor comparisons."
  ];
  extraction.claim_constraints.correct_terms = unique([
    extraction.brand_identity.brand_name,
    extraction.brand_identity.product_name
  ]).filter((value) => value !== "unknown");

  extraction.static_ad_creative_recommendations.best_customer_segment =
    extraction.brand_identity.primary_customer;
  extraction.static_ad_creative_recommendations.best_desired_outcome =
    extraction.brand_identity.primary_outcome;
  extraction.static_ad_creative_recommendations.best_product_visual =
    String(extraction.product_representation.recommended_ad_visuals[0] ?? "unknown");
  extraction.static_ad_creative_recommendations.best_cta = extraction.offer_dna.primary_cta;
  extraction.static_ad_creative_recommendations.negative_constraints = [
    "No unsupported metrics",
    "No invented customer logos",
    "No invented security certifications",
    "No reference ad analysis",
    "No image generation prompt"
  ];

  extraction.missing_information.must_ask_client = [
    "Primary target customer if not explicit on the website",
    "Best current offer and campaign goal",
    "Claims, logos, testimonials, and metrics approved for advertising"
  ];
  extraction.missing_information.nice_to_have = [
    "Brand guidelines",
    "Product screenshots approved for ads",
    "Customer research, win/loss notes, or review exports"
  ];
  extraction.missing_information.not_found_on_website = [
    ...(!pricingPage ? ["Pricing page"] : []),
    ...(extraction.proof_library.testimonials.length === 0 ? ["Testimonials"] : []),
    ...(extraction.proof_library.security_badges.length === 0 ? ["Security certifications"] : [])
  ];

  appendSourceMapEntry(
    extraction.source_map,
    "brand_identity.brand_name",
    extraction.brand_identity.brand_name,
    homepageUrl,
    "medium"
  );
  appendSourceMapEntry(
    extraction.source_map,
    "brand_identity.one_line_description",
    extraction.brand_identity.one_line_description,
    homepageUrl,
    "medium"
  );
  appendSourceMapEntry(
    extraction.source_map,
    "messaging_foundation.homepage_headline",
    extraction.messaging_foundation.homepage_headline,
    homepageUrl,
    "high"
  );
  appendSourceMapEntry(
    extraction.source_map,
    "offer_dna.primary_cta",
    extraction.offer_dna.primary_cta,
    homepageUrl,
    "medium"
  );

  for (const feature of featureHeadings.slice(0, 12)) {
    const source = crawl.pages.find((page) => page.headings.includes(feature));
    appendSourceMapEntry(
      extraction.source_map,
      "offer_dna.key_features",
      feature,
      source?.url ?? homepageUrl,
      "medium"
    );
  }

  return extraction;
}

async function loadPrompt() {
  return readFile(
    path.join(process.cwd(), "src", "prompts", "website-brand-dna-agent.md"),
    "utf8"
  );
}

export async function runWebsiteBrandDnaAgent(
  crawl: CrawlResult
): Promise<BrandExtractionJson> {
  const prompt = await loadPrompt();
  const modelInput = {
    website_url: crawl.normalizedUrl,
    pages: crawl.pages.map((page) => ({
      url: page.url,
      page_type: page.pageType,
      metadata: page.metadata,
      headings: page.headings,
      ctas: page.ctas,
      assets: page.assets,
      colors: page.colors,
      text: truncateForModel(page.text)
    })),
    rules: {
      no_reference_ad_analysis: true,
      no_image_generation: true,
      no_render_prompt_generation: true,
      no_prisma: true
    }
  };

  const aiOutput = await requestBrandExtractionJson(prompt, modelInput).catch(() => null);

  if (aiOutput) {
    const validation = validateBrandExtractionJson(aiOutput);
    if (validation.ok) {
      return validation.data;
    }
  }

  return buildFallbackExtraction(crawl);
}
