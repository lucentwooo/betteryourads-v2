import {
  BrandExtractionSchema,
  type BrandExtractionJson
} from "@/lib/schema/brand-extraction";

export type ValidationResult =
  | { ok: true; data: BrandExtractionJson }
  | { ok: false; errors: string[] };

export function validateBrandExtractionJson(input: unknown): ValidationResult {
  const result = BrandExtractionSchema.safeParse(input);

  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join(".") : "root";
        return `${path}: ${issue.message}`;
      })
    };
  }

  return { ok: true, data: result.data };
}

export function assertBrandExtractionJson(input: unknown): BrandExtractionJson {
  const result = validateBrandExtractionJson(input);

  if (!result.ok) {
    throw new Error(`Invalid BRAND_EXTRACTION_JSON: ${result.errors.join("; ")}`);
  }

  return result.data;
}
