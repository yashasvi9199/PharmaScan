// src/lib/utils/normalization.ts
// Text normalization utilities

/**
 * Normalize text for comparison
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize drug name for matching
 */
export function normalizeDrugName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Extract tokens from text
 */
export function tokenize(text: string, minLength = 3): string[] {
  return normalizeText(text)
    .split(" ")
    .filter((t) => t.length >= minLength);
}
