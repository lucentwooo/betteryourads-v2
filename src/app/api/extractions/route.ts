import { NextResponse } from "next/server";
import { z } from "zod";
import { createExtractionJob, listExtractionJobs } from "@/lib/pipeline/jobs";

export const runtime = "nodejs";

const CreateExtractionRequestSchema = z.object({
  websiteUrl: z.string().min(1)
});

function isValidWebsiteUrl(value: string) {
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(withProtocol);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export async function GET() {
  return NextResponse.json({ jobs: listExtractionJobs() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = CreateExtractionRequestSchema.safeParse(body);

  if (!parsed.success || !isValidWebsiteUrl(parsed.data.websiteUrl)) {
    return NextResponse.json(
      { error: "Provide a valid SaaS website URL." },
      { status: 400 }
    );
  }

  const job = createExtractionJob(parsed.data.websiteUrl);
  return NextResponse.json(job, { status: 202 });
}
