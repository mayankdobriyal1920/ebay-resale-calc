import { formatUsd } from "@/calculators/money";

export function formatCurrency(cents: number): string {
  return formatUsd(cents);
}

export function formatPercent(value: number | null, decimals = 1): string {
  if (value === null || !Number.isFinite(value)) return "N/A";
  return `${value.toFixed(decimals)}%`;
}