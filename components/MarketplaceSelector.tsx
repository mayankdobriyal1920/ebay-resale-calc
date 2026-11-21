"use client";

import { MVP_MARKETPLACE_IDS } from "@/data/marketplaceRules";

const LABELS: Record<string, string> = {
  ebay: "eBay",
  poshmark: "Poshmark",
  mercari: "Mercari",
  depop: "Depop",
};

const ICONS: Record<string, string> = {
  ebay: "🛒",
  poshmark: "👗",
  mercari: "📦",
  depop: "✨",
};

export interface MarketplaceSelectorProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export default function MarketplaceSelector({ selected, onChange }: MarketplaceSelectorProps) {
  function toggle(id: string) {
    if (selected.includes(id)) onChange(selected.filter((x) => x !== id));
    else onChange([...selected, id]);
  }
  return (
    <section className="glass-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-green-800">Compare marketplaces</h2>
        <span className="text-xs text-muted">{selected.length} selected</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {MVP_MARKETPLACE_IDS.map((id) => {
          const active = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              aria-pressed={active}
              className={`chip ${active ? "chip-active" : ""}`}
            >
              <span aria-hidden>{ICONS[id]}</span> {LABELS[id]}
            </button>
          );
        })}
      </div>
    </section>
  );
}