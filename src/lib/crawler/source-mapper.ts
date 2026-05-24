import type { Confidence, SourceMapEntry } from "@/lib/schema/brand-extraction";

export function createSourceMapEntry(
  field: string,
  value: unknown,
  sourceUrl: string,
  confidence: Confidence = "medium"
): SourceMapEntry | null {
  if (value === undefined || value === null) {
    return null;
  }

  const stringValue =
    typeof value === "string" ? value.trim() : JSON.stringify(value).trim();

  if (!stringValue || stringValue === "unknown" || stringValue === "[]") {
    return null;
  }

  return {
    field,
    value: stringValue,
    source_url: sourceUrl,
    confidence
  };
}

export function appendSourceMapEntry(
  sourceMap: SourceMapEntry[],
  field: string,
  value: unknown,
  sourceUrl: string,
  confidence: Confidence = "medium"
) {
  const entry = createSourceMapEntry(field, value, sourceUrl, confidence);
  if (!entry) {
    return sourceMap;
  }

  if (
    sourceMap.some(
      (existing) =>
        existing.field === entry.field &&
        existing.value === entry.value &&
        existing.source_url === entry.source_url
    )
  ) {
    return sourceMap;
  }

  sourceMap.push(entry);
  return sourceMap;
}
