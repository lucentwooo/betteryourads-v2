import { z } from "zod";

export const ConfidenceSchema = z.enum(["high", "medium", "low"]);

const stringArray = z.array(z.unknown());

export const SourceMapEntrySchema = z
  .object({
    field: z.string(),
    value: z.string(),
    source_url: z.string(),
    confidence: ConfidenceSchema
  })
  .strict();

export const AdConceptSchema = z
  .object({
    concept_name: z.string(),
    target_customer: z.string(),
    pain_point: z.string(),
    desired_outcome: z.string(),
    hook: z.string(),
    main_promise: z.string(),
    proof_point: z.string(),
    visual_metaphor: z.string(),
    suggested_layout: z.string(),
    suggested_headline: z.string(),
    suggested_subheadline: z.string(),
    suggested_cta: z.string(),
    product_visual_to_use: z.string(),
    brand_style_notes: stringArray,
    negative_constraints: stringArray,
    why_this_should_work: z.string()
  })
  .strict();

export const BrandExtractionSchema = z
  .object({
    brand_identity: z
      .object({
        brand_name: z.string(),
        product_name: z.string(),
        website_url: z.string(),
        landing_page_url: z.string(),
        category: z.string(),
        one_line_description: z.string(),
        primary_customer: z.string(),
        primary_industry: z.string(),
        primary_role: z.string(),
        primary_outcome: z.string(),
        positioning_statement: z.string(),
        confidence: ConfidenceSchema.or(z.literal(""))
      })
      .strict(),
    visual_brand_system: z
      .object({
        logos: stringArray,
        colors: z
          .object({
            primary: stringArray,
            secondary: stringArray,
            accent: stringArray,
            neutral: stringArray,
            background: stringArray,
            text: stringArray,
            cta: stringArray
          })
          .strict(),
        typography: z
          .object({
            font_families: stringArray,
            heading_style: z.string(),
            body_style: z.string(),
            button_style: z.string(),
            casing_style: z.string()
          })
          .strict(),
        ui_style: z
          .object({
            button_style: z.string(),
            card_style: z.string(),
            corner_radius: z.string(),
            border_style: z.string(),
            shadow_style: z.string(),
            icon_style: z.string(),
            illustration_style: z.string(),
            screenshot_style: z.string(),
            spacing_style: z.string(),
            layout_style: z.string(),
            overall_mood: z.string()
          })
          .strict()
      })
      .strict(),
    product_representation: z
      .object({
        screenshots: stringArray,
        dashboard_visuals: stringArray,
        feature_visuals: stringArray,
        workflow_visuals: stringArray,
        integration_visuals: stringArray,
        recommended_ad_visuals: stringArray,
        visuals_to_avoid: stringArray
      })
      .strict(),
    offer_dna: z
      .object({
        product: z.string(),
        main_problem_solved: z.string(),
        main_promise: z.string(),
        main_use_case: z.string(),
        target_customer: z.string(),
        target_industry: z.string(),
        target_role: z.string(),
        key_features: stringArray,
        key_benefits: stringArray,
        pricing_model: z.string(),
        plans: stringArray,
        free_trial: z.string(),
        demo_available: z.string(),
        entry_offer: z.string(),
        primary_cta: z.string(),
        secondary_cta: z.string(),
        sales_motion: z.string(),
        risk_reversal: z.string(),
        guarantee: z.string(),
        onboarding_promise: z.string(),
        time_to_value: z.string(),
        integrations: stringArray,
        main_differentiator: z.string()
      })
      .strict(),
    messaging_foundation: z
      .object({
        homepage_headline: z.string(),
        homepage_subheadline: z.string(),
        value_props: stringArray,
        features: stringArray,
        benefits: stringArray,
        use_cases: stringArray,
        customer_segments: stringArray,
        pain_points_mentioned: stringArray,
        outcomes_mentioned: stringArray,
        objections_addressed: stringArray,
        faq_themes: stringArray,
        cta_language: stringArray,
        repeated_phrases: stringArray,
        headline_patterns: stringArray,
        tone_notes: stringArray
      })
      .strict(),
    proof_library: z
      .object({
        customer_logos: stringArray,
        testimonials: stringArray,
        case_study_metrics: stringArray,
        roi_claims: stringArray,
        usage_numbers: stringArray,
        review_ratings: stringArray,
        security_badges: stringArray,
        press_mentions: stringArray,
        awards: stringArray,
        safe_ad_proof_points: stringArray
      })
      .strict(),
    customer_dna_from_website: z
      .object({
        brand_claims_about_customers: stringArray,
        real_customer_quotes: stringArray,
        pains: stringArray,
        desired_outcomes: stringArray,
        objections: stringArray,
        buying_triggers: stringArray,
        alternatives: stringArray,
        decision_criteria: stringArray,
        exact_phrases: stringArray
      })
      .strict(),
    external_customer_research_plan: z
      .object({
        recommended_subreddits: stringArray,
        review_sites: stringArray,
        communities: stringArray,
        search_queries: stringArray,
        competitor_review_targets: stringArray,
        what_to_extract: stringArray
      })
      .strict(),
    competitor_intelligence: z
      .object({
        direct_competitors: stringArray,
        indirect_competitors: stringArray,
        manual_alternatives: stringArray,
        comparison_pages: stringArray,
        differentiators: stringArray,
        category_norms: stringArray,
        research_needed: stringArray
      })
      .strict(),
    claim_constraints: z
      .object({
        allowed_claims: stringArray,
        claims_requiring_proof: stringArray,
        unsupported_claims: stringArray,
        forbidden_claims: stringArray,
        required_disclaimers: stringArray,
        correct_terms: stringArray,
        terms_to_avoid: stringArray,
        compliance_notes: stringArray
      })
      .strict(),
    static_ad_creative_recommendations: z
      .object({
        best_customer_segment: z.string(),
        best_pain_point: z.string(),
        best_desired_outcome: z.string(),
        best_proof_point: z.string(),
        best_product_visual: z.string(),
        best_cta: z.string(),
        best_visual_metaphor: z.string(),
        best_layout_direction: z.string(),
        best_background_treatment: z.string(),
        best_logo_placement: z.string(),
        negative_constraints: stringArray,
        ad_concepts: z.array(AdConceptSchema)
      })
      .strict(),
    missing_information: z
      .object({
        must_ask_client: stringArray,
        nice_to_have: stringArray,
        not_found_on_website: stringArray
      })
      .strict(),
    source_map: z.array(SourceMapEntrySchema)
  })
  .strict();

export type Confidence = z.infer<typeof ConfidenceSchema>;
export type SourceMapEntry = z.infer<typeof SourceMapEntrySchema>;
export type BrandExtractionJson = z.infer<typeof BrandExtractionSchema>;

export const EMPTY_BRAND_EXTRACTION: BrandExtractionJson = {
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
};
