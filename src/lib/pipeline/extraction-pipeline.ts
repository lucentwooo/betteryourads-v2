import { crawlWebsite } from "@/lib/crawler/crawler";
import type { CrawlResult } from "@/lib/crawler/types";
import { runExternalResearchAgent } from "@/lib/agents/external-research-agent";
import { runWebsiteBrandDnaAgent } from "@/lib/agents/website-brand-dna-agent";
import { compileBrandExtractionJson } from "@/lib/pipeline/schema-compiler";
import { validateBrandExtractionJson } from "@/lib/validators/json-validator";
import type { BrandExtractionJson } from "@/lib/schema/brand-extraction";
import { logger } from "@/lib/logging/logger";

export type ExtractionPipelineResult = {
  output: BrandExtractionJson;
  crawl: CrawlResult;
  validation: {
    ok: true;
    errors: [];
  };
};

export async function runBrandExtractionPipeline(
  websiteUrl: string
): Promise<ExtractionPipelineResult> {
  logger.info({ websiteUrl }, "starting brand extraction pipeline");

  const crawl = await crawlWebsite(websiteUrl);
  const websiteExtraction = await runWebsiteBrandDnaAgent(crawl);
  const externalResearch = await runExternalResearchAgent(websiteExtraction);
  const output = compileBrandExtractionJson([websiteExtraction, externalResearch]);
  const validation = validateBrandExtractionJson(output);

  if (!validation.ok) {
    throw new Error(validation.errors.join("; "));
  }

  logger.info(
    { websiteUrl, pages: crawl.pages.length, crawlErrors: crawl.errors.length },
    "finished brand extraction pipeline"
  );

  return {
    output,
    crawl,
    validation: { ok: true, errors: [] }
  };
}
