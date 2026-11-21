// Input validation helpers. Reject negative values, NaN and infinity.

export function parseNonNegativeCents(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  // convert to cents with rounding to avoid float drift
  return Math.round(n * 100);
}

export function parsePositiveCents(raw: string): number | null {
  const c = parseNonNegativeCents(raw);
  if (c === null || c <= 0) return null;
  return c;
}

export function parseBps(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return 0;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0 || n > 100) return null;
  return Math.round(n * 100); // percent -> bps
}