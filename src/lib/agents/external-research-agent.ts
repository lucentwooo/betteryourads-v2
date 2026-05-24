import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  inferJsonSchema,
  isOpenRouterConfigured,
  requestStructuredJson
} from "@/lib/agents/openrouter-json";
import { logger } from "@/lib/logging/logger";
import type { BrandExtractionJson } from "@/lib/schema/brand-extraction";

const StringArraySchema = z.array(z.unknown());

const ExternalResearchOutputSchema = z
  .object({
    external_customer_research_plan: z
      .object({
        recommended_subreddits: StringArraySchema,
        review_sites: StringArraySchema,
        communities: StringArraySchema,
        search_queries: StringArraySchema,
        competitor_review_targets: StringArraySchema,
        what_to_extract: StringArraySchema
      })
      .strict(),
    competitor_intelligence: z
      .object({
        direct_competitors: StringArraySchema,
        indirect_competitors: StringArraySchema,
        manual_alternatives: StringArraySchema,
        comparison_pages: StringArraySchema,
        differentiators: StringArraySchema,
        category_norms: StringArraySchema,
        research_needed: StringArraySchema
      })
      .strict()
  })
  .strict();

type ExternalResearchOutput = Pick<
  BrandExtractionJson,
  "external_customer_research_plan" | "competitor_intelligence"
>;

function compact(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function buildFallbackExternalResearch(
  extraction: BrandExtractionJson
): ExternalResearchOutput {
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

export async function runExternalResearchAgent(
  extraction: BrandExtractionJson
): Promise<ExternalResearchOutput> {
  const prompt = await readFile(
    path.join(process.cwd(), "src", "prompts", "external-research-agent.md"),
    "utf8"
  ).catch(() => "");
  const fallback = buildFallbackExternalResearch(extraction);
  let aiOutput: unknown = null;

  try {
    aiOutput = await requestStructuredJson(
      prompt,
      {
        brand_identity: extraction.brand_identity,
        offer_dna: extraction.offer_dna,
        messaging_foundation: extraction.messaging_foundation,
        customer_dna_from_website: extraction.customer_dna_from_website,
        proof_library: extraction.proof_library,
        competitor_intelligence: extraction.competitor_intelligence,
        rules: {
          do_not_invent_external_findings: true,
          return_research_targets_only_when_sources_are_unavailable: true,
          model_should_be_deepseek_via_openrouter: true
        }
      },
      "EXTERNAL_RESEARCH_AGENT_JSON",
      inferJsonSchema(fallback)
    );
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : String(error) },
      "external research agent openrouter request failed"
    );

    if (isOpenRouterConfigured()) {
      throw error;
    }
  }

  if (aiOutput) {
    const parsed = ExternalResearchOutputSchema.safeParse(aiOutput);

    if (parsed.success) {
      return parsed.data as ExternalResearchOutput;
    }

    logger.error(
      {
        errors: parsed.error.issues.map((issue) => {
          const path = issue.path.length > 0 ? issue.path.join(".") : "root";
          return `${path}: ${issue.message}`;
        })
      },
      "external research agent returned invalid json"
    );

    if (isOpenRouterConfigured()) {
      throw new Error("External Research Agent returned invalid JSON.");
    }
  }

  return fallback;
}
