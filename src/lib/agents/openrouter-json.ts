import OpenAI from "openai";
import { logger } from "@/lib/logging/logger";
import { BrandExtractionSchema } from "@/lib/schema/brand-extraction";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const DEFAULT_OPENROUTER_MODEL = "deepseek/deepseek-v4-flash";

export function resolveOpenRouterModel() {
  return process.env.OPENROUTER_MODEL ?? DEFAULT_OPENROUTER_MODEL;
}

export function isOpenRouterConfigured() {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

export async function requestStructuredJson(
  systemPrompt: string,
  userPayload: unknown,
  schemaName: string,
  schema: Record<string, unknown>
) {
  if (!process.env.OPENROUTER_API_KEY) {
    logger.warn({ schemaName }, "openrouter api key is not configured; skipping model request");
    return null;
  }

  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL ?? OPENROUTER_BASE_URL,
    defaultHeaders: {
      "HTTP-Referer":
        process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME ?? "BetterYourAds"
    }
  });
  const model = resolveOpenRouterModel();

  logger.info(
    {
      model,
      schemaName
    },
    "starting openrouter structured json request"
  );

  const response = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: JSON.stringify(userPayload)
      }
    ],
    temperature: 0.1,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: schemaName,
        strict: true,
        schema
      }
    }
  });

  const content = response.choices[0]?.message.content;

  logger.info(
    {
      model,
      schemaName,
      finishReason: response.choices[0]?.finish_reason,
      promptTokens: response.usage?.prompt_tokens,
      completionTokens: response.usage?.completion_tokens
    },
    "finished openrouter structured json request"
  );

  if (!content) {
    return null;
  }

  return JSON.parse(content) as unknown;
}

export async function requestBrandExtractionJson(
  systemPrompt: string,
  userPayload: unknown
) {
  return requestStructuredJson(
    systemPrompt,
    userPayload,
    "BRAND_EXTRACTION_JSON",
    zodShapeToJsonSchemaShape()
  );
}

export function inferJsonSchema(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    return { type: "string" };
  }

  if (Array.isArray(value)) {
    return { type: "array", items: {} };
  }

  if (value && typeof value === "object") {
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    for (const [key, child] of Object.entries(value)) {
      properties[key] = inferJsonSchema(child);
      required.push(key);
    }

    return {
      type: "object",
      additionalProperties: false,
      properties,
      required
    };
  }

  return {};
}

function zodShapeToJsonSchemaShape() {
  // Keep the OpenRouter structured-output contract aligned with the app schema
  // without adding a second runtime dependency for schema conversion. The
  // stricter Zod validator still runs after model output.
  const empty = BrandExtractionSchema.parse({
    brand_identity: {
      brand_name: "unknown",
      product_name: "unknown",
      website_url: "unknown",
      landing_page_url: "unknown",
      category: "unknown",
      one_line_description: "unknown",
      primary_customer: "unknown",
      primary_industry: "unknown",
      primary_role: "unknown",
      primary_outcome: "unknown",
      positioning_statement: "unknown",
      confidence: "low"
    },
    visual_brand_system: {
      logos: [],
      colors: {
        primary: [],
        secondary: [],
        accent: [],
        neutral: [],
        background: [],
        text: [],
        cta: []
      },
      typography: {
        font_families: [],
        heading_style: "unknown",
        body_style: "unknown",
        button_style: "unknown",
        casing_style: "unknown"
      },
      ui_style: {
        button_style: "unknown",
        card_style: "unknown",
        corner_radius: "unknown",
        border_style: "unknown",
        shadow_style: "unknown",
        icon_style: "unknown",
        illustration_style: "unknown",
        screenshot_style: "unknown",
        spacing_style: "unknown",
        layout_style: "unknown",
        overall_mood: "unknown"
      }
    },
    product_representation: {
      screenshots: [],
      dashboard_visuals: [],
      feature_visuals: [],
      workflow_visuals: [],
      integration_visuals: [],
      recommended_ad_visuals: [],
      visuals_to_avoid: []
    },
    offer_dna: {
      product: "unknown",
      main_problem_solved: "unknown",
      main_promise: "unknown",
      main_use_case: "unknown",
      target_customer: "unknown",
      target_industry: "unknown",
      target_role: "unknown",
      key_features: [],
      key_benefits: [],
      pricing_model: "unknown",
      plans: [],
      free_trial: "unknown",
      demo_available: "unknown",
      entry_offer: "unknown",
      primary_cta: "unknown",
      secondary_cta: "unknown",
      sales_motion: "unknown",
      risk_reversal: "unknown",
      guarantee: "unknown",
      onboarding_promise: "unknown",
      time_to_value: "unknown",
      integrations: [],
      main_differentiator: "unknown"
    },
    messaging_foundation: {
      homepage_headline: "unknown",
      homepage_subheadline: "unknown",
      value_props: [],
      features: [],
      benefits: [],
      use_cases: [],
      customer_segments: [],
      pain_points_mentioned: [],
      outcomes_mentioned: [],
      objections_addressed: [],
      faq_themes: [],
      cta_language: [],
      repeated_phrases: [],
      headline_patterns: [],
      tone_notes: []
    },
    proof_library: {
      customer_logos: [],
      testimonials: [],
      case_study_metrics: [],
      roi_claims: [],
      usage_numbers: [],
      review_ratings: [],
      security_badges: [],
      press_mentions: [],
      awards: [],
      safe_ad_proof_points: []
    },
    customer_dna_from_website: {
      brand_claims_about_customers: [],
      real_customer_quotes: [],
      pains: [],
      desired_outcomes: [],
      objections: [],
      buying_triggers: [],
      alternatives: [],
      decision_criteria: [],
      exact_phrases: []
    },
    external_customer_research_plan: {
      recommended_subreddits: [],
      review_sites: [],
      communities: [],
      search_queries: [],
      competitor_review_targets: [],
      what_to_extract: []
    },
    competitor_intelligence: {
      direct_competitors: [],
      indirect_competitors: [],
      manual_alternatives: [],
      comparison_pages: [],
      differentiators: [],
      category_norms: [],
      research_needed: []
    },
    claim_constraints: {
      allowed_claims: [],
      claims_requiring_proof: [],
      unsupported_claims: [],
      forbidden_claims: [],
      required_disclaimers: [],
      correct_terms: [],
      terms_to_avoid: [],
      compliance_notes: []
    },
    static_ad_creative_recommendations: {
      best_customer_segment: "unknown",
      best_pain_point: "unknown",
      best_desired_outcome: "unknown",
      best_proof_point: "unknown",
      best_product_visual: "unknown",
      best_cta: "unknown",
      best_visual_metaphor: "unknown",
      best_layout_direction: "unknown",
      best_background_treatment: "unknown",
      best_logo_placement: "unknown",
      negative_constraints: [],
      ad_concepts: []
    },
    missing_information: {
      must_ask_client: [],
      nice_to_have: [],
      not_found_on_website: []
    },
    source_map: []
  });

  return inferJsonSchema(empty);
}
