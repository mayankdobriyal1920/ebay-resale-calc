"use client";

import { MVP_MARKETPLACE_IDS } from "@/data/marketplaceRules";

const LABELS: Record<string, string> = {
  ebay: "eBay",
  poshmark: "Poshmark",
  mercari: "Mercari",
  depop: "Depop",
};

export interface MarketplaceSelectorProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export default function MarketplaceSelector({ selected, onChange }: MarketplaceSelectorProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  }
  return (
    <section className="glass-card p-4">
      <h2 className="mb-3 text-lg font-semibold text-green-800">Marketplaces</h2>
      <div className="flex flex-wrap gap-2">
        {MVP_MARKETPLACE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => toggle(id)}
            className={`rounded-full px-4 py-2 text-sm ${
              selected.includes(id)
                ? "bg-green-600 text-white"
                : "bg-surface-strong text-muted"
            }`}
          >
            {LABELS[id]}
          </button>
        ))}
      </div>
    </section>
  );
}