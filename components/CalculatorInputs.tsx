"use client";

import React, { useState, useEffect, useCallback } from "react";
import CurrencyInput from "./CurrencyInput";
import { parseNonNegativeCents, parsePositiveCents, parseBps } from "@/lib/validation";
import { MoneyInput } from "@/calculators/types";

export interface CalculatorInputsProps {
  onChange: (input: MoneyInput | null) => void;
  initial?: MoneyInput | null;
}

const STORAGE_KEY = "ebay-cal:inputs";

const DEFAULTS = {
  itemCost: "0",
  sellingPrice: "25.00",
  quantity: "1",
  buyerShipping: "0",
  sellerShipping: "0",
  packaging: "0",
  other: "0",
  promoted: "0",
};

function readStored(): typeof DEFAULTS {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export default function CalculatorInputs({ onChange, initial }: CalculatorInputsProps) {
  const [values, setValues] = useState(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (initial && !seeded) {
      setValues({
        itemCost: (initial.itemCost / 100).toFixed(2),
        sellingPrice: (initial.sellingPrice / 100).toFixed(2),
        quantity: String(initial.quantity),
        buyerShipping: (initial.buyerShipping / 100).toFixed(2),
        sellerShipping: (initial.sellerShippingCost / 100).toFixed(2),
        packaging: (initial.packagingCost / 100).toFixed(2),
        other: (initial.otherCost / 100).toFixed(2),
        promoted: (initial.promotedRateBps / 100).toFixed(2),
      });
      setSeeded(true);
      setHydrated(true);
      return;
    }
    if (!seeded) {
      setValues(readStored());
      setSeeded(true);
      setHydrated(true);
    }
  }, [initial, seeded]);

  const setField = useCallback((key: keyof typeof DEFAULTS, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      /* ignore */
    }
  }, [values, hydrated]);

  const quantityRaw = Number.parseInt(values.quantity, 10);
  const quantity = Number.isFinite(quantityRaw) && quantityRaw >= 1 ? quantityRaw : 1;

  useEffect(() => {
    const itemCostCents = parseNonNegativeCents(values.itemCost);
    const sellingPriceCents = parsePositiveCents(values.sellingPrice);
    const buyerShippingCents = parseNonNegativeCents(values.buyerShipping);
    const sellerShippingCents = parseNonNegativeCents(values.sellerShipping);
    const packagingCents = parseNonNegativeCents(values.packaging);
    const otherCents = parseNonNegativeCents(values.other);
    const promotedBps = parseBps(values.promoted);

    if (
      itemCostCents === null ||
      sellingPriceCents === null ||
      buyerShippingCents === null ||
      sellerShippingCents === null ||
      packagingCents === null ||
      otherCents === null ||
      promotedBps === null
    ) {
      onChange(null);
      return;
    }

    onChange({
      itemCost: itemCostCents,
      sellingPrice: sellingPriceCents,
      quantity,
      buyerShipping: buyerShippingCents,
      sellerShippingCost: sellerShippingCents,
      packagingCost: packagingCents,
      otherCost: otherCents,
      promotedRateBps: promotedBps,
      salesTaxIncluded: 0,
    });
  }, [values, onChange, quantity]);

  const itemCostError =
    values.itemCost.trim() !== "" && parseNonNegativeCents(values.itemCost) === null
      ? "Enter a valid non-negative amount"
      : null;
  const sellingPriceError =
    values.sellingPrice.trim() !== "" && parsePositiveCents(values.sellingPrice) === null
      ? "Enter a price greater than 0"
      : null;

  function reset() {
    setValues(DEFAULTS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="glass-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-green-800">Item details</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">USD</span>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-border bg-white/70 px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-green-100/60 hover:text-green-800"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <CurrencyInput label="Item purchase cost" value={values.itemCost} onChange={(v) => setField("itemCost", v)} hint="What you paid for the item." error={itemCostError} />
        <CurrencyInput label="Expected selling price" value={values.sellingPrice} onChange={(v) => setField("sellingPrice", v)} required hint="Listed sale price." error={sellingPriceError} />
        <CurrencyInput label="Quantity" value={values.quantity} onChange={(v) => setField("quantity", v)} hint="Number of identical items sold." />
        <CurrencyInput label="Buyer-paid shipping" value={values.buyerShipping} onChange={(v) => setField("buyerShipping", v)} hint="Shipping the buyer pays." />
        <CurrencyInput label="Your shipping / label cost" value={values.sellerShipping} onChange={(v) => setField("sellerShipping", v)} hint="Your actual label cost." />
        <CurrencyInput label="Packaging cost" value={values.packaging} onChange={(v) => setField("packaging", v)} />
        <CurrencyInput label="Other per-order cost" value={values.other} onChange={(v) => setField("other", v)} />
      </div>
      <div className="mt-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-text">Promoted / boosted listing rate (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={values.promoted}
            onChange={(e) => setField("promoted", e.target.value)}
            className="input-field"
            placeholder="0"
          />
          <span className="mt-1 block text-xs text-muted">Optional platform promotion rate.</span>
        </label>
      </div>
    </section>
  );
}