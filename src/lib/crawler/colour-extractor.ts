import type { ExtractedColor } from "@/lib/crawler/types";

const HEX_PATTERN = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
const RGB_PATTERN = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*[\d.]+)?\)/g;

function expandHex(hex: string) {
  if (hex.length !== 4) {
    return hex.toLowerCase();
  }

  return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toLowerCase();
}

function componentToHex(value: number) {
  return value.toString(16).padStart(2, "0");
}

function rgbToHex(red: number, green: number, blue: number) {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}

function classifyColor(hex: string): ExtractedColor["role"] {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  if (brightness > 235) {
    return "background";
  }

  if (brightness < 45) {
    return "text";
  }

  if (max - min < 24) {
    return "neutral";
  }

  if (red > green + 35 || blue > green + 35) {
    return "accent";
  }

  return "primary";
}

export function extractColorsFromHtml(html: string): ExtractedColor[] {
  const counts = new Map<string, number>();
  const hexMatches = html.match(HEX_PATTERN) ?? [];

  for (const match of hexMatches) {
    const hex = expandHex(match);
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }

  for (const match of html.matchAll(RGB_PATTERN)) {
    const red = Number(match[1]);
    const green = Number(match[2]);
    const blue = Number(match[3]);

    if ([red, green, blue].every((value) => Number.isFinite(value) && value <= 255)) {
      const hex = rgbToHex(red, green, blue);
      counts.set(hex, (counts.get(hex) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18)
    .map(([hex, count]) => ({
      hex,
      role: classifyColor(hex),
      source: `html/css occurrence count ${count}`,
      confidence: count > 2 ? "medium" : "low"
    }));
}
