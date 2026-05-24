import { NextResponse } from "next/server";
import { getExtractionJob } from "@/lib/pipeline/jobs";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const job = getExtractionJob(id);

  if (!job) {
    return NextResponse.json({ error: "Extraction job not found." }, { status: 404 });
  }

  return NextResponse.json(job);
}
