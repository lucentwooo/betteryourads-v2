import { describe, expect, it } from "vitest";
import {
  EMPTY_BRAND_EXTRACTION,
  type BrandExtractionJson
} from "../src/lib/schema/brand-extraction";
import { compileBrandExtractionJson } from "../src/lib/pipeline/schema-compiler";
import { validateClaimSafety } from "../src/lib/validators/claim-validator";
import { validateBrandExtractionJson } from "../src/lib/validators/json-validator";

function freshExtraction(): BrandExtractionJson {
  return structuredClone(EMPTY_BRAND_EXTRACTION);
}

describe("BRAND_EXTRACTION_JSON validation", () => {
  it("accepts the complete schema shape", () => {
    const extraction = freshExtraction();
    extraction.brand_identity.website_url = "https://example.com/";
    extraction.brand_identity.landing_page_url = "https://example.com/";

    const result = validateBrandExtractionJson(extraction);

    expect(result.ok).toBe(true);
  });

  it("rejects invalid confidence values", () => {
    const extraction = freshExtraction() as unknown as Record<string, unknown>;
    extraction.brand_identity = {
      ...(extraction.brand_identity as Record<string, unknown>),
      confidence: "certain"
    };

    const result = validateBrandExtractionJson(extraction);

    expect(result.ok).toBe(false);
  });

  it("rejects malformed source map entries", () => {
    const extraction = freshExtraction() as unknown as Record<string, unknown>;
    extraction.source_map = [{ field: "brand_identity.brand_name" }];

    const result = validateBrandExtractionJson(extraction);

    expect(result.ok).toBe(false);
  });
});

describe("schema compiler", () => {
  it("fills missing strings with unknown and records missing information", () => {
    const compiled = compileBrandExtractionJson([
      {
        brand_identity: {
          brand_name: "Acme",
          website_url: "https://acme.test/"
        } as BrandExtractionJson["brand_identity"]
      }
    ]);

    expect(compiled.brand_identity.brand_name).toBe("Acme");
    expect(compiled.brand_identity.product_name).toBe("unknown");
    expect(compiled.missing_information.not_found_on_website).toContain(
      "brand_identity.product_name"
    );
  });

  it("does not clear source mapped fields when a later partial omits them", () => {
    const compiled = compileBrandExtractionJson([
      {
        source_map: [
          {
            field: "messaging_foundation.homepage_headline",
            value: "Run projects clearly",
            source_url: "https://acme.test/",
            confidence: "high"
          }
        ],
        claim_constraints: {
          ...freshExtraction().claim_constraints,
          allowed_claims: ["Run projects clearly"]
        }
      },
      {
        external_customer_research_plan: {
          ...freshExtraction().external_customer_research_plan,
          review_sites: ["G2"]
        }
      }
    ]);

    expect(compiled.source_map).toHaveLength(1);
    expect(compiled.claim_constraints.allowed_claims).toEqual([
      "Run projects clearly"
    ]);
  });
});

describe("claim validator", () => {
  it("flags allowed claims without high-confidence source support", () => {
    const extraction = freshExtraction();
    extraction.claim_constraints.allowed_claims = ["Best project tool"];
    extraction.source_map = [
      {
        field: "messaging_foundation.homepage_headline",
        value: "Project tool",
        source_url: "https://example.com/",
        confidence: "medium"
      }
    ];

    const issues = validateClaimSafety(extraction);

    expect(issues).toHaveLength(1);
  });

  it("accepts allowed claims with high-confidence source support", () => {
    const extraction = freshExtraction();
    extraction.claim_constraints.allowed_claims = ["Project tool"];
    extraction.source_map = [
      {
        field: "messaging_foundation.homepage_headline",
        value: "Project tool",
        source_url: "https://example.com/",
        confidence: "high"
      }
    ];

    const issues = validateClaimSafety(extraction);

    expect(issues).toHaveLength(0);
  });
});
