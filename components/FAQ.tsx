import { FAQ as FAQS } from "@/data/faq";

export default function FAQ() {
  return (
    <section className="glass-card p-4">
      <h2 className="mb-3 text-lg font-semibold text-green-800">FAQ</h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <details key={i}>
            <summary className="cursor-pointer font-medium">{f.question}</summary>
            <p className="mt-1 text-sm text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}