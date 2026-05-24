import * as cheerio from "cheerio";

const removableSelectors = [
  "script",
  "style",
  "noscript",
  "svg",
  "canvas",
  "iframe",
  "[aria-hidden='true']",
  "nav [role='menu']"
];

export function cleanHtmlToText(html: string): string {
  const $ = cheerio.load(html);
  $(removableSelectors.join(",")).remove();

  return $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();
}

export function extractHeadings(html: string): string[] {
  const $ = cheerio.load(html);
  const headings: string[] = [];

  $("h1,h2,h3")
    .slice(0, 50)
    .each((_, element) => {
      const text = $(element).text().replace(/\s+/g, " ").trim();
      if (text && !headings.includes(text)) {
        headings.push(text);
      }
    });

  return headings;
}

export function extractCtas(html: string): string[] {
  const $ = cheerio.load(html);
  const ctas: string[] = [];

  $("a,button,input[type='submit']")
    .slice(0, 150)
    .each((_, element) => {
      const text =
        $(element).attr("value") ??
        $(element).attr("aria-label") ??
        $(element).text();
      const normalized = text.replace(/\s+/g, " ").trim();

      if (normalized && normalized.length <= 80 && !ctas.includes(normalized)) {
        ctas.push(normalized);
      }
    });

  return ctas;
}

export function truncateForModel(text: string, maxChars = 14000): string {
  if (text.length <= maxChars) {
    return text;
  }

  return `${text.slice(0, maxChars)}\n[truncated]`;
}
