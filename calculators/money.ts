// Decimal-safe money helpers using integer cents.
// All public helpers accept/return integer cents unless noted.

export function dollarsToCents(dollars: string | number): number {
  // Parse a dollar string/number into integer cents without float drift.
  const s = typeof dollars === "number" ? dollars.toFixed(2) : String(dollars).trim();
  if (s === "" || !/^-?\d+(\.\d{1,2})?$/.test(s)) {
    throw new Error(`Invalid dollar amount: ${dollars}`);
  }
  const negative = s.startsWith("-");
  const body = negative ? s.slice(1) : s;
  const [whole, frac = ""] = body.split(".");
  const padded = (frac + "00").slice(0, 2);
  const cents = parseInt(whole, 10) * 100 + parseInt(padded, 10);
  return negative ? -cents : cents;
}

export function centsToDollars(cents: number): string {
  const negative = cents < 0;
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = String(abs % 100).padStart(2, "0");
  return `${negative ? "-" : ""}${whole}.${frac}`;
}

export function formatUsd(cents: number): string {
  const negative = cents < 0;
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = String(abs % 100).padStart(2, "0");
  // thousands separators
  const wholeStr = whole.toLocaleString("en-US");
  return `${negative ? "-" : ""}$${wholeStr}.${frac}`;
}

// Rate helpers use basis points (bps) to avoid floats: 1 bps = 0.01%.
export function applyRateBps(amountCents: number, bps: number): number {
  // Round half up to nearest cent.
  const raw = (amountCents * bps) / 10000;
  return Math.round(raw);
}

export function applyRatePercent(amountCents: number, percent: number): number {
  // percent may be fractional (e.g. 13.25). Convert to bps internally.
  const bps = Math.round(percent * 100);
  return applyRateBps(amountCents, bps);
}

export function roundCents(value: number): number {
  return Math.round(value);
}

export function safeDivide(numerator: number, denominator: number): number | null {
  if (denominator === 0) return null;
  return numerator / denominator;
}

export function percentOf(numerator: number, denominator: number): number | null {
  const r = safeDivide(numerator, denominator);
  if (r === null) return null;
  return r * 100;
}