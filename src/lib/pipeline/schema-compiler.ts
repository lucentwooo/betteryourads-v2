import {
  EMPTY_BRAND_EXTRACTION,
  type BrandExtractionJson
} from "@/lib/schema/brand-extraction";
import { enforceClaimSafety } from "@/lib/validators/claim-validator";
import { assertBrandExtractionJson } from "@/lib/validators/json-validator";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function dedupeArray(values: unknown[]) {
  const seen = new Set<string>();
  const deduped: unknown[] = [];

  for (const value of values) {
    const key = typeof value === "string" ? value : JSON.stringify(value);
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(value);
    }
  }

  return deduped;
}

function mergeIntoShape(shape: unknown, value: unknown): unknown {
  if (value === undefined) {
    return shape;
  }

  if (Array.isArray(shape)) {
    return Array.isArray(value) ? dedupeArray(value) : [];
  }

  if (typeof shape === "string") {
    return typeof value === "string" && value.trim() ? value : shape || "unknown";
  }

  if (isRecord(shape)) {
    const output: Record<string, unknown> = {};
    const input = isRecord(value) ? value : {};

    for (const [key, childShape] of Object.entries(shape)) {
      output[key] = mergeIntoShape(childShape, input[key]);
    }

    return output;
  }

  return value ?? shape;
}

function collectMissingStrings(
  value: unknown,
  path: string,
  missing: Set<string>
) {
  if (typeof value === "string") {
    if (value === "unknown" && path !== "brand_identity.website_url") {
      missing.add(path);
    }
    return;
  }

  if (Array.isArray(value)) {
    return;
  }

  if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) {
      collectMissingStrings(child, path ? `${path}.${key}` : key, missing);
    }
  }
}

export function compileBrandExtractionJson(
  partials: Array<Partial<BrandExtractionJson>>
): BrandExtractionJson {
  let compiled = structuredClone(EMPTY_BRAND_EXTRACTION) as unknown;

  for (const partial of partials) {
    compiled = mergeIntoShape(compiled, partial);
  }

  const parsed = assertBrandExtractionJson(compiled);
  const missing = new Set(parsed.missing_information.not_found_on_website.map(String));
  collectMissingStrings(parsed, "", missing);

  const withMissing: BrandExtractionJson = {
    ...parsed,
    missing_information: {
      ...parsed.missing_information,
      not_found_on_website: Array.from(missing).sort()
    }
  };

  return assertBrandExtractionJson(enforceClaimSafety(withMissing));
}
