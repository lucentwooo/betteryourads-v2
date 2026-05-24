import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { Page } from "playwright";

export async function capturePageScreenshot(page: Page, url: string) {
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 12);
  const hostname = new URL(url).hostname.replace(/[^a-z0-9.-]/gi, "-");
  const directory = path.join(process.cwd(), ".artifacts", "screenshots");
  const filePath = path.join(directory, `${hostname}-${hash}.png`);

  await mkdir(directory, { recursive: true });
  await page.screenshot({
    path: filePath,
    fullPage: true,
    animations: "disabled"
  });

  return filePath;
}
