import { readFile } from "node:fs/promises";
import path from "node:path";
import type { BrandExtractionJson } from "@/lib/schema/brand-extraction";

function compact(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

export async function runExternalResearchAgent(
  extraction: BrandExtractionJson
): Promise<Pick<BrandExtractionJson, "external_customer_research_plan" | "competitor_intelligence">> {
  await readFile(
    path.join(process.cwd(), "src", "prompts", "external-research-agent.md"),
    "utf8"
  ).catch(() => "");

  const brand = extraction.brand_identity.brand_name;
  const category =
    extraction.brand_identity.category !== "unknown"
      ? extraction.brand_identity.category
      : "SaaS";
  const customer =
    extraction.brand_identity.primary_customer !== "unknown"
      ? extraction.brand_identity.primary_customer
      : "target customers";

  return {
    external_customer_research_plan: {
      recommended_subreddits: compact([
        `r/SaaS searches for ${category}`,
        `r/startups searches for ${category}`,
        `r/marketing searches for ${category}`,
        `r/smallbusiness searches for ${category}`
      ]),
      review_sites: ["G2", "Capterra", "Product Hunt", "TrustRadius"],
      communities: compact([
        "LinkedIn posts and comments from category buyers",
        "YouTube software review comments",
        "Founder and growth communities where the category is discussed"
      ]),
      search_queries: compact([
        `"${brand}" reviews`,
        `"${brand}" alternatives`,
        `"${brand}" vs`,
        `"${category}" software reviews`,
        `"${category}" pain points`,
        `"${customer}" "${category}" workflow problems`
      ]),
      competitor_review_targets: compact([
        `G2 category pages for ${category}`,
        `Capterra category pages for ${category}`,
        `Product Hunt alternatives to ${brand}`
      ]),
      what_to_extract: [
        "Repeated customer pain points",
        "Objections before purchase",
        "Buying triggers",
        "Complaints about alternatives",
        "Desired outcomes",
        "Exact customer language",
        "Decision criteria",
        "Security or implementation concerns"
      ]
    },
    competitor_intelligence: {
      ...extraction.competitor_intelligence,
      category_norms: compact([
        ...extraction.competitor_intelligence.category_norms.map(String),
        "Review category landing pages before claiming category-level norms."
      ]),
      research_needed: compact([
        ...extraction.competitor_intelligence.research_needed.map(String),
        "No external competitor findings are invented by this agent.",
        "Use public review sites and comparison searches to identify direct and indirect competitors."
      ])
    }
  };
}
