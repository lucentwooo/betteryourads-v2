"use client";

import { useEffect, useMemo, useState } from "react";

type ExtractionJob = {
  id: string;
  websiteUrl: string;
  status: "queued" | "running" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  result?: unknown;
  crawlSummary?: {
    pages: number;
    errors: string[];
  };
  error?: string;
};

export default function Home() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [job, setJob] = useState<ExtractionJob | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resultJson = useMemo(() => {
    if (!job?.result) {
      return "";
    }

    return JSON.stringify(job.result, null, 2);
  }, [job?.result]);

  useEffect(() => {
    if (!job || job.status === "completed" || job.status === "failed") {
      return;
    }

    const interval = window.setInterval(async () => {
      const response = await fetch(`/api/extractions/${job.id}`);
      if (response.ok) {
        setJob((await response.json()) as ExtractionJob);
      }
    }, 1800);

    return () => window.clearInterval(interval);
  }, [job]);

  async function submitExtraction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/extractions", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ websiteUrl })
      });

      const data = (await response.json()) as ExtractionJob | { error: string };

      if (!response.ok || "error" in data) {
        setError(
          "error" in data && data.error
            ? data.error
            : "Extraction failed to start."
        );
        return;
      }

      setJob(data);
    } finally {
      setIsSubmitting(false);
    }
  }

  function exportJson() {
    if (!resultJson) {
      return;
    }

    const blob = new Blob([resultJson], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "brand-extraction.json";
    anchor.click();
    URL.revokeObjectURL(href);
  }

  return (
    <main className="shell">
      <section className="workbench">
        <div className="intro">
          <p className="eyebrow">BetterYourAds</p>
          <h1>Website DNA extraction for B2B SaaS ads</h1>
          <p>
            Submit a SaaS website and receive one schema-valid JSON object covering
            brand, offer, messaging, proof, customer evidence, competitors, claims,
            and static ad recommendations.
          </p>
        </div>

        <form className="url-form" onSubmit={submitExtraction}>
          <label htmlFor="website-url">SaaS website URL</label>
          <div className="input-row">
            <input
              id="website-url"
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
              placeholder="https://example.com"
              autoComplete="url"
            />
            <button type="submit" disabled={isSubmitting || !websiteUrl.trim()}>
              {isSubmitting ? "Starting" : "Extract"}
            </button>
          </div>
          {error ? <p className="error">{error}</p> : null}
        </form>
      </section>

      <section className="status-grid">
        <div>
          <span>Status</span>
          <strong>{job?.status ?? "idle"}</strong>
        </div>
        <div>
          <span>Pages crawled</span>
          <strong>{job?.crawlSummary?.pages ?? 0}</strong>
        </div>
        <div>
          <span>Validation</span>
          <strong>{job?.status === "completed" ? "passed" : "pending"}</strong>
        </div>
      </section>

      {job?.error ? <p className="error panel">{job.error}</p> : null}

      <section className="output-panel">
        <div className="output-header">
          <div>
            <p className="eyebrow">BRAND_EXTRACTION_JSON</p>
            <h2>Final output</h2>
          </div>
          <button type="button" onClick={exportJson} disabled={!resultJson}>
            Export JSON
          </button>
        </div>
        <pre>{resultJson || "Run an extraction to see the final JSON object."}</pre>
      </section>
    </main>
  );
}
