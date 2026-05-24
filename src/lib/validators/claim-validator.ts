import type {
  BrandExtractionJson,
  SourceMapEntry
} from "@/lib/schema/brand-extraction";

export type ClaimValidationIssue = {
  claim: string;
  reason: string;
};

function itemToClaim(item: unknown): string {
  if (typeof item === "string") {
    return item.trim();
  }

  if (item && typeof item === "object") {
    const record = item as Record<string, unknown>;
    const candidate =
      record.claim ??
      record.value ??
      record.exact_proof ??
      record.text ??
      record.metric;

    if (typeof candidate === "string") {
      return candidate.trim();
    }
  }

  return "";
}

function hasSupportingSource(claim: string, sourceMap: SourceMapEntry[]) {
  const normalizedClaim = claim.toLowerCase();

  return sourceMap.some((entry) => {
    const value = entry.value.toLowerCase();
    return (
      entry.confidence === "high" &&
      (value === normalizedClaim ||
        value.includes(normalizedClaim) ||
        normalizedClaim.includes(value))
    );
  });
}

export function validateClaimSafety(
  extraction: BrandExtractionJson
): ClaimValidationIssue[] {
  const issues: ClaimValidationIssue[] = [];

  for (const claimItem of extraction.claim_constraints.allowed_claims) {
    const claim = itemToClaim(claimItem);

    if (!claim) {
      continue;
    }

    if (!hasSupportingSource(claim, extraction.source_map)) {
      issues.push({
        claim,
        reason:
          "Allowed claims must be directly supported by a high-confidence source_map entry."
      });
    }
  }

  return issues;
}

export function enforceClaimSafety(
  extraction: BrandExtractionJson
): BrandExtractionJson {
  const safeAllowedClaims: unknown[] = [];
  const claimsRequiringProof = [
    ...extraction.claim_constraints.claims_requiring_proof
  ];

  for (const claimItem of extraction.claim_constraints.allowed_claims) {
    const claim = itemToClaim(claimItem);

    if (!claim || hasSupportingSource(claim, extraction.source_map)) {
      safeAllowedClaims.push(claimItem);
    } else if (!claimsRequiringProof.some((item) => itemToClaim(item) === claim)) {
      claimsRequiringProof.push(claim);
    }
  }

  return {
    ...extraction,
    claim_constraints: {
      ...extraction.claim_constraints,
      allowed_claims: safeAllowedClaims,
      claims_requiring_proof: claimsRequiringProof
    }
  };
}
