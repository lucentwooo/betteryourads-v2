import { randomUUID } from "node:crypto";
import { runBrandExtractionPipeline } from "@/lib/pipeline/extraction-pipeline";
import type { BrandExtractionJson } from "@/lib/schema/brand-extraction";

export type ExtractionJobStatus = "queued" | "running" | "completed" | "failed";

export type ExtractionJob = {
  id: string;
  websiteUrl: string;
  status: ExtractionJobStatus;
  createdAt: string;
  updatedAt: string;
  result?: BrandExtractionJson;
  crawlSummary?: {
    pages: number;
    errors: string[];
  };
  error?: string;
};

declare global {
  // Shared across Next.js route module reloads in local/runtime workers.
  var betterYourAdsExtractionJobs: Map<string, ExtractionJob> | undefined;
}

const jobs = globalThis.betterYourAdsExtractionJobs ?? new Map<string, ExtractionJob>();
globalThis.betterYourAdsExtractionJobs = jobs;

function updateJob(id: string, patch: Partial<ExtractionJob>) {
  const current = jobs.get(id);
  if (!current) {
    return;
  }

  jobs.set(id, {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString()
  });
}

export function getExtractionJob(id: string) {
  return jobs.get(id) ?? null;
}

export function listExtractionJobs() {
  return Array.from(jobs.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

export function createExtractionJob(websiteUrl: string) {
  const now = new Date().toISOString();
  const job: ExtractionJob = {
    id: randomUUID(),
    websiteUrl,
    status: "queued",
    createdAt: now,
    updatedAt: now
  };

  jobs.set(job.id, job);

  queueMicrotask(async () => {
    updateJob(job.id, { status: "running" });

    try {
      const result = await runBrandExtractionPipeline(websiteUrl);
      updateJob(job.id, {
        status: "completed",
        result: result.output,
        crawlSummary: {
          pages: result.crawl.pages.length,
          errors: result.crawl.errors
        }
      });
    } catch (error) {
      updateJob(job.id, {
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown extraction error"
      });
    }
  });

  return job;
}
