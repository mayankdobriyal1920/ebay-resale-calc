export default function Disclaimer() {
  return (
    <aside className="glass-card flex items-start gap-3 border-amber-200/60 bg-amber-50/60 p-4 text-sm text-amber-900">
      <span aria-hidden className="text-lg">⚠️</span>
      <p>
        <strong>Estimates only.</strong> Marketplace fees change. Results depend on category,
        seller plan, location, shipping method, taxes and promotions. Official marketplace
        policies take precedence. Not financial, tax or legal advice.
      </p>
    </aside>
  );
}